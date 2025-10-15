import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonLabel,
  IonBackButton,
  IonButtons,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack,
  playOutline,
  pauseOutline,
  volumeHighOutline,
  bookOutline,
  heartOutline,
  helpCircleOutline,
  checkmarkCircle,
  closeCircle, textOutline, languageOutline, bulbOutline } from 'ionicons/icons';
import { PrashnaPatha, LifeQuestion, RelatedSloka } from '../prashna-patha';

@Component({
  selector: 'app-prashna-patha-training',
  templateUrl: './prashna-patha-training.component.html',
  styleUrls: ['./prashna-patha-training.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonChip,
    IonLabel,
    IonBackButton,
    IonButtons,
    IonSpinner
  ]
})
export class PrashnaPathaTrainingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private prashnaService = inject(PrashnaPatha);

  question = signal<LifeQuestion | undefined>(undefined);
  isLoading = signal(true);
  currentAudio: HTMLAudioElement | null = null;
  isPlaying = signal(false);
  showReflection = signal(false);

  constructor() {
    addIcons({
      arrowBack,
      playOutline,
      pauseOutline,
      volumeHighOutline,
      bookOutline,
      heartOutline,
      helpCircleOutline,
      checkmarkCircle,
      closeCircle,
      textOutline,
      languageOutline,
      bulbOutline
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadQuestion(parseInt(id));
    } else {
      this.router.navigate(['/prashna-patha']);
    }
  }

  loadQuestion(id: number) {
    this.isLoading.set(true);
    this.prashnaService.getQuestionById(id).subscribe(q => {
      this.question.set(q);
      this.isLoading.set(false);
    });
  }

  playAudio(audioUrl: string) {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
    }

    if (audioUrl && audioUrl !== 'assets/audio/questions/q1.mp3') {
      // Only play if it's a real audio URL (not placeholder)
      this.currentAudio = new Audio(audioUrl);
      this.currentAudio.play();
      this.isPlaying.set(true);

      this.currentAudio.onended = () => {
        this.isPlaying.set(false);
      };
    } else {
      alert('Audio coming soon! This feature will include Sanskrit pronunciation by expert reciters.');
    }
  }

  stopAudio() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio = null;
      this.isPlaying.set(false);
    }
  }

  toggleReflection() {
    this.showReflection.set(!this.showReflection());
  }

  goBack() {
    this.router.navigate(['/prashna-patha']);
  }

  getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
      'Career': 'primary',
      'Fear': 'danger',
      'Anger': 'warning',
      'Loss': 'medium',
      'Confusion': 'tertiary',
      'Relationships': 'secondary',
      'Motivation': 'success',
      'Peace': 'success',
      'Justice': 'primary',
      'Self-Realization': 'tertiary'
    };
    return colorMap[category] || 'primary';
  }

  ngOnDestroy() {
    this.stopAudio();
  }
}
