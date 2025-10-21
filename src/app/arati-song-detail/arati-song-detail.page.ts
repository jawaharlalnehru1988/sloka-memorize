import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton,
  IonImg,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonIcon,
  IonSpinner,
  IonButton,
  IonChip,
  IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, musicalNotesOutline, shareOutline, downloadOutline, heartOutline, refreshOutline, arrowBackOutline } from 'ionicons/icons';

import { AratiSongsService, SongItem } from '../services/arati-songs.service';
import { AudioPlayerComponent } from '../shared/audio-player/audio-player.component';

@Component({
  selector: 'app-arati-song-detail',
  templateUrl: './arati-song-detail.page.html',
  styleUrls: ['./arati-song-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons, 
    IonBackButton,
    IonImg,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
    IonIcon,
    IonSpinner,
    IonButton,
    IonChip,
    IonLabel,
    CommonModule, 
    FormsModule,
    AudioPlayerComponent
  ]
})
export class AratiSongDetailPage implements OnInit {
  // Signals for reactive state management
  song = signal<SongItem | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);
  isPlaying = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aratiSongsService: AratiSongsService
  ) {
    // Add required icons
    addIcons({refreshOutline,arrowBackOutline,personOutline,heartOutline,musicalNotesOutline,shareOutline,downloadOutline});
  }

  ngOnInit() {
    this.loadSongDetails();
  }

  /**
   * Load song details from route parameter
   */
  private async loadSongDetails(): Promise<void> {
    try {
      const encodedTitle = this.route.snapshot.paramMap.get('title');
      if (!encodedTitle) {
        this.error.set('No song title provided');
        this.isLoading.set(false);
        return;
      }

      const title = decodeURIComponent(encodedTitle);
      const songData = await this.aratiSongsService.getSongByTitle(title);
      
      if (songData) {
        this.song.set(songData);
      } else {
        this.error.set('Song not found');
      }
    } catch (error) {
      console.error('Error loading song details:', error);
      this.error.set('Failed to load song details');
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Handle audio player play event
   */
  onAudioPlay(): void {
    this.isPlaying.set(true);
    console.log('Audio started playing:', this.song()?.title);
  }

  /**
   * Handle audio player pause event
   */
  onAudioPause(): void {
    this.isPlaying.set(false);
    console.log('Audio paused:', this.song()?.title);
  }

  /**
   * Handle audio player time update event
   */
  onAudioTimeUpdate(event: { currentTime: number; duration: number }): void {
    // Can be used for progress tracking or analytics
    console.log('Audio time update:', event);
  }

  /**
   * Handle audio download event
   */
  onAudioDownload(): void {
    console.log('Download requested for:', this.song()?.title);
    // Additional download logic can be added here
  }

  /**
   * Handle audio share event
   */
  onAudioShare(): void {
    console.log('Share requested for:', this.song()?.title);
    // Additional share logic can be added here
  }

  /**
   * Handle loop toggle event
   */
  onLoopToggle(isLooping: boolean): void {
    console.log('Loop mode toggled:', isLooping ? 'ON' : 'OFF', 'for song:', this.song()?.title);
    // Additional loop logic can be added here
  }

  /**
   * Navigate back to songs list
   */
  goBack(): void {
    this.router.navigate(['/arati-songs']);
  }

  /**
   * Retry loading song details
   */
  onRetry(): void {
    this.loadSongDetails();
  }

  /**
   * Add to favorites (placeholder for future feature)
   */
  onAddToFavorites(): void {
    console.log('Add to favorites:', this.song()?.title);
    // Future implementation for favorites functionality
  }
}
