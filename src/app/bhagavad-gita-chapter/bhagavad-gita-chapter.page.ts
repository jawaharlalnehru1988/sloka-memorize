import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { play, pause, arrowBack, download, speedometer, share } from 'ionicons/icons';
import { addIcons } from 'ionicons';

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
    CommonModule, 
    FormsModule
  ]
})
export class BhagavadGitaChapterPage implements OnInit, OnDestroy {
  chapterData: BhagavadGitaChapterItem | null = null;
  chapterNumber: string = '';
  loading: boolean = true;
  error: string = '';
  
  // Audio control properties
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;
  playbackSpeed: number = 1;
  availableSpeeds: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  // Floating control visibility
  showFloatingControl: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService,
    private meta: Meta,
    private titleService: Title
  ) {
    addIcons({ play, pause, arrowBack, download, speedometer, share });
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
    console.log('🔄 Loading Bhagavad Gita chapter data...');
    
    // Get selected language from query params
    const selectedLanguage = this.route.snapshot.queryParamMap.get('lang') || 'tamil';
    console.log('🌐 Loading chapter data for language:', selectedLanguage);
    
    // First try to get data from cache synchronously
    const cachedChapter = this.bhagavadGitaService.getChapterByNumber(this.chapterNumber, selectedLanguage);
    
    if (cachedChapter) {
      console.log('✅ Found chapter in cache:', cachedChapter);
      this.chapterData = cachedChapter;
      this.loading = false;
      this.setupScrollDetection();
      this.setupMetaTags();
      return;
    }
    
    // If not in cache, fetch from API (which will cache it)
    this.bhagavadGitaService.getChaptersByLanguage(selectedLanguage).subscribe({
      next: (response) => {
        console.log('✅ Chapter data received from API:', response);
        
        if (response && response.length > 0) {
          // Find the specific chapter
          const chapter = response[0].cardItems.find(
            (item: BhagavadGitaChapterItem) => item.category === this.chapterNumber
          );
          
          if (chapter) {
            this.chapterData = chapter;
            console.log('📖 Found chapter:', this.chapterData);
            this.setupMetaTags();
          } else {
            this.error = `Chapter ${this.chapterNumber} not found`;
          }
        } else {
          this.error = 'No chapter data available';
        }
        
        this.loading = false;
        
        // Setup scroll detection after data is loaded
        this.setupScrollDetection();
      },
      error: (error) => {
        console.error('❌ Error fetching chapter data:', error);
        this.error = 'Failed to load chapter data';
        this.loading = false;
      }
    });
  }

  private setupMetaTags(): void {
    if (!this.chapterData) return;

    // Set page title
    const pageTitle = `Chapter ${this.chapterNumber}: ${this.chapterData.title}`;
    this.titleService.setTitle(pageTitle);

    // Set Open Graph meta tags for social media sharing
    const lordKrishnaImageUrl = 'https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg';
    
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: this.chapterData.desc });
    this.meta.updateTag({ property: 'og:image', content: lordKrishnaImageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    
    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: this.chapterData.desc });
    this.meta.updateTag({ name: 'twitter:image', content: lordKrishnaImageUrl });
    
    // WhatsApp specific meta tags
    this.meta.updateTag({ property: 'og:site_name', content: 'Hare Krishna Sloka' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Lord Krishna - Bhagavad Gita' });
    
    console.log('✅ Meta tags set up for social sharing with Lord Krishna image');
  }

  private scrollHandler: any = null;
  
  private setupScrollDetection(): void {
    // Add scroll event listener to detect when description section is visible
    setTimeout(() => {
      // Get the Ionic content element
      const content = document.querySelector('ion-content');
      if (!content) return;
      
      // Save the bound handler for later removal
      this.scrollHandler = this.onScroll.bind(this);
      
      // First, get the scrollable element inside ion-content
      const scrollEl = content.shadowRoot?.querySelector('.inner-scroll') || content;
      
      // Add event listener to the scrollable element
      scrollEl.addEventListener('scroll', this.scrollHandler);
      
      // Initial check in case page is already scrolled
      this.onScroll({ target: scrollEl });
      
      console.log('Scroll detection set up successfully');
    }, 500); // Longer delay to ensure DOM and shadow DOM are fully ready
  }

  private onScroll(event: any): void {
    if (!event.target) return;
    
    const scrollEl = event.target;
    const scrollTop = scrollEl.scrollTop;
    
    // Define a scroll threshold where we consider the user to be reading (e.g., 200px down)
    const scrollThreshold = 200;
    
    // Simple approach: show floating control when user has scrolled down enough
    const shouldShow = scrollTop > scrollThreshold;
    
    if (this.showFloatingControl !== shouldShow) {
      console.log(`Floating control visibility changed to: ${shouldShow}, scroll position: ${scrollTop}`);
      this.showFloatingControl = shouldShow;
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
    
    // Clean up audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }
  }

  playAudio(audioUrl: string): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      // If audio is currently playing, pause it
      this.pauseAudio();
    } else {
      // If no audio is playing or it's paused, start/resume playing
      this.startAudio(audioUrl);
    }
  }

  private startAudio(audioUrl: string): void {
    console.log(`Starting audio: ${audioUrl}`);
    
    // Stop any currently playing audio
    this.stopCurrentAudio();
    
    // Create new audio instance
    this.currentAudio = new Audio(audioUrl);
    this.currentAudio.playbackRate = this.playbackSpeed;
    
    // Set up event listeners
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.duration = this.currentAudio!.duration;
    });
    
    this.currentAudio.addEventListener('timeupdate', () => {
      this.currentTime = this.currentAudio!.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    });
    
    this.currentAudio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.currentTime = 0;
    });
    
    this.currentAudio.addEventListener('error', (error) => {
      console.error('Error playing audio:', error);
      this.isPlaying = false;
    });
    
    // Play the audio
    this.currentAudio.play().then(() => {
      this.isPlaying = true;
    }).catch(error => {
      console.error('Error playing audio:', error);
      this.isPlaying = false;
    });
  }

  private pauseAudio(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPlaying = false;
    }
  }

  private stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.isPlaying = false;
      this.progress = 0;
      this.currentTime = 0;
    }
  }

  // Format time in MM:SS format
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Handle progress bar click to seek
  onProgressBarClick(event: any): void {
    if (this.currentAudio && this.duration > 0) {
      const clickX = event.offsetX;
      const totalWidth = event.target.offsetWidth;
      const clickPercentage = clickX / totalWidth;
      const newTime = clickPercentage * this.duration;
      
      this.currentAudio.currentTime = newTime;
      this.currentTime = newTime;
      this.progress = clickPercentage * 100;
    }
  }

  // Change playback speed
  changePlaybackSpeed(): void {
    const currentIndex = this.availableSpeeds.indexOf(this.playbackSpeed);
    const nextIndex = (currentIndex + 1) % this.availableSpeeds.length;
    this.playbackSpeed = this.availableSpeeds[nextIndex];
    
    // Apply speed to current audio if playing
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.playbackSpeed;
    }
    
    console.log(`Playback speed changed to: ${this.playbackSpeed}x`);
  }

  // Download audio file
  downloadAudio(): void {
    if (this.chapterData && this.chapterData.audioData.audioSrc) {
      console.log('Starting audio download...');
      
      const audioUrl = this.chapterData.audioData.audioSrc;
      const fileName = `${this.chapterData.title}_Chapter_${this.chapterNumber}.mp3`;
      
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = fileName;
      link.target = '_blank';
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Download initiated for: ${fileName}`);
    } else {
      console.error('No audio source available for download');
    }
  }

  // Share chapter functionality
  shareChapter(): void {
    if (this.chapterData) {
      const shareText = `🕉️ இதோ இந்த பகவத் கீதை அத்தியாயத்தினை அர்த்தத்துடன் கேளுங்கள்: "${this.chapterData.title}" - அத்தியாயம் ${this.chapterNumber}

தமிழ் அர்த்தத்தையும் கேட்டு, இந்தப் புனித நூலின் ஆன்மீக போதனைகளைக் மனதில் பதிய வைக்கவும்.

#BhagavadGita #SpiritualLearning #HareKrishnaTamil #HareKrishnaSloka`;

      const shareUrl = window.location.href;

      // Check if Web Share API is supported
      if (navigator.share) {
        navigator.share({
          title: `${this.chapterData.title} - Bhagavad Gita Chapter ${this.chapterNumber}`,
          text: shareText,
          url: shareUrl
        }).then(() => {
          console.log('Content shared successfully');
        }).catch((error) => {
          console.log('Error sharing:', error);
          this.fallbackShare(shareText, shareUrl);
        });
      } else {
        // Fallback for browsers that don't support Web Share API
        this.fallbackShare(shareText, shareUrl);
      }
    }
  }

  private fallbackShare(text: string, url: string): void {
    // Create share options for different platforms
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(url);

    const shareOptions = [
      {
        name: 'Twitter',
        url: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`
      },
      {
        name: 'Facebook',
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`
      },
      {
        name: 'WhatsApp',
        url: `https://wa.me/?text=${encodedText}%20${encodedUrl}`
      },
      {
        name: 'LinkedIn',
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
      },
      {
        name: 'Copy Link',
        action: 'copy'
      }
    ];

    // Show share options (simple implementation)
    const shareMessage = `Share this chapter:\n\n${shareOptions.map((option, index) => 
      `${index + 1}. ${option.name}`).join('\n')}\n\nWhich platform would you like to use?`;

    // For now, just copy to clipboard and show alert
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n\n${url}`).then(() => {
        alert('Chapter details copied to clipboard! You can now paste and share on your preferred social media platform.');
      }).catch(() => {
        this.showShareAlert(text, url);
      });
    } else {
      this.showShareAlert(text, url);
    }
  }

  private showShareAlert(text: string, url: string): void {
    const fullText = `${text}\n\n${url}`;
    const userChoice = prompt(`Copy this text to share:\n\n${fullText}\n\nPress Ctrl+C to copy, then click OK`);
    if (userChoice !== null) {
      console.log('User acknowledged share text');
    }
  }

  goBack(): void {
    this.router.navigate(['/bhagavad-gita']);
  }
}
