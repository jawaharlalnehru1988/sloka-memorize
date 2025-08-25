import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { Line, VakyaPadaSloka, Vakyapda } from './vakyapda';


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
  selector: 'app-vakyapada',
  templateUrl: './vakyapada.page.html',
  styleUrls: ['./vakyapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule]
})
export class VakyapadaPage implements OnInit {

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
  vakyaPadaSlokas: VakyaPadaSloka[] = [];

  // Sample sloka data with lines
 

  constructor(private vakyapda: Vakyapda) { }

  ngOnInit() {

    this.vakyaPadaSlokas =  this.vakyapda.vakyaPadaSlokas;
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

  selectSloka(slokaId: number) {
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
    // In production, you might want: if (lineIndex === 0) return true; return this.selectedSloka?.lines[lineIndex - 1].mastered || false;
    return true;
  }

  playLineAudio() {
    this.isPlaying = true;
    this.hasHeardAudio = true;
    
    // Simulate audio playback with highlighting
    setTimeout(() => {
      this.isPlaying = false;
    }, 3000);

    // TODO: Implement actual audio playback
    console.log('Playing audio for line:', this.currentLine.roman);
  }

  repeatLineAudio() {
    // Simulate playing audio 3 times
    this.playLineAudio();
    setTimeout(() => this.playLineAudio(), 4000);
    setTimeout(() => this.playLineAudio(), 8000);
  }

  startRecording() {
    this.isRecording = true;
    this.recordingFeedback = '';
    
    // Simulate recording process
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateRecording();
    }, 3000);

    // TODO: Implement actual speech recognition
    console.log('Recording attempt for line:', this.currentLine.roman);
  }

  private evaluateRecording() {
    // Simulate evaluation based on current practice mode
    const baseAccuracy = Math.random();
    let modifierAccuracy = 0;

    // Different difficulty based on practice mode
    switch (this.currentPracticeMode) {
      case 0: // Listen & Follow - easier
        modifierAccuracy = 0.3;
        break;
      case 1: // Listen & Repeat - moderate
        modifierAccuracy = 0.2;
        break;
      case 2: // Text Practice - moderate
        modifierAccuracy = 0.1;
        break;
      case 3: // Memory Test - hardest
        modifierAccuracy = 0;
        break;
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
    
    // Check if line is mastered (3 successful attempts)
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
    // Quick test method to mark current line as mastered
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
    alert('🎉 Full śloka practice mode - Coming soon!\n\nYou will practice the complete verse with natural flow and rhythm.');
  }

  earnBadge() {
    this.totalPoints += 100;
    alert('🏆 Congratulations!\n\nYou\'ve earned the "Vākyapāṭha Master" badge!\n\n+100 bonus points awarded!');
    
    // Move a badge from locked to earned
    if (this.lockedBadges.length > 0) {
      const newBadge = this.lockedBadges.shift();
      if (newBadge) {
        newBadge.unlocked = true;
        this.earnedBadges.push(newBadge);
      }
    }
  }

}
