import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
  IonBadge, IonChip, IonLabel
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBack, calculator, volumeHigh, play, pause, refresh, eye, eyeOff,
  text, book, informationCircle, checkmarkCircle, alertCircle
} from 'ionicons/icons';
import { NumberToVerse, VerseReference } from '../number-to-verse';

@Component({
  selector: 'app-number-to-verse-training',
  templateUrl: './number-to-verse-training.component.html',
  styleUrls: ['./number-to-verse-training.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonIcon,
    IonBadge, IonChip, IonLabel
  ]
})
export class NumberToVerseTrainingComponent implements OnInit, OnDestroy {
  private verseService = inject(NumberToVerse);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  verse = signal<VerseReference | null | undefined>(undefined);
  isSlokaVisible: boolean = false;
  isPlaying: boolean = false;
  audioElement: HTMLAudioElement | null = null;

  constructor() {
    // Register icons
    addIcons({
      arrowBack,
      calculator,
      volumeHigh,
      play,
      pause,
      refresh,
      eye,
      eyeOff,
      text,
      book,
      informationCircle,
      checkmarkCircle,
      alertCircle
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadVerse(parseInt(id, 10));
    }
  }

  ngOnDestroy() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }
  }

  loadVerse(id: number) {
    this.verseService.getVerseById(id).subscribe(verse => {
      this.verse.set(verse);
    });
  }

  toggleSlokaVisible() {
    this.isSlokaVisible = !this.isSlokaVisible;
  }

  playAudio() {
    const verseData = this.verse();
    if (!verseData?.audioUrl) return;

    if (this.audioElement) {
      if (this.isPlaying) {
        this.audioElement.pause();
        this.isPlaying = false;
      } else {
        this.audioElement.play();
        this.isPlaying = true;
      }
    } else {
      this.audioElement = new Audio(verseData.audioUrl);
      this.audioElement.play();
      this.isPlaying = true;

      this.audioElement.addEventListener('ended', () => {
        this.isPlaying = false;
      });
    }
  }

  stopAudio() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
      this.isPlaying = false;
    }
  }

  goBack() {
    this.router.navigate(['/number-to-verse-technique']);
  }

  getChapterColor(chapter: number): string {
    const colors: { [key: number]: string } = {
      2: '#9C27B0',
      3: '#7B1FA2',
      4: '#6A1B9A',
      6: '#4A148C',
      9: '#8E24AA',
      18: '#AB47BC'
    };
    return colors[chapter] || '#9C27B0';
  }
}
