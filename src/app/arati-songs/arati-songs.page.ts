import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonSearchbar, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonCardContent, 
  IonImg, 
  IonSpinner, 
  IonText,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { playOutline, personOutline, musicalNotesOutline, searchOutline, refreshOutline } from 'ionicons/icons';

import { AratiSongsService, SongItem, AratiSongsResponse } from '../services/arati-songs.service';

@Component({
  selector: 'app-arati-songs',
  templateUrl: './arati-songs.page.html',
  styleUrls: ['./arati-songs.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonSearchbar, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
    IonImg, 
    IonSpinner, 
    IonText,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
    IonButtons,
    IonBackButton,
    CommonModule, 
    FormsModule
  ]
})
export class AratiSongsPage implements OnInit {
  // Signals for reactive state management
  isLoading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  songsData = signal<AratiSongsResponse | null>(null);

  // Computed signal for filtered songs
  filteredSongs = computed(() => {
    const data = this.songsData();
    const search = this.searchTerm().toLowerCase().trim();
    
    if (!data || !search) {
      return data?.cardItems || [];
    }

    return data.cardItems.filter(song =>
      song.title.toLowerCase().includes(search) ||
      song.audioData.auther.toLowerCase().includes(search) ||
      song.desc.toLowerCase().includes(search)
    );
  });

  constructor(
    private aratiSongsService: AratiSongsService,
    private router: Router
  ) {
    // Add required icons
    addIcons({musicalNotesOutline,refreshOutline,playOutline,personOutline,searchOutline});
  }

  ngOnInit() {
    this.loadSongs();
  }

  /**
   * Load arati songs from the API
   */
  private loadSongs(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.aratiSongsService.getAratiSongs().subscribe({
      next: (response: any) => {
      console.log('Response:', response);
        this.songsData.set(response);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading arati songs:', error);
        this.error.set('Failed to load devotional songs. Please try again.');
        this.isLoading.set(false);
      }
    });
  }

  /**
   * Handle search input changes
   */
  onSearchChange(event: any): void {
    const value = event.detail.value || '';
    this.searchTerm.set(value);
  }

  /**
   * Navigate to song detail page
   */
  onSongCardClick(song: SongItem): void {
    // Encode the title for URL safety
    const encodedTitle = encodeURIComponent(song.title);
    this.router.navigate(['/arati-song-detail', encodedTitle]);
  }

  /**
   * Retry loading songs
   */
  onRetry(): void {
    this.loadSongs();
  }

  /**
   * Truncate description text for card display
   */
  truncateText(text: string, maxLength: number = 120): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  }

  /**
   * TrackBy function for ngFor optimization
   */
  trackBySongTitle(index: number, song: SongItem): string {
    return song.title;
  }
}
