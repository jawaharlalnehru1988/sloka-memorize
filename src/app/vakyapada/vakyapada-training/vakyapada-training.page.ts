import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { Line, VakyaPadaSloka, Vakyapda } from '../vakyapda';

interface PracticeMode {
  name: string;
  description: string;
  icon: string;
}

interface Badge {
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

@Component({
  selector: 'app-vakyapada-training',
  templateUrl: './vakyapada-training.page.html',
  styleUrls: ['./vakyapada-training.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    CommonModule, 
    FormsModule
  ]
})
export class VakyapadaTrainingPage implements OnInit {

  selectedSloka: VakyaPadaSloka | null = null;
  currentLineIndex: number = 0;
  currentPracticeMode: number = 0;
  isPlaying: boolean = false;
  isRecording: boolean = false;
  recordingFeedback: string = '';
  feedbackClass: string = '';
  hasHeardAudio: boolean = false;
  textVisible: boolean = true;

  // Gamification stats
  streakDays: number = 7;
  totalPoints: number = 450;
  completedSlokas: number = 3;
  practiceMinutes: number = 125;

  practiceModes: PracticeMode[] = [
    {
      name: 'Listen & Follow',
      description: 'Listen to audio while following highlighted text',
      icon: 'volume-high-outline'
    },
    {
      name: 'Listen & Repeat',
      description: 'Listen to audio then repeat the line',
      icon: 'repeat-outline'
    },
    {
      name: 'Text Practice',
      description: 'Practice with text support (can hide/show)',
      icon: 'document-text-outline'
    },
    {
      name: 'Memory Test',
      description: 'Recite from memory without any support',
      icon: 'brain-outline'
    }
  ];

  earnedBadges: Badge[] = [
    { name: 'First Steps', icon: 'footsteps-outline', color: 'primary', unlocked: true },
    { name: 'Line Master', icon: 'checkmark-circle-outline', color: 'success', unlocked: true },
    { name: 'Flow Expert', icon: 'water-outline', color: 'tertiary', unlocked: true }
  ];

  lockedBadges: Badge[] = [
    { name: 'Perfect Rhythm', icon: 'musical-notes-outline', color: 'warning', unlocked: false },
    { name: 'Sloka Sage', icon: 'library-outline', color: 'secondary', unlocked: false },
    { name: 'Daily Devotee', icon: 'calendar-outline', color: 'danger', unlocked: false }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vakyapda: Vakyapda
  ) { }

  ngOnInit() {
    // Get sloka ID from route parameters
    this.route.params.subscribe(params => {
      const slokaId = +params['id'];
      this.loadSloka(slokaId);
    });
  }

  private loadSloka(slokaId: number) {
    this.selectedSloka = this.vakyapda.vakyaPadaSlokas.find(s => s.id === slokaId) || null;
    this.currentLineIndex = 0;
    this.currentPracticeMode = 0;
    this.resetLineState();
    if (this.selectedSloka) {
      // Reset all line progress
      this.selectedSloka.lines.forEach(line => {
        line.attempts = [];
        line.successfulAttempts = 0;
        line.mastered = false;
      });
    }
  }

  get currentLine(): Line {
    return this.selectedSloka?.lines[this.currentLineIndex] || {
      devanagari: '',
      roman: '',
      meaning: '',
      attempts: [],
      successfulAttempts: 0,
      mastered: false
    };
  }

  get overallProgress(): number {
    if (!this.selectedSloka) return 0;
    const masteredLines = this.selectedSloka.lines.filter(line => line.mastered).length;
    return Math.round((masteredLines / this.selectedSloka.lines.length) * 100);
  }

  nextLine() {
    if (this.selectedSloka && this.currentLineIndex < this.selectedSloka.lines.length - 1) {
      this.currentLineIndex++;
      this.currentPracticeMode = 0;
      this.resetLineState();
    }
  }

  previousLine() {
    if (this.currentLineIndex > 0) {
      this.currentLineIndex--;
      this.resetLineState();
    }
  }

  setPracticeMode(mode: number) {
    if (this.isModeUnlocked(mode)) {
      this.currentPracticeMode = mode;
      this.resetLineState();
    }
  }

  isModeUnlocked(mode: number): boolean {
    if (mode === 0) return true; // Listen & Follow always unlocked
    if (mode === 1) return this.hasHeardAudio; // Listen & Repeat unlocked after hearing audio
    if (mode === 2) return this.currentLine.successfulAttempts >= 1; // Text Practice unlocked after 1 success
    if (mode === 3) return this.currentLine.successfulAttempts >= 2; // Memory Test unlocked after 2 successes
    return false;
  }

  isLineUnlocked(lineIndex: number): boolean {
    // For testing, allow access to all lines
    return true;
  }

  playLineAudio() {
    this.isPlaying = true;
    this.hasHeardAudio = true;
    
    // Simulate audio playback with highlighting
    setTimeout(() => {
      this.isPlaying = false;
    }, 3000);

    console.log('Playing audio for line:', this.currentLine.roman);
  }

  repeatLineAudio() {
    this.playLineAudio();
    setTimeout(() => this.playLineAudio(), 4000);
    setTimeout(() => this.playLineAudio(), 8000);
  }

  startRecording() {
    this.isRecording = true;
    this.recordingFeedback = '';
    
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateRecording();
    }, 3000);

    console.log('Recording attempt for line:', this.currentLine.roman);
  }

  private evaluateRecording() {
    const baseAccuracy = Math.random();
    let modifierAccuracy = 0;

    switch (this.currentPracticeMode) {
      case 0: modifierAccuracy = 0.3; break;
      case 1: modifierAccuracy = 0.2; break;
      case 2: modifierAccuracy = 0.1; break;
      case 3: modifierAccuracy = 0; break;
    }

    const finalAccuracy = Math.min(baseAccuracy + modifierAccuracy, 1);
    let attemptResult: 'success' | 'good' | 'failed';

    if (finalAccuracy > 0.8) {
      attemptResult = 'success';
      this.recordingFeedback = '🎉 Excellent flow and pronunciation!';
      this.feedbackClass = 'feedback-excellent';
      this.currentLine.successfulAttempts++;
      this.totalPoints += 10;
    } else if (finalAccuracy > 0.6) {
      attemptResult = 'good';
      this.recordingFeedback = '👍 Good attempt! Focus on smoother flow.';
      this.feedbackClass = 'feedback-good';
      this.totalPoints += 5;
    } else {
      attemptResult = 'failed';
      this.recordingFeedback = '🔄 Keep practicing! Listen and try again.';
      this.feedbackClass = 'feedback-needs-work';
    }

    this.currentLine.attempts.push(attemptResult);
    
    if (this.currentLine.successfulAttempts >= 3) {
      this.currentLine.mastered = true;
      this.recordingFeedback += ' 🏆 Line mastered!';
      this.totalPoints += 25;
    }
  }

  getAttemptClass(attempt: 'success' | 'good' | 'failed'): string {
    return `attempt-${attempt}`;
  }

  toggleTextVisibility() {
    this.textVisible = !this.textVisible;
  }

  markCurrentLineAsComplete() {
    this.currentLine.mastered = true;
    this.currentLine.successfulAttempts = 3;
    this.currentLine.attempts = ['success', 'success', 'success'];
    this.recordingFeedback = '🏆 Line marked as completed for testing!';
    this.feedbackClass = 'feedback-excellent';
  }

  private resetLineState() {
    this.recordingFeedback = '';
    this.hasHeardAudio = false;
    this.textVisible = true;
    this.isPlaying = false;
    this.isRecording = false;
  }

  isSlokaCompleted(): boolean {
    return this.selectedSloka ? this.selectedSloka.lines.every(line => line.mastered) : false;
  }

  practiceFullSloka() {
    console.log('Starting full sloka practice for:', this.selectedSloka?.title);
    alert('🎉 Full śloka practice mode - Coming soon!');
  }

  earnBadge() {
    this.totalPoints += 100;
    alert('🏆 Congratulations! You\'ve earned the "Vākyapāṭha Master" badge!');
    
    if (this.lockedBadges.length > 0) {
      const newBadge = this.lockedBadges.shift();
      if (newBadge) {
        newBadge.unlocked = true;
        this.earnedBadges.push(newBadge);
      }
    }
  }

  goBack() {
    this.router.navigate(['/vakyapada']);
  }

}
