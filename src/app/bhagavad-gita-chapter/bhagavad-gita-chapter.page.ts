import { Component, OnInit } from '@angular/core';
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
  IonButtons
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaChapterItem } from '../bhagavad-gita/bhagavad-gita.service';
import { play, pause, arrowBack, download, speedometer } from 'ionicons/icons';
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
export class BhagavadGitaChapterPage implements OnInit {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService
  ) {
    addIcons({ play, pause, arrowBack, download, speedometer });
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
    console.log('Loading Bhagavad Gita chapter data...');
    
    this.bhagavadGitaService.getBgChaptersByCategory('tamil').subscribe({
      next: (response) => {
        console.log('Chapter data received:', response);
        
        if (response && response.length > 0) {
          // Find the specific chapter
          const chapter = response[0].cardItems.find(
            (item: BhagavadGitaChapterItem) => item.category === this.chapterNumber
          );
          
          if (chapter) {
            this.chapterData = chapter;
            console.log('Found chapter:', this.chapterData);
          } else {
            this.error = `Chapter ${this.chapterNumber} not found`;
          }
        } else {
          this.error = 'No chapter data available';
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error fetching chapter data:', error);
        this.error = 'Failed to load chapter data';
        this.loading = false;
      }
    });
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

  goBack(): void {
    this.router.navigate(['/bhagavad-gita']);
  }
}
