import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { 
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  bookOutline,
  eyeOutline,
  eyeOffOutline,
  textOutline,
  volumeHighOutline,
  play,
  stop,
  arrowBackOutline,
  alertCircleOutline,
  informationCircleOutline,
  bulbOutline
} from 'ionicons/icons';
import { trigger, transition, style, animate } from '@angular/animations';
import { ArthaPatha, MeaningToSloka } from '../artha-patha';

@Component({
  selector: 'app-artha-patha-training',
  templateUrl: './artha-patha-training.component.html',
  styleUrls: ['./artha-patha-training.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonBackButton,
    IonButton,
    IonIcon,
    IonSpinner
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ArthaPathaTrainingComponent implements OnInit, OnDestroy {
  private arthaService = inject(ArthaPatha);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Signal for meaning data
  meaning = signal<MeaningToSloka | undefined | null>(undefined);

  // Visibility toggles
  isSlokaVisible: boolean = false;
  isTransliterationVisible: boolean = false;
  isWordMeaningVisible: boolean = false;

  // Audio state
  private audio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;

  constructor() {
    // Register icons
    addIcons({
      bookOutline,
      eyeOutline,
      eyeOffOutline,
      textOutline,
      volumeHighOutline,
      play,
      stop,
      arrowBackOutline,
      alertCircleOutline,
      informationCircleOutline,
      bulbOutline
    });
  }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.loadMeaning(id);
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }

  loadMeaning(id: number) {
    this.arthaService.getMeaningById(id).subscribe(data => {
      if (data) {
        this.meaning.set(data);
      } else {
        this.meaning.set(null);
      }
    });
  }

  toggleSlokaVisible() {
    this.isSlokaVisible = !this.isSlokaVisible;
  }

  toggleTransliterationVisible() {
    this.isTransliterationVisible = !this.isTransliterationVisible;
  }

  toggleWordMeaningVisible() {
    this.isWordMeaningVisible = !this.isWordMeaningVisible;
  }

  playAudio() {
    const audioUrl = this.meaning()?.audioUrl;
    if (!audioUrl) return;

    // Stop any currently playing audio
    this.stopAudio();

    // Create and play new audio
    this.audio = new Audio(audioUrl);
    this.audio.play().catch(error => {
      console.error('Audio playback failed:', error);
      alert('Audio file not found. Audio will be available soon!');
    });

    this.isPlaying = true;

    // Handle audio end
    this.audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });

    // Handle audio errors
    this.audio.addEventListener('error', () => {
      this.isPlaying = false;
      this.audio = null;
    });
  }

  stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying = false;
  }

  getCategoryColor(): string {
    const category = this.meaning()?.category;
    const colorMap: Record<string, string> = {
      'Karma Yoga': '#FF6B6B',
      'Bhakti Yoga': '#4ECDC4',
      'Jnana Yoga': '#95E1D3',
      'Dharma': '#F38181',
      'Detachment': '#AA96DA',
      'Self-Realization': '#FCBAD3'
    };
    return colorMap[category || ''] || '#FFD93D';
  }
}
