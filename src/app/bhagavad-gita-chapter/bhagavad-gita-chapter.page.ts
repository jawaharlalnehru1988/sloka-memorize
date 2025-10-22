import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaChapterItem } from '../bhagavad-gita/bhagavad-gita.service';
import { play, pause, arrowBack, download, speedometer, share, personCircle, call, logoYoutube, globe, logoWhatsapp, refresh } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AudioPlayerComponent } from '../shared/audio-player/audio-player.component';

@Component({
  selector: 'app-bhagavad-gita-chapter',
  templateUrl: './bhagavad-gita-chapter.page.html',
  styleUrls: ['./bhagavad-gita-chapter.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonText,
    IonSpinner,
    IonBackButton,
    IonButtons,
    FormsModule,
    AudioPlayerComponent
  ]
})
export class BhagavadGitaChapterPage implements OnInit, OnDestroy {
  chapterData: BhagavadGitaChapterItem | null = null;
  chapterNumber: string = '';
  loading: boolean = true;
  error: string = '';

  // Enhanced scroll functionality
  private scrollHandler = (): void => {
    // Simple scroll handler if needed
    console.log('Page scrolled');
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService,
    private meta: Meta,
    private titleService: Title
  ) {
    addIcons({refresh,arrowBack,speedometer,download,share,personCircle,call,logoWhatsapp,logoYoutube,globe,play,pause});
  }

  ngOnInit() {
    // Get chapter number from route parameters with fallbacks
    this.chapterNumber = this.route.snapshot.paramMap.get('chapterNumber') || '';
    if (!this.chapterNumber) {
      // try a query param named 'chapter' (some shared links may include it)
      this.chapterNumber = this.route.snapshot.queryParamMap.get('chapter') || '';
    }

    // As a last resort try to parse chapter number from the path (e.g. when opened inside in-app browsers)
    if (!this.chapterNumber) {
      this.chapterNumber = this.parseChapterFromPath();
    }

    console.log('Loading chapter:', this.chapterNumber, 'href:', window.location.href);

    if (this.chapterNumber) {
      this.loadChapterData();

      // Safety timeout: if loading doesn't finish within 12s, show a helpful message instead of an infinite spinner
      setTimeout(() => {
        if (this.loading) {
          console.warn('Chapter load timeout for', this.chapterNumber);
          this.loading = false;
          this.error = 'Taking too long to load content. Please try opening the link in your browser or retry.';
        }
      }, 12000);
    } else {
      this.error = 'Chapter number not provided';
      this.loading = false;
    }
  }

  private loadChapterData(): void {
    const selectedLanguage = this.route.snapshot.queryParamMap.get('lang') || 'tamil';
    
    // First try to get data from cache synchronously
    const cachedChapter = this.bhagavadGitaService.getChapterByNumber(this.chapterNumber, selectedLanguage);
    
    if (cachedChapter) {
      this.chapterData = cachedChapter;
      this.loading = false;
      this.setupScrollDetection();
      this.updateMetadata();
      console.log('Chapter loaded from cache:', this.chapterData);
    } else {
      // If not in cache, try to load from service
      console.log('Chapter not in cache, loading from service...');
      this.bhagavadGitaService.getAllBgChapters().subscribe({
        next: (chaptersResponse: any) => {
          console.log('Chapters loaded from service, finding chapter:', this.chapterNumber);
          const chapters = chaptersResponse.map((response: any) => response.chapters).flat();
          // Ensure category comparison as string to avoid type mismatches
          const foundChapter = chapters.find((chapter: any) => String(chapter.category) === String(this.chapterNumber));
          
          if (foundChapter) {
            this.chapterData = foundChapter;
            this.setupScrollDetection();
            this.updateMetadata();
            console.log('Chapter found and loaded:', foundChapter);
          } else {
            this.error = `Chapter ${this.chapterNumber} not found`;
            console.error('Chapter not found:', this.chapterNumber);
          }
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error loading chapters:', error);
          this.handleLoadingError(error);
        }
      });
    }
  }

  private handleLoadingError(error: any): void {
    this.loading = false;
    
    if (!navigator.onLine) {
      this.error = 'No internet connection. Please check your network and try again.';
    } else if (error.status === 0) {
      this.error = 'Unable to reach the server. Please check your internet connection.';
    } else if (error.status >= 500) {
      this.error = 'Server is temporarily unavailable. Please try again later.';
    } else {
      this.error = 'Failed to load chapter. Please try again.';
    }
  }

  private updateMetadata(): void {
    if (this.chapterData) {
      this.titleService.setTitle(`${this.chapterData.title} - Bhagavad Gita Chapter ${this.chapterNumber}`);
      
      this.meta.updateTag({ name: 'description', content: this.chapterData.desc?.substring(0, 160) || `Listen to Chapter ${this.chapterNumber} of the Bhagavad Gita` });
      this.meta.updateTag({ property: 'og:title', content: `${this.chapterData.title} - Bhagavad Gita` });
      this.meta.updateTag({ property: 'og:description', content: this.chapterData.desc?.substring(0, 160) || '' });
      this.meta.updateTag({ property: 'og:image', content: this.chapterData.img || '' });
    }
  }

  private setupScrollDetection(): void {
    if (typeof window !== 'undefined') {
      const content = document.querySelector('ion-content');
      const scrollEl = content?.shadowRoot?.querySelector('.inner-scroll') || content;
      
      if (scrollEl) {
        scrollEl.addEventListener('scroll', this.scrollHandler, { passive: true });
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up scroll listener
    if (this.scrollHandler) {
      const content = document.querySelector('ion-content');
      const scrollEl = content?.shadowRoot?.querySelector('.inner-scroll') || content;
      
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', this.scrollHandler);
      }
    }
  }

  // Audio Player Component Event Handlers
  downloadAudio(): void {
    if (this.chapterData?.audioData?.audioSrc) {
      const link = document.createElement('a');
      link.href = this.chapterData.audioData.audioSrc;
      link.download = `${this.chapterData.title}.mp3`;
      link.target = '_blank';
      link.click();
      console.log('Download initiated for:', this.chapterData.title);
    }
  }

  shareChapter(): void {
    if (this.chapterData) {
      // Build a canonical deep link that includes chapter and lang so recipients load reliably
      const lang = this.route.snapshot.queryParamMap.get('lang') || 'tamil';
      const baseUrl = window.location.origin;
      const canonicalUrl = `${baseUrl}/bhagavad-gita/chapter/${encodeURIComponent(this.chapterNumber)}?lang=${encodeURIComponent(lang)}`;
      const hashFallbackUrl = `${baseUrl}/#/bhagavad-gita/chapter/${encodeURIComponent(this.chapterNumber)}?lang=${encodeURIComponent(lang)}`;

      const shareText = `🕉️ Listen to ${this.chapterData.title} from the Bhagavad Gita\n\n${this.chapterData.desc?.substring(0, 100)}...\n\nListen: ${canonicalUrl}\n\nIf link doesn't work, try: ${hashFallbackUrl}`;

      if (navigator.share) {
        navigator.share({
          title: this.chapterData.title,
          text: shareText,
          url: canonicalUrl  // Use primary URL for the share API
        }).catch(err => console.error('Error sharing:', err));
      } else {
        // Fallback: copy to clipboard with both URLs
        navigator.clipboard.writeText(shareText)
          .then(() => alert('Chapter details copied to clipboard!'))
          .catch(() => alert('Unable to copy to clipboard'));
      }
    }
  }

  /**
   * Tries to parse the chapter number from the current path.
   * Handles cases where the link was opened in an in-app browser that strips route params.
   */
  private parseChapterFromPath(): string {
    try {
      const path = window.location.pathname || '';
      // Example paths: /bhagavad-gita/chapter/3 or /#/bhagavad-gita/chapter/3
      const parts = path.split('/').filter(Boolean);
      const chapterIndex = parts.findIndex(p => p === 'chapter');
      if (chapterIndex >= 0 && parts.length > chapterIndex + 1) {
        return parts[chapterIndex + 1];
      }

      // check hash-based routing
      if (window.location.hash) {
        const hash = window.location.hash.replace(/^#/, '');
        const hashParts = hash.split('/').filter(Boolean);
        const idx = hashParts.findIndex(p => p === 'chapter');
        if (idx >= 0 && hashParts.length > idx + 1) {
          return hashParts[idx + 1];
        }
      }
    } catch (e) {
      console.warn('Failed to parse chapter from path', e);
    }
    return '';
  }

  goBack(): void {
    this.router.navigate(['/bhagavad-gita']);
  }

  retryLoading(): void {
    this.error = '';
    this.loading = true;
    
    // Check internet connectivity first
    if (!navigator.onLine) {
      this.error = 'No internet connection detected. Please connect to the internet and try again.';
      this.loading = false;
      return;
    }
    
    // Retry loading chapter data
    this.loadChapterData();
  }
}