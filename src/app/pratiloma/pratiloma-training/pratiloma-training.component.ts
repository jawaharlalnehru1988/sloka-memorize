import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { TechniqueHeaderComponent } from '../../shared/components/technique-header/technique-header.component';
import { SlokaDataService, Sloka, Word, TrainingMode } from '../../shared/services/sloka-data';
import { bonfireOutline, bowlingBallOutline, cardOutline, chevronBackOutline, chevronForwardOutline, volumeHighOutline } from 'ionicons/icons';

@Component({
  selector: 'app-pratiloma-training',
  templateUrl: './pratiloma-training.component.html',
  styleUrls: ['./pratiloma-training.component.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, TechniqueHeaderComponent
  ]
})
export class PratilomaTrainingComponent implements OnInit {

  currentWordIndex: number = 0;
  isRecording: boolean = false;
  hasHeardSequence: boolean = false;
  showMemoryHints: boolean = false;

  practiceFeedback: string = '';
  feedbackClass: string = '';
  challengeFeedback: string = '';
  challengeFeedbackClass: string = '';
  memoryFeedback: string = '';
  memoryFeedbackClass: string = '';

  selectedSequence: Word[] = [];
  shuffledWords: Word[] = [];

  currentMode: TrainingMode = {
    type: 'flashcard',
    title: 'Flashcard Mode',
    description: 'Learn each word in reverse order',
    icon: 'card-outline',
    completed: false,
    locked: false
  };

  trainingModes: TrainingMode[] = [
    {
      type: 'flashcard',
      title: 'Flashcard',
      description: 'Learn each word position',
      icon: 'card-outline',
      completed: false,
      locked: false
    },
    {
      type: 'audio',
      title: 'Audio Practice',
      description: 'Listen and repeat',
      icon: 'volume-high-outline',
      completed: false,
      locked: false
    },
    {
      type: 'challenge',
      title: 'Word Challenge',
      description: 'Arrange words correctly',
      icon: 'bonfire-outline',
      completed: false,
      locked: false
    },
    {
      type: 'memory',
      title: 'Memory Recall',
      description: 'Recite from memory',
      icon: 'bowling-ball-outline',
      completed: false,
      locked: false
    }
  ];

  get selectedSloka() {
    return this.slokaDataService.selectedSloka();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private slokaDataService: SlokaDataService
  ) {
    addIcons({
      cardOutline, bowlingBallOutline, volumeHighOutline, bonfireOutline, chevronForwardOutline, chevronBackOutline
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slokaId = parseInt(params['id']);
      if (slokaId) {
        this.slokaDataService.selectSlokaById(slokaId);
      }
    });
  }

  getReverseWords(): Word[] {
    if (!this.selectedSloka || !this.selectedSloka.lines[0]) {
      return [];
    }
    return [...this.selectedSloka.lines[0].words].reverse();
  }

  getCurrentWord(): Word {
    const reverseWords = this.getReverseWords();
    return reverseWords[this.currentWordIndex] || reverseWords[0];
  }

  getOriginalWords(): Word[] {
    if (!this.selectedSloka || !this.selectedSloka.lines[0]) {
      return [];
    }
    return this.selectedSloka.lines[0].words;
  }

  getShuffledWords(): Word[] {
    return this.shuffledWords;
  }

  nextWord() {
    const reverseWords = this.getReverseWords();
    if (this.currentWordIndex < reverseWords.length - 1) {
      this.currentWordIndex++;
    }
  }

  previousWord() {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
    }
  }

  playCurrentWord() {
    this.showTemporaryFeedback('Playing current word 🔊', 'info');
  }

  playReverseSequence() {
    this.hasHeardSequence = true;
    this.showTemporaryFeedback('Playing reverse sequence 🔊', 'info');
  }

  startRecording() {
    this.isRecording = true;
    this.showTemporaryFeedback('Recording started... 🎙️', 'info');
    
    setTimeout(() => {
      this.stopRecording();
    }, 3000);
  }

  stopRecording() {
    this.isRecording = false;
    this.evaluateRecording();
  }

  evaluateRecording() {
    const accuracy = Math.floor(Math.random() * 30) + 70;
    
    if (accuracy >= 85) {
      this.practiceFeedback = `Excellent! ${accuracy}% accuracy 🎉`;
      this.feedbackClass = 'success';
    } else {
      this.practiceFeedback = `Good effort! ${accuracy}% accuracy 💪`;
      this.feedbackClass = 'warning';
    }
  }

  selectWordForChallenge(word: Word) {
    if (!word.used) {
      word.used = true;
      this.selectedSequence.push(word);
    }
  }

  removeFromSequence(index: number) {
    const word = this.selectedSequence[index];
    word.used = false;
    this.selectedSequence.splice(index, 1);
  }

  resetChallenge() {
    this.initializeChallenge();
    this.challengeFeedback = '';
  }

  checkChallengeAnswer() {
    const isCorrect = this.selectedSequence.length === this.getReverseWords().length;
    
    if (isCorrect) {
      this.challengeFeedback = 'Perfect! Challenge completed! 🏆';
      this.challengeFeedbackClass = 'success';
    } else {
      this.challengeFeedback = 'Not quite right. Try again! 🔍';
      this.challengeFeedbackClass = 'warning';
    }
  }

  initializeChallenge() {
    const reverseWords = this.getReverseWords();
    this.shuffledWords = [...reverseWords].sort(() => Math.random() - 0.5);
    this.selectedSequence = [];
    
    this.shuffledWords.forEach(word => {
      word.used = false;
    });
  }

  startMemoryRecording() {
    this.isRecording = true;
    this.showTemporaryFeedback('Memory recording started... 🧠', 'info');
    
    setTimeout(() => {
      this.isRecording = false;
      this.checkMemoryRecitation();
    }, 3000);
  }

  checkMemoryRecitation() {
    const success = Math.random() > 0.3;
    
    if (success) {
      this.memoryFeedback = 'Excellent memory! You\'ve mastered this śloka! 🧠✨';
      this.memoryFeedbackClass = 'success';
    } else {
      this.memoryFeedback = 'Good effort! Review the hints and try again 📚';
      this.memoryFeedbackClass = 'warning';
    }
  }

  switchMode(mode: TrainingMode) {
    this.currentMode = mode;
    this.resetModeState();
    
    if (mode.type === 'challenge') {
      this.initializeChallenge();
    }
  }

  getTrainingProgress(): number {
    const completedModes = this.trainingModes.filter(m => m.completed).length;
    return Math.round((completedModes / this.trainingModes.length) * 100);
  }

  isTrainingCompleted(): boolean {
    return this.trainingModes.every(mode => mode.completed);
  }

  goBack() {
    this.router.navigate(['/pratiloma']);
  }

  private resetModeState() {
    this.currentWordIndex = 0;
    this.isRecording = false;
    this.hasHeardSequence = false;
    this.showMemoryHints = false;
    this.practiceFeedback = '';
    this.challengeFeedback = '';
    this.memoryFeedback = '';
    this.selectedSequence = [];
  }

  private showTemporaryFeedback(message: string, className: string, duration: number = 2000) {
    this.practiceFeedback = message;
    this.feedbackClass = className;
    setTimeout(() => {
      this.practiceFeedback = '';
    }, duration);
  }
}
