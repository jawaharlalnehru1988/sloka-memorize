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
    // Get chapter number from route parameters
    this.chapterNumber = this.route.snapshot.paramMap.get('chapterNumber') || '';
    console.log('Loading chapter:', this.chapterNumber);
    
    if (this.chapterNumber) {
      this.loadChapterData();
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
          const foundChapter = chapters.find((chapter: any) => chapter.category === this.chapterNumber);
          
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
      const shareText = `🕉️ Listen to ${this.chapterData.title} from the Bhagavad Gita\\n\\n${this.chapterData.desc?.substring(0, 100)}...\\n\\nDownload the app: https://your-app-link.com`;
      
      if (navigator.share) {
        navigator.share({
          title: this.chapterData.title,
          text: shareText,
          url: window.location.href
        }).catch(err => console.error('Error sharing:', err));
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText)
          .then(() => alert('Chapter details copied to clipboard!'))
          .catch(() => alert('Unable to copy to clipboard'));
      }
    }
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