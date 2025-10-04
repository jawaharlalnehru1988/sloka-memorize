import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaSloka } from '../bhagavad-gita/bhagavad-gita.service';
import { AudioPlayerComponent } from '../shared/audio-player/audio-player.component';
import { 
  play, 
  pause, 
  arrowBack, 
  download, 
  speedometer, 
  share, 
  refresh,
  chevronBack,
  chevronForward,
  list
} from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-sloka-renderer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    AudioPlayerComponent
  ],
  templateUrl: './sloka-renderer.component.html',
  styleUrls: ['./sloka-renderer.component.scss']
})
export class SlokaRendererComponent implements OnInit, OnDestroy {
  currentSloka: BhagavadGitaSloka | null = null;
  allSlokas: BhagavadGitaSloka[] = [];
  loading: boolean = true;
  error: string = '';
  showAllSlokas: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService
  ) {
    addIcons({
      play,
      pause,
      arrowBack,
      download,
      speedometer,
      share,
      refresh,
      chevronBack,
      chevronForward,
      list
    });
  }

  ngOnInit() {
    const slokaId = this.route.snapshot.paramMap.get('id');
    const viewMode = this.route.snapshot.queryParamMap.get('view');
    
    if (viewMode === 'all') {
      this.showAllSlokas = true;
      this.loadAllSlokas();
    } else if (slokaId) {
      this.loadSlokaById(slokaId);
    } else {
      this.loadAllSlokas();
    }
  }

  ngOnDestroy(): void {
    // Component cleanup - audio is now handled by AudioPlayerComponent
  }

  private loadSlokaById(id: string): void {
    console.log('🔄 Loading sloka by ID:', id);
    
    this.bhagavadGitaService.getSlokaById(id).subscribe({
      next: (sloka) => {
        console.log('✅ Sloka loaded:', sloka);
        this.currentSloka = sloka;
        this.loading = false;
        this.loadAllSlokas(); // Load all slokas for navigation
      },
      error: (error) => {
        console.error('❌ Error loading sloka:', error);
        this.handleError(error);
        this.loading = false;
      }
    });
  }

  loadAllSlokas(): void {
    console.log('🔄 Loading all slokas...');
    
    this.bhagavadGitaService.getBgSlokas().subscribe({
      next: (slokas) => {
        console.log('✅ All slokas loaded:', slokas.length);
        this.allSlokas = slokas.sort((a, b) => a.orderNo - b.orderNo);
        
        // If no current sloka is set and we have slokas, set the first one
        if (!this.currentSloka && this.allSlokas.length > 0) {
          this.currentSloka = this.allSlokas[0];
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error loading slokas:', error);
        this.handleError(error);
        this.loading = false;
      }
    });
  }

  private handleError(error: any): void {
    if (!navigator.onLine) {
      this.error = 'No internet connection. Please check your network and try again.';
    } else if (error.status === 0 || error.name === 'NetworkError') {
      this.error = 'Network error occurred. Please check your internet connection and try again.';
    } else if (error.status >= 500) {
      this.error = 'Server is temporarily unavailable. Please check your internet connection and try again later.';
    } else if (error.status === 404) {
      this.error = 'Sloka not found. Please check your internet connection and try again.';
    } else {
      this.error = 'Failed to load sloka data. Please check your internet connection and try again.';
    }
  }

  retryLoading(): void {
    console.log('🔄 Retrying to load sloka data...');
    
    this.error = '';
    this.loading = true;
    
    if (!navigator.onLine) {
      this.error = 'No internet connection detected. Please connect to the internet and try again.';
      this.loading = false;
      return;
    }
    
    const slokaId = this.route.snapshot.paramMap.get('id');
    if (slokaId) {
      this.loadSlokaById(slokaId);
    } else {
      this.loadAllSlokas();
    }
  }

  selectSloka(sloka: BhagavadGitaSloka): void {
    this.currentSloka = sloka;
    this.showAllSlokas = false;
    
    // Update URL without navigating
    const url = this.router.createUrlTree(['/sloka-renderer', sloka._id]);
    window.history.replaceState({}, '', url.toString());
  }

  // Navigation methods
  goToPreviousSloka(): void {
    if (!this.currentSloka || this.allSlokas.length === 0) return;
    
    const currentIndex = this.allSlokas.findIndex(s => s._id === this.currentSloka!._id);
    if (currentIndex > 0) {
      this.selectSloka(this.allSlokas[currentIndex - 1]);
    }
  }

  goToNextSloka(): void {
    if (!this.currentSloka || this.allSlokas.length === 0) return;
    
    const currentIndex = this.allSlokas.findIndex(s => s._id === this.currentSloka!._id);
    if (currentIndex < this.allSlokas.length - 1) {
      this.selectSloka(this.allSlokas[currentIndex + 1]);
    }
  }

  hasPreviousSloka(): boolean {
    if (!this.currentSloka || this.allSlokas.length === 0) return false;
    const currentIndex = this.allSlokas.findIndex(s => s._id === this.currentSloka!._id);
    return currentIndex > 0;
  }

  hasNextSloka(): boolean {
    if (!this.currentSloka || this.allSlokas.length === 0) return false;
    const currentIndex = this.allSlokas.findIndex(s => s._id === this.currentSloka!._id);
    return currentIndex < this.allSlokas.length - 1;
  }

  // Handle download from audio player component
  handleDownload(audioUrl: string): void {
    if (this.currentSloka) {
      console.log('Starting audio download...');
      
      const fileName = `Sloka_${this.currentSloka.slokaNo.replace('.', '_')}.mp3`;
      
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = fileName;
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Download initiated for: ${fileName}`);
    } else {
      console.error('No sloka data available for download');
    }
  }

  downloadAudio(): void {
    if (this.currentSloka && this.currentSloka.SlokaVoice) {
      this.handleDownload(this.currentSloka.SlokaVoice);
    } else {
      console.error('No audio source available for download');
    }
  }

  // Preview methods for list view
  getTextPreview(text: string): string {
    return text.length > 100 ? text.substring(0, 100) + '...' : text;
  }

  getMeaningPreview(meaning: string): string {
    return meaning.length > 80 ? meaning.substring(0, 80) + '...' : meaning;
  }

  // Share methods
  shareSloka(sloka?: BhagavadGitaSloka, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    
    const slokaToShare = sloka || this.currentSloka;
    if (!slokaToShare) return;
    
    const shareText = `🕉️ பகவத் கீதை ஸ்லோகா ${slokaToShare.slokaNo}

${slokaToShare.slokaText}

தமிழ் அர்த்தம்:
${slokaToShare.slokaMeaning}

#BhagavadGita #SpiritualLearning #HareKrishnaTamil #HareKrishnaSloka`;

    const shareUrl = `${window.location.origin}/sloka-renderer/${slokaToShare._id}`;

    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita Sloka ${slokaToShare.slokaNo}`,
        text: shareText,
        url: shareUrl
      }).then(() => {
        console.log('Sloka shared successfully');
      }).catch((error) => {
        console.log('Error sharing:', error);
        this.fallbackShare(shareText, shareUrl);
      });
    } else {
      this.fallbackShare(shareText, shareUrl);
    }
  }

  private fallbackShare(text: string, url: string): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n\n${url}`).then(() => {
        alert('Sloka details copied to clipboard! You can now paste and share on your preferred social media platform.');
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

  playSloka(sloka: BhagavadGitaSloka, event: Event): void {
    event.stopPropagation();
    
    if (sloka.SlokaVoice) {
      // This will be handled by individual audio players in each card if needed
      // For now, just select the sloka to show its dedicated audio player
      this.selectSloka(sloka);
    }
  }

  goBack(): void {
    this.router.navigate(['/bhagavad-gita']);
  }
}