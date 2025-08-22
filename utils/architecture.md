# Bhagavad Gita Sloka Memorize — Frontend Architecture (Ionic Angular)

> **Goal:** A hybrid mobile app (Android/iOS) built with **Ionic + Angular** that helps users learn and memorize Bhagavad Gita ślokas using traditional **Vedic pāṭha** methods. Each method has a video, audio, and article; users can record and save their own recitation locally, with optional API sync.

---

## 1) Tech Stack & Key Decisions

* **Framework:** Angular 17+ (Standalone APIs), **Ionic 7+** UI components
* **Runtime:** Capacitor 6 (Android/iOS), Web build optional (PWA-lite)
* **Lang/Libs:** TypeScript, RxJS
* **State:** Lightweight **RxJS Store Services** (BehaviorSubject), feature-scoped; no global NgRx unless needed
* **Routing:** Angular Router + Ionic Nav w/ **Side Menu** layout
* **Storage:**

  * **Ionic Storage** (drivers: IndexedDB → SQLite) for structured app data (settings, progress)
  * **Capacitor Filesystem** for **audio recordings** and downloaded media
  * Optional: **Capacitor SQLite** for robust offline catalogs
* **Media:** Capacitor Community **Voice Recorder** / Media Capture, Capacitor **Filesystem** / **Preferences**
* **HTTP:** Angular HttpClient + Interceptors (auth, caching, retry)
* **Theming:** Ionic CSS utilities, Tailwind (optional), Sass variables for devotional theme
* **i18n:** Transloco or Angular built-in i18n for **Devanāgarī/IAST** switch
* **Testing:** Jasmine/Karma (unit), Cypress/Playwright (E2E Web harness), Capacitor device smoke tests

---

## 2) High-Level Feature Map

* **Shell & Navigation**

  * Side menu: **Training Methods** (Padapāṭha, Saṁhitā, Anuloma, Krama, Jatā, Ghana, Likitha, Ucchāraṇa, Smaraṇa)
  * Library (My Recordings), Progress, Downloads, Settings, About
* **Method Page (per module)**

  * Hero (title, description, difficulty)
  * **Video** (how-to), **Audio** (guide chant), **Article** (steps/meaning)
  * **Training Mode**: mic input, live waveform, record/stop, playback, save
* **Sloka Browser**

  * Chapter → Verse, filters (meter, difficulty, learned status)
  * Details: text (Devanāgarī/IAST), meaning, reference audio
* **Recording Library**

  * List + waveform preview, tags (chapter/verse/method), local file mgmt
* **Progress**

  * Streaks, #verses learned, method completion, time spent
* **Settings**

  * Script: **Devanāgarī ⇄ IAST**, font size, theme, autosave, cloud sync toggle

---

## 3) Project Structure (Monorepo-ready)

```
apps/
  gita-memorize/
    src/
      app/
        app.config.ts
        app.routes.ts
        app.component.ts
        app.shell/           # side-menu layout
      core/                  # singletons, cross-cutting
        services/
          http/http.service.ts
          audio/recorder.service.ts
          storage/storage.service.ts
          files/files.service.ts
          sloka/sloka.service.ts
          methods/methods.service.ts
          progress/progress.service.ts
        interceptors/
          auth.interceptor.ts
          caching.interceptor.ts
        guards/
          auth.guard.ts
        utils/
          rx-operators.ts
          logger.ts
        config/
          environment.tokens.ts
      shared/                # dumb components, pipes, directives
        components/
          media-player/
          waveform/
          stats-cards/
        pipes/
          devnagari.pipe.ts
          transliterate.pipe.ts
        styles/
          theme.scss
      features/
        home/
        methods/             # list + detail pages by Vedic method
          method-list.page.ts
          method-detail.page.ts
        training/
          training.page.ts
        slokas/
          slokas-list.page.ts
          sloka-detail.page.ts
        library/
          library.page.ts
        progress/
          progress.page.ts
        settings/
          settings.page.ts
        about/
      assets/
        media/
          video/
          audio/
        data/
          slokas.json
          methods.json
      environments/
        environment.ts
        environment.prod.ts
```

---

## 4) Domain Model (TypeScript Interfaces)

```ts
export type Script = 'devanagari' | 'iast';

export interface Method {
  id: string;                 // 'padapatha' | 'krama' | ...
  title: string;
  description: string;
  difficulty: 'beginner'|'intermediate'|'advanced';
  video?: MediaAsset;         // local or remote
  audio?: MediaAsset;
  article?: string;           // markdown/html
}

export interface SlokaRef { chapter: number; verse: number; }

export interface Sloka {
  id: string;                 // e.g., '1.1'
  ref: SlokaRef;
  textDevanagari: string;
  textIAST: string;
  meaning?: string;
  meter?: string;
  tags?: string[];
  guideAudio?: MediaAsset;
}

export interface MediaAsset {
  id: string;
  kind: 'video'|'audio'|'image'|'article';
  uri: string;                // capacitor://, file://, https://
  bytes?: number;
  checksum?: string;
  downloaded?: boolean;
}

export interface Recording {
  id: string;                 // uuid
  createdAt: string;          // ISO
  methodId: string;           // Method.id
  slokaId: string;            // Sloka.id
  durationMs: number;
  filePath: string;           // Filesystem path
  notes?: string;
}

export interface ProgressSnapshot {
  learnedSlokaIds: string[];
  attemptsBySlokaId: Record<string, number>;
  streakDays: number;
  totalPracticeMinutes: number;
}

export interface Settings {
  script: Script;
  fontScale: number;          // 0.8..1.4
  theme: 'light'|'dark'|'devotional';
  autosaveRecordings: boolean;
  cloudSync: boolean;
}
```

---

## 5) Navigation & Routing

* **App Shell** hosts a **Split Pane / Menu** with IonMenu + IonRouterOutlet.
* Routes are **lazy loaded**; deep links for `gita://sloka/2/20`.

```ts
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: 'methods', pathMatch: 'full' },
  {
    path: '',
    component: AppShellComponent, // contains <ion-menu> + <ion-router-outlet>
    children: [
      { path: 'methods', loadComponent: () => import('./features/methods/method-list.page').then(m => m.MethodListPage) },
      { path: 'methods/:id', loadComponent: () => import('./features/methods/method-detail.page').then(m => m.MethodDetailPage) },
      { path: 'training/:slokaId/:methodId', loadComponent: () => import('./features/training/training.page').then(m => m.TrainingPage) },
      { path: 'slokas', loadComponent: () => import('./features/slokas/slokas-list.page').then(m => m.SlokasListPage) },
      { path: 'slokas/:id', loadComponent: () => import('./features/slokas/sloka-detail.page').then(m => m.SlokaDetailPage) },
      { path: 'library', loadComponent: () => import('./features/library/library.page').then(m => m.LibraryPage) },
      { path: 'progress', loadComponent: () => import('./features/progress/progress.page').then(m => m.ProgressPage) },
      { path: 'settings', loadComponent: () => import('./features/settings/settings.page').then(m => m.SettingsPage) },
      { path: 'about', loadComponent: () => import('./features/about/about.page').then(m => m.AboutPage) }
    ]
  }
];
```

---

## 6) UI Layout — Side Menu Shell

```html
<!-- app.shell.component.html -->
<ion-app>
  <ion-split-pane contentId="main">
    <ion-menu contentId="main">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Gītā Memorize</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list inset>
          <ion-list-header>Training Methods</ion-list-header>
          <ion-item routerLink="/methods" detail>All Methods</ion-item>
          <ion-item routerLink="/slokas" detail>Browse Ślokas</ion-item>
          <ion-item routerLink="/library" detail>My Recordings</ion-item>
          <ion-item routerLink="/progress" detail>Progress</ion-item>
          <ion-item routerLink="/downloads" detail>Downloads</ion-item>
          <ion-item routerLink="/settings" detail>Settings</ion-item>
          <ion-item routerLink="/about" detail>About</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <div class="ion-page" id="main">
      <ion-router-outlet></ion-router-outlet>
    </div>
  </ion-split-pane>
</ion-app>
```

---

## 7) Method Detail Page (Content + Training)

```html
<!-- method-detail.page.html -->
<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start"><ion-menu-button></ion-menu-button></ion-buttons>
    <ion-title>{{ vm.method.title }}</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ vm.method.title }}</ion-card-title>
      <ion-card-subtitle>{{ vm.method.difficulty | titlecase }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <p [innerHTML]="vm.method.description"></p>

      <section *ngIf="vm.method.video">
        <ion-card-title>Video Guide</ion-card-title>
        <video controls [src]="vm.method.video.uri" style="width:100%"></video>
      </section>

      <section *ngIf="vm.method.audio">
        <ion-card-title>Audio Guide</ion-card-title>
        <audio controls [src]="vm.method.audio.uri"></audio>
      </section>

      <section *ngIf="vm.method.article">
        <ion-card-title>Article</ion-card-title>
        <div [innerHTML]="vm.method.article"></div>
      </section>

      <ion-button expand="block" color="success" [routerLink]="['/training', vm.sampleSlokaId, vm.method.id]">
        Start Training
      </ion-button>
    </ion-card-content>
  </ion-card>
</ion-content>
```

---

## 8) Training Page (Recorder UX)

**UX Elements:**

* Big **mic button** (tap to start), countdown, waveform canvas
* Live **timer**, level meter, stop + save dialog
* Attach **sloka + method** metadata and notes; autosave toggle

```ts
// recorder.service.ts (simplified)
@Injectable({ providedIn: 'root' })
export class RecorderService {
  private recording$ = new BehaviorSubject<boolean>(false);

  isRecording$ = this.recording$.asObservable();

  async start(): Promise<void> {
    await VoiceRecorder.requestAudioRecordingPermission();
    await VoiceRecorder.startRecording();
    this.recording$.next(true);
  }

  async stop(): Promise<{ blob: Blob; mimeType: string; durationMs: number; }>{
    const result = await VoiceRecorder.stopRecording();
    this.recording$.next(false);
    const base64 = result.value.recordDataBase64;
    const mimeType = result.value.mimeType ?? 'audio/m4a';
    const blob = this.base64ToBlob(base64, mimeType);
    return { blob, mimeType, durationMs: result.value.msDuration ?? 0 };
  }

  private base64ToBlob(b64: string, type: string): Blob {
    const byteChars = atob(b64);
    const byteNumbers = new Array(byteChars.length);
    for (let i = 0; i < byteChars.length; i++) byteNumbers[i] = byteChars.charCodeAt(i);
    return new Blob([new Uint8Array(byteNumbers)], { type });
  }
}
```

```ts
// files.service.ts (save recording to Filesystem)
@Injectable({ providedIn: 'root' })
export class FilesService {
  async saveRecording(blob: Blob, fileName: string): Promise<string> {
    const base64 = await this.blobToBase64(blob);
    const path = `recordings/${fileName}`;
    await Filesystem.writeFile({ path, data: base64, directory: Directory.Data });
    return path; // persist path in Storage
  }

  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
```

```ts
// storage.service.ts (Ionic Storage facade)
@Injectable({ providedIn: 'root' })
export class StorageService {
  private store = new Storage();
  private ready = this.store.create();

  async get<T>(key: string): Promise<T | null> {
    await this.ready; return (await this.store.get(key)) as T ?? null;
  }
  async set<T>(key: string, value: T): Promise<void> {
    await this.ready; await this.store.set(key, value);
  }
}
```

```ts
// progress.service.ts (RxJS Store)
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private state$ = new BehaviorSubject<ProgressSnapshot>({
    learnedSlokaIds: [], attemptsBySlokaId: {}, streakDays: 0, totalPracticeMinutes: 0,
  });

  readonly vm$ = this.state$.asObservable();

  markAttempt(slokaId: string, minutes: number) {
    const s = structuredClone(this.state$.value);
    s.attemptsBySlokaId[slokaId] = (s.attemptsBySlokaId[slokaId] ?? 0) + 1;
    s.totalPracticeMinutes += minutes;
    this.state$.next(s);
  }

  markLearned(slokaId: string) {
    const s = structuredClone(this.state$.value);
    if (!s.learnedSlokaIds.includes(slokaId)) s.learnedSlokaIds.push(slokaId);
    this.state$.next(s);
  }
}
```

---

## 9) Data Flows

**Local-first:**

1. Load **methods.json** & **slokas.json** from assets → cache in Storage
2. Play media directly from packaged assets; user can **download** guide files for offline
3. Recordings saved to `Filesystem.Data/recordings/*.m4a` + metadata in Storage/SQLite
4. Optional **sync service** posts diffs to API when online (progress, recordings list)

**HTTP Interceptor Chain:** auth → retry (exponential) → offline queue (optional)

---

## 10) Vedic Methods as Modules (Sidebar)

* **Beginner**: Padapāṭha, Saṁhitāpāṭha, Anuloma
* **Intermediate**: Krama, Likitha, Ucchāraṇa
* **Advanced**: Jatā, Ghana, Smaraṇa

Each module page displays: **Video**, **Audio**, **Article**, **Start Training**.

---

## 11) Theming & Typography

* **Devotional theme**: saffron primary, peacock accent; Devanāgarī-friendly fonts (e.g., Noto Sans Devanagari)
* Global variables in `theme.scss`:

```scss
:root {
  --ion-color-primary: #c2841a; // saffron
  --ion-color-secondary: #1a7dc2; // peacock
  --font-scale: 1.0;
}
body.devotional {
  --ion-background-color: #fff8ea;
}
```

* **Script toggle**: Pipes for transliteration; adjust font-size via `Settings.fontScale`

---

## 12) Accessibility (A11y)

* Provide **phonetic aids** and **IAST** alongside Devanāgarī
* Clear **focus states**, larger tap targets, captions/subtitles for videos
* VoiceOver/TalkBack friendly labels, **aria-live** for recording status

---

## 13) Offline & Caching Strategy

* Package initial content in the app bundle (assets)
* On first run, cache catalogs into Storage; optionally prefetch method media
* Use **Filesystem** for downloads; maintain `MediaAsset.downloaded=true`
* If PWA build is desired, add Angular service worker for `ngsw.json` asset caching

---

## 14) Security & Permissions

* Ask mic permission **just-in-time** (before recording)
* Sanitize HTML articles via `DomSanitizer`
* Content Security Policy for web builds; validate file paths before playback

---

## 15) Testing Strategy

* **Unit (Jasmine/Karma)**: services (storage, files, progress), pipes, simple components
* **Integration**: training page with stubbed RecorderService
* **E2E (Cypress/Playwright)**: core user journeys in web harness (menu → method → train → save → playback)
* **Device smoke**: Capacitor run on Android/iOS, verify permissions and file write

---

## 16) Environment & Config

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://api.example.com',
  enableCloudSync: false,
};
```

Provide **DI tokens** for runtime overrides (useful for white-labeling or staging).

---

## 17) Build & Deployment

* **Dev:** `ionic serve`
* **Android:** `ionic cap build android` → open Android Studio → sign & bundle
* **iOS:** `ionic cap build ios` → open Xcode → sign & archive
* Keep media assets small; offload large videos to remote CDN with **download-for-offline** option

---

## 18) Future Enhancements

* **Pronunciation scoring**: cloud **Speech-to-Text** tuned for Sanskrit (optional)
* **Spaced repetition** scheduler per sloka
* **Community packs** / shared recordings (with consent)
* **Background playback** & **download manager** UI

---

## 19) Ready-to-Implement Checklist

* [ ] Initialize Ionic Angular app (standalone components)
* [ ] Add Capacitor plugins: VoiceRecorder, Filesystem, Preferences/Storage, App, Device
* [ ] Create **core services** (storage, files, recorder, sloka, methods, progress)
* [ ] Import initial `slokas.json` and `methods.json`
* [ ] Build **AppShell** with Side Menu + routes
* [ ] Implement **Method Detail** and **Training** pages
* [ ] Implement **Recording Library** with playback & delete
* [ ] Implement **Settings** (script/theme/font scale)
* [ ] Wire **Progress** stats
* [ ] Add tests & device smoke runs

---

### Appendix A — Sample `methods.json`

```json
[
  {
    "id": "padapatha",
    "title": "Padapāṭha",
    "description": "Word-by-word recitation for precise pronunciation.",
    "difficulty": "beginner",
    "video": { "id": "m1v", "kind": "video", "uri": "assets/media/video/pada.mp4" },
    "audio": { "id": "m1a", "kind": "audio", "uri": "assets/media/audio/pada.m4a" },
    "article": "<p>Break each word, chant slowly, and repeat.</p>"
  }
]
```

### Appendix B — Sample `slokas.json`

```json
[
  {
    "id": "1.1",
    "ref": { "chapter": 1, "verse": 1 },
    "textDevanagari": "धर्मक्षेत्रे कुरुक्षेत्रे...",
    "textIAST": "dharma-kṣetre kuru-kṣetre...",
    "meaning": "On the field of dharma...",
    "meter": "anuṣṭubh",
    "guideAudio": { "id": "
```
