import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { play, pause, download, speedometer, share } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonText
  ]
})
export class AudioPlayerComponent implements OnDestroy, OnChanges {
  @Input() audioUrl: string = '';
  @Input() audioTitle: string = 'Audio';
  @Input() enableDownload: boolean = true;
  @Input() enableShare: boolean = true;
  @Input() enableSpeedControl: boolean = true;
  @Input() autoLoadMetadata: boolean = true;
  
  @Output() onPlay = new EventEmitter<void>();
  @Output() onPause = new EventEmitter<void>();
  @Output() onTimeUpdate = new EventEmitter<{ currentTime: number, duration: number, progress: number }>();
  @Output() onDownload = new EventEmitter<string>();
  @Output() onShare = new EventEmitter<void>();
  
  // Audio control properties
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;
  playbackSpeed: number = 1;
  availableSpeeds: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  // Touch/drag support for progress bar
  private isDragging: boolean = false;
  private progressContainer: HTMLElement | null = null;

  constructor() {
    addIcons({
      play,
      pause,
      download,
      speedometer,
      share
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioUrl'] && changes['audioUrl'].currentValue) {
      // Clean up previous audio
      if (this.currentAudio) {
        this.stopCurrentAudio(true);
        this.currentAudio = null;
      }
      
      // Initialize new audio if autoLoadMetadata is enabled
      if (this.autoLoadMetadata) {
        this.initializeAudio(this.audioUrl);
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up audio
    if (this.currentAudio) {
      this.stopCurrentAudio(true);
      this.currentAudio = null;
    }
  }

  playAudio(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      // If audio is currently playing, pause it
      this.pauseAudio();
    } else {
      // If no audio is playing or it's paused, start/resume playing
      this.resumeOrStartAudio();
    }
  }

  private resumeOrStartAudio(): void {
    // If audio is already initialized and just paused, resume it
    if (this.currentAudio && this.currentAudio.src.includes(this.audioUrl)) {
      console.log('Resuming audio from current position:', this.currentTime);
      this.currentAudio.play().then(() => {
        this.isPlaying = true;
        this.onPlay.emit();
        console.log('Audio resumed successfully');
      }).catch(error => {
        console.error('Error resuming audio:', error);
        this.isPlaying = false;
      });
    } else {
      // If no audio or different audio, start fresh
      this.startAudio();
    }
  }

  private startAudio(): void {
    console.log(`Starting audio: ${this.audioUrl}`);
    
    // Store current position if audio exists
    const savedTime = this.currentAudio ? this.currentAudio.currentTime : 0;
    
    // Only stop current audio if it's a different source
    if (this.currentAudio && !this.currentAudio.src.includes(this.audioUrl)) {
      this.stopCurrentAudio(true); // Reset time for different audio
    }
    
    // Initialize audio if not already done or if it's a different source
    if (!this.currentAudio || !this.currentAudio.src.includes(this.audioUrl)) {
      this.initializeAudio(this.audioUrl);
    }
    
    // Wait for metadata to be loaded before playing
    if (this.duration <= 0) {
      this.currentAudio!.addEventListener('loadedmetadata', () => {
        // Restore saved position if any
        if (savedTime > 0 && this.currentAudio) {
          this.currentAudio.currentTime = savedTime;
          this.currentTime = savedTime;
          this.progress = (savedTime / this.duration) * 100;
        }
        this.playLoadedAudio();
      }, { once: true });
    } else {
      // Restore saved position if any
      if (savedTime > 0 && this.currentAudio) {
        this.currentAudio.currentTime = savedTime;
        this.currentTime = savedTime;
        this.progress = (savedTime / this.duration) * 100;
      }
      this.playLoadedAudio();
    }
  }
  
  private playLoadedAudio(): void {
    if (!this.currentAudio) return;
    
    // Play the audio
    this.currentAudio.play().then(() => {
      this.isPlaying = true;
      this.onPlay.emit();
      console.log('Audio started playing successfully');
    }).catch(error => {
      console.error('Error playing audio:', error);
      this.isPlaying = false;
    });
  }

  private pauseAudio(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.onPause.emit();
    }
  }

  private stopCurrentAudio(resetTime: boolean = true): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      if (resetTime) {
        this.currentAudio.currentTime = 0;
        this.progress = 0;
        this.currentTime = 0;
      }
      this.isPlaying = false;
    }
  }

  // Initialize audio without playing (for seeking when not yet started)
  private initializeAudio(audioUrl: string): void {
    if (this.currentAudio) return; // Already initialized
    
    console.log(`Initializing audio for seeking: ${audioUrl}`);
    
    // Create new audio instance
    this.currentAudio = new Audio(audioUrl);
    this.currentAudio.preload = 'metadata'; // Load metadata immediately
    this.currentAudio.playbackRate = this.playbackSpeed;
    
    // Set up event listeners
    this.currentAudio.addEventListener('loadedmetadata', () => {
      this.duration = this.currentAudio!.duration;
      console.log(`Audio metadata loaded, duration: ${this.duration} seconds`);
    });
    
    this.currentAudio.addEventListener('timeupdate', () => {
      this.currentTime = this.currentAudio!.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
      this.onTimeUpdate.emit({
        currentTime: this.currentTime,
        duration: this.duration,
        progress: this.progress
      });
    });
    
    this.currentAudio.addEventListener('ended', () => {
      this.isPlaying = false;
      this.progress = 0;
      this.currentTime = 0;
    });
    
    this.currentAudio.addEventListener('error', (error) => {
      console.error('Error loading audio:', error);
    });
    
    // Force load metadata
    this.currentAudio.load();
  }

  // Progress bar handlers
  onProgressBarClick(event: any): void {
    if (this.isDragging) return; // Don't handle click if we're dragging
    this.seekToPosition(event);
  }
  
  // Touch event handlers for mobile devices
  onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.progressContainer = event.target as HTMLElement;
    this.addDraggingClass();
    this.seekToPosition(event);
  }
  
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.seekToPosition(event);
  }
  
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.isDragging = false;
    this.removeDraggingClass();
    this.progressContainer = null;
  }
  
  // Mouse event handlers for desktop devices
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.progressContainer = event.target as HTMLElement;
    this.addDraggingClass();
    this.seekToPosition(event);
  }
  
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.seekToPosition(event);
  }
  
  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.isDragging = false;
    this.removeDraggingClass();
    this.progressContainer = null;
  }
  
  // Helper methods for visual feedback
  private addDraggingClass(): void {
    const container = document.querySelector('.audio-progress-container');
    if (container) {
      container.classList.add('dragging');
    }
  }
  
  private removeDraggingClass(): void {
    const container = document.querySelector('.audio-progress-container');
    if (container) {
      container.classList.remove('dragging');
    }
  }
  
  // Common seek function for both touch and mouse events
  private seekToPosition(event: TouchEvent | MouseEvent | any): void {
    // If no audio is loaded yet, create it first
    if (!this.currentAudio && this.audioUrl) {
      this.initializeAudio(this.audioUrl);
    }
    
    if (!this.currentAudio) return;
    
    // If duration is not available yet, wait for metadata to load
    if (this.duration <= 0) {
      this.currentAudio.addEventListener('loadedmetadata', () => {
        this.performSeek(event);
      }, { once: true });
      
      // Force load metadata if not already loading
      if (this.currentAudio.readyState === 0) {
        this.currentAudio.load();
      }
      return;
    }
    
    this.performSeek(event);
  }
  
  private performSeek(event: TouchEvent | MouseEvent | any): void {
    if (!this.currentAudio || this.duration <= 0) return;
    
    let clientX: number;
    
    // Get the appropriate clientX based on event type
    if (event.type.startsWith('touch')) {
      const touchEvent = event as TouchEvent;
      if (touchEvent.touches && touchEvent.touches.length > 0) {
        clientX = touchEvent.touches[0].clientX;
      } else if (touchEvent.changedTouches && touchEvent.changedTouches.length > 0) {
        clientX = touchEvent.changedTouches[0].clientX;
      } else {
        return;
      }
    } else {
      clientX = (event as MouseEvent).clientX || event.offsetX;
    }
    
    // Find the progress container element
    let progressElement = event.target as HTMLElement;
    while (progressElement && !progressElement.classList.contains('audio-progress-container')) {
      progressElement = progressElement.parentElement!;
    }
    
    if (!progressElement) return;
    
    const rect = progressElement.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const totalWidth = rect.width;
    const clickPercentage = Math.max(0, Math.min(1, clickX / totalWidth));
    const newTime = clickPercentage * this.duration;
    
    this.currentAudio.currentTime = newTime;
    this.currentTime = newTime;
    this.progress = clickPercentage * 100;
  }

  // Format time in MM:SS format
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
    if (this.audioUrl) {
      this.onDownload.emit(this.audioUrl);
    }
  }

  // Share functionality
  shareAudio(): void {
    this.onShare.emit();
  }
}
