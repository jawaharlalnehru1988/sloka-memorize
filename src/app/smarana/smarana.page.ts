import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButtons, 
  IonBackButton, 
  IonIcon,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  trophy,
  school,
  warning,
  checkmarkCircle,
  star,
  library,
  book,
  fitness,
  shuffle,
  search,
  flash,
  medal,
  lockClosed,
  checkmark,
  bulb,
  playForward,
  arrowForward,
  closeCircle,
  trendingUp,
  eye,
  refresh,
  home,
  documentText,
  heart
} from 'ionicons/icons';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

// Interfaces for Memory Challenges
interface MemoryQuestion {
  id: string;
  type: 'text' | 'choice' | 'speed';
  prompt: string;
  context?: string;
  hint?: string;
  correctAnswer: string;
  options?: MemoryOption[];
  timeLimit?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'master';
}

interface MemoryOption {
  text: string;
  sanskrit?: string;
  isCorrect: boolean;
}

interface QuestionFeedback {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  verseContext?: string;
}

interface ChallengeResults {
  score: number;
  correct: number;
  total: number;
  grade: string;
  totalTime?: number;
  masteryGained: boolean;
  masteryProgress: MasteryProgress[];
}

interface MasteryProgress {
  skill: string;
  percentage: number;
}

interface ChallengeType {
  id: string;
  name: string;
  description: string;
  unlockRequirement: string;
  questions: MemoryQuestion[];
}

@Component({
  selector: 'app-smarana',
  templateUrl: './smarana.page.html',
  styleUrls: ['./smarana.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonIcon,
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    TechniqueHeaderComponent
]
})
export class SmaranaPage implements OnInit, OnDestroy {
  // Challenge state
  isInChallenge = false;
  challengeCompleted = false;
  hasAchievedFinalMastery = false;
  currentChallengeType: string = '';
  
  // Question state
  currentQuestion = 1;
  totalQuestions = 0;
  currentQuestionData: MemoryQuestion | null = null;
  questionAnswered = false;
  questionFeedback: QuestionFeedback | null = null;
  
  // Response state
  userResponse = '';
  selectedChoice = -1;
  showHint = false;
  
  // Timing state
  timeRemaining = 0;
  totalTime = 0;
  timer: any = null;
  
  // Results state
  challengeResults: ChallengeResults | null = null;
  correctAnswers = 0;
  
  // Prerequisites mastery
  prerequisiteMastery = {
    likhitapada: 92,
    ghanapada: 95,
    jatapada: 88,
    overall: 91
  };

  // Challenge progress
  challengeProgress = {
    random: { completed: false, score: 0, unlocked: true },
    identification: { completed: false, score: 0, unlocked: false },
    speed: { completed: false, score: 0, unlocked: false },
    comprehensive: { completed: false, score: 0, unlocked: false }
  };

  // Sample challenge data
  private challenges: { [key: string]: MemoryQuestion[] } = {
    random: [
      {
        id: 'r1',
        type: 'text',
        prompt: 'Recite the complete first verse of Bhagavad Gītā',
        context: 'Chapter 1, Verse 1 - Dhṛtarāṣṭra speaking',
        hint: 'Begins with "dharma-kṣetre kuru-kṣetre..."',
        correctAnswer: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः । मामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
        difficulty: 'beginner'
      },
      {
        id: 'r2',
        type: 'text',
        prompt: 'Recite Chapter 2, Verse 47',
        context: 'Krishna speaking to Arjuna about action without attachment',
        hint: 'Famous verse about karma-yoga...',
        correctAnswer: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥',
        difficulty: 'intermediate'
      }
    ],
    identification: [
      {
        id: 'i1',
        type: 'choice',
        prompt: 'Which verse begins with "कर्मण्येवाधिकारस्ते"?',
        context: 'Famous verse about duty and action',
        correctAnswer: 'Chapter 2, Verse 47',
        options: [
          { text: 'Chapter 2, Verse 47', isCorrect: true },
          { text: 'Chapter 3, Verse 15', isCorrect: false },
          { text: 'Chapter 4, Verse 18', isCorrect: false },
          { text: 'Chapter 6, Verse 5', isCorrect: false }
        ],
        difficulty: 'intermediate'
      },
      {
        id: 'i2',
        type: 'choice',
        prompt: 'Complete this verse fragment: "धर्मक्षेत्रे कुरुक्षेत्रे..."',
        context: 'Opening verse of Bhagavad Gītā',
        correctAnswer: 'समवेता युयुत्सवः',
        options: [
          { text: 'समवेता युयुत्सवः', isCorrect: true },
          { text: 'संगतो युयुत्सवः', isCorrect: false },
          { text: 'समेता युयुत्सवः', isCorrect: false },
          { text: 'संयुक्ता युयुत्सवः', isCorrect: false }
        ],
        difficulty: 'beginner'
      }
    ],
    speed: [
      {
        id: 's1',
        type: 'speed',
        prompt: 'Quick! First word of Bhagavad Gītā:',
        correctAnswer: 'धर्मक्षेत्रे',
        timeLimit: 5,
        difficulty: 'intermediate'
      },
      {
        id: 's2',
        type: 'speed',
        prompt: 'Complete: "योगस्थः कुरु कर्माणि..." (next word)',
        correctAnswer: 'सङ्गं',
        timeLimit: 8,
        difficulty: 'advanced'
      }
    ],
    comprehensive: [
      {
        id: 'c1',
        type: 'text',
        prompt: 'Recite any verse from Chapter 2 in Ghana Pāṭha pattern',
        context: 'Demonstrate mastery by choosing your own verse and pattern',
        correctAnswer: 'वासांसि जीर्णानि यथा विहाय',
        difficulty: 'master'
      }
    ]
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      trophy,
      school,
      warning,
      checkmarkCircle,
      star,
      library,
      book,
      fitness,
      shuffle,
      search,
      flash,
      medal,
      lockClosed,
      checkmark,
      bulb,
      playForward,
      arrowForward,
      closeCircle,
      trendingUp,
      eye,
      refresh,
      home,
      documentText,
      heart
    });
  }

  ngOnInit() {
    this.loadProgress();
    this.checkFinalMastery();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private loadProgress() {
    const saved = localStorage.getItem('smarana-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.challengeProgress = progress.challengeProgress || this.challengeProgress;
      this.hasAchievedFinalMastery = progress.hasAchievedFinalMastery || false;
    }
  }

  private saveProgress() {
    const progress = {
      challengeProgress: this.challengeProgress,
      hasAchievedFinalMastery: this.hasAchievedFinalMastery
    };
    localStorage.setItem('smarana-progress', JSON.stringify(progress));
  }

  private checkFinalMastery() {
    const allChallengesCompleted = Object.values(this.challengeProgress).every(p => p.completed && p.score >= 85);
    const overallMastery = this.getOverallMasteryLevel();
    
    if (allChallengesCompleted && overallMastery >= 90) {
      this.hasAchievedFinalMastery = true;
      this.saveProgress();
    }
  }

  // Mastery checking methods
  getMasteryStatus(technique: string): string {
    const mastery = this.prerequisiteMastery[technique as keyof typeof this.prerequisiteMastery];
    if (mastery >= 85) return 'mastered';
    if (mastery >= 60) return 'learning';
    return 'not-started';
  }

  getMasteryIcon(technique: string): string {
    const mastery = this.prerequisiteMastery[technique as keyof typeof this.prerequisiteMastery];
    if (mastery >= 85) return 'checkmark-circle';
    if (mastery >= 60) return 'time';
    return 'ellipse-outline';
  }

  getMasteryLevel(technique: string): string {
    const mastery = this.prerequisiteMastery[technique as keyof typeof this.prerequisiteMastery];
    if (mastery >= 85) return 'Mastered';
    if (mastery >= 60) return 'Learning';
    return 'Not Started';
  }

  getOverallMasteryLevel(): number {
    const values = Object.values(this.prerequisiteMastery);
    return Math.floor(values.reduce((sum, val) => sum + val, 0) / values.length);
  }

  // Challenge access control
  canAccessChallenge(challengeType: string): boolean {
    switch (challengeType) {
      case 'random':
        return this.prerequisiteMastery.likhitapada >= 85;
      case 'identification':
        return this.challengeProgress.random.completed && this.challengeProgress.random.score >= 75;
      case 'speed':
        return this.challengeProgress.identification.completed && this.challengeProgress.identification.score >= 75;
      case 'comprehensive':
        return this.challengeProgress.speed.completed && this.challengeProgress.speed.score >= 75;
      default:
        return false;
    }
  }

  // Challenge flow methods
  startChallenge(challengeType: string) {
    if (!this.canAccessChallenge(challengeType)) {
      this.showAccessRequiredMessage(challengeType);
      return;
    }

    this.currentChallengeType = challengeType;
    this.isInChallenge = true;
    this.challengeCompleted = false;
    this.currentQuestion = 1;
    this.correctAnswers = 0;
    
    const questions = this.challenges[challengeType];
    this.totalQuestions = questions.length;
    this.currentQuestionData = questions[0];
    
    this.resetQuestionState();
    this.startQuestionTimer();
  }

  private async showAccessRequiredMessage(challengeType: string) {
    const requirements = {
      random: 'Complete Likhita Pāṭha mastery required',
      identification: 'Complete Random Recall with 75%+ score',
      speed: 'Complete Verse Identification with 75%+ score',
      comprehensive: 'Complete Speed Recall with 75%+ score'
    };

    const alert = await this.alertController.create({
      header: 'Access Required',
      message: requirements[challengeType as keyof typeof requirements],
      buttons: ['OK']
    });
    await alert.present();
  }

  private resetQuestionState() {
    this.userResponse = '';
    this.selectedChoice = -1;
    this.showHint = false;
    this.questionAnswered = false;
    this.questionFeedback = null;
  }

  private startQuestionTimer() {
    if (this.currentQuestionData?.timeLimit) {
      this.timeRemaining = this.currentQuestionData.timeLimit;
      this.totalTime = this.currentQuestionData.timeLimit;
      
      this.timer = setInterval(() => {
        this.timeRemaining--;
        if (this.timeRemaining <= 0) {
          this.timeUp();
        }
      }, 1000);
    }
  }

  private timeUp() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    
    if (!this.questionAnswered) {
      this.questionAnswered = true;
      this.questionFeedback = {
        isCorrect: false,
        correctAnswer: this.currentQuestionData?.correctAnswer || '',
        explanation: 'Time expired. Practice speed recall to improve reaction time.'
      };
    }
  }

  // Question interaction methods
  toggleHint() {
    this.showHint = !this.showHint;
  }

  selectChoice(index: number) {
    if (this.questionAnswered) return;
    this.selectedChoice = index;
  }

  submitAnswer() {
    if (this.questionAnswered || !this.canSubmitAnswer()) return;

    this.questionAnswered = true;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    const isCorrect = this.evaluateAnswer();
    if (isCorrect) {
      this.correctAnswers++;
    }

    this.questionFeedback = {
      isCorrect,
      correctAnswer: this.currentQuestionData?.correctAnswer || '',
      explanation: this.getExplanation(),
      verseContext: this.getVerseContext()
    };
  }

  submitSpeedAnswer() {
    this.submitAnswer();
  }

  private evaluateAnswer(): boolean {
    if (!this.currentQuestionData) return false;

    switch (this.currentQuestionData.type) {
      case 'text':
        return this.normalizeText(this.userResponse) === this.normalizeText(this.currentQuestionData.correctAnswer);
      case 'choice':
        return this.selectedChoice >= 0 && 
               this.currentQuestionData.options?.[this.selectedChoice]?.isCorrect === true;
      case 'speed':
        return this.normalizeText(this.userResponse) === this.normalizeText(this.currentQuestionData.correctAnswer);
      default:
        return false;
    }
  }

  private normalizeText(text: string): string {
    return text.toLowerCase().trim().replace(/[।॥\s]/g, '');
  }

  private getExplanation(): string {
    if (!this.currentQuestionData) return '';
    
    // Add contextual explanations based on question type
    const explanations = {
      'r1': 'This is the opening verse where Dhṛtarāṣṭra inquires about the battle.',
      'r2': 'This verse establishes the fundamental principle of karma-yoga.',
      'i1': 'This verse from Chapter 2 is one of the most quoted in the Gītā.',
      'i2': 'युयुत्सवः means "desirous to fight" - describes the assembled warriors.',
      's1': 'धर्मक्षेत्रे means "in the field of dharma", referring to Kurukṣetra.',
      's2': 'सङ्गं means "attachment" - Krishna advises acting without attachment.'
    };
    
    return explanations[this.currentQuestionData.id as keyof typeof explanations] || 
           'Continue practicing to strengthen your memory of this verse.';
  }

  private getVerseContext(): string {
    if (!this.currentQuestionData) return '';
    return this.currentQuestionData.context || '';
  }

  canSubmitAnswer(): boolean {
    if (!this.currentQuestionData) return false;
    
    switch (this.currentQuestionData.type) {
      case 'text':
        return this.userResponse.trim().length > 0;
      case 'choice':
        return this.selectedChoice >= 0;
      case 'speed':
        return this.userResponse.trim().length > 0;
      default:
        return false;
    }
  }

  skipQuestion() {
    if (this.currentChallengeType === 'comprehensive') return; // No skipping in final exam
    
    this.questionAnswered = true;
    
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.questionFeedback = {
      isCorrect: false,
      correctAnswer: this.currentQuestionData?.correctAnswer || '',
      explanation: 'Question skipped. Review this verse for better retention.'
    };
  }

  nextQuestion() {
    if (this.isLastQuestion()) {
      this.completeChallenge();
      return;
    }

    this.currentQuestion++;
    const questions = this.challenges[this.currentChallengeType];
    this.currentQuestionData = questions[this.currentQuestion - 1];
    
    this.resetQuestionState();
    this.startQuestionTimer();
  }

  isLastQuestion(): boolean {
    return this.currentQuestion >= this.totalQuestions;
  }

  private completeChallenge() {
    this.isInChallenge = false;
    this.challengeCompleted = true;
    
    const score = Math.round((this.correctAnswers / this.totalQuestions) * 100);
    const grade = this.calculateGrade(score);
    
    this.challengeResults = {
      score,
      correct: this.correctAnswers,
      total: this.totalQuestions,
      grade,
      masteryGained: score >= 75,
      masteryProgress: this.calculateMasteryProgress(score)
    };

    // Update progress
    this.challengeProgress[this.currentChallengeType as keyof typeof this.challengeProgress] = {
      completed: true,
      score,
      unlocked: true
    };

    // Unlock next challenge
    this.unlockNextChallenge();
    
    this.saveProgress();
    this.checkFinalMastery();
  }

  private calculateGrade(score: number): string {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'B+';
    if (score >= 80) return 'B';
    if (score >= 75) return 'C+';
    if (score >= 70) return 'C';
    return 'F';
  }

  private calculateMasteryProgress(score: number): MasteryProgress[] {
    return [
      { skill: 'Memory Recall', percentage: Math.min(score, 100) },
      { skill: 'Pattern Recognition', percentage: Math.min(score - 5, 100) },
      { skill: 'Speed & Accuracy', percentage: Math.min(score - 10, 100) },
      { skill: 'Confidence Level', percentage: Math.min(score + 5, 100) }
    ];
  }

  private unlockNextChallenge() {
    const challengeOrder = ['random', 'identification', 'speed', 'comprehensive'];
    const currentIndex = challengeOrder.indexOf(this.currentChallengeType);
    
    if (currentIndex >= 0 && currentIndex < challengeOrder.length - 1) {
      const nextChallenge = challengeOrder[currentIndex + 1];
      this.challengeProgress[nextChallenge as keyof typeof this.challengeProgress].unlocked = true;
    }
  }

  // UI helper methods
  getCurrentChallengeTitle(): string {
    const titles = {
      random: 'Random Recall Challenge',
      identification: 'Verse Identification Challenge',
      speed: 'Speed Recall Challenge',
      comprehensive: 'Comprehensive Examination'
    };
    return titles[this.currentChallengeType as keyof typeof titles] || '';
  }

  getAccuracyPercentage(): number {
    if (this.currentQuestion <= 1) return 100;
    return Math.round((this.correctAnswers / (this.currentQuestion - 1)) * 100);
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  getQuestionIcon(): string {
    switch (this.currentQuestionData?.type) {
      case 'text': return 'create';
      case 'choice': return 'list';
      case 'speed': return 'flash';
      default: return 'help';
    }
  }

  getQuestionTypeLabel(): string {
    switch (this.currentQuestionData?.type) {
      case 'text': return 'Text Recitation';
      case 'choice': return 'Multiple Choice';
      case 'speed': return 'Speed Challenge';
      default: return 'Unknown';
    }
  }

  getTimerPercentage(): number {
    if (this.totalTime === 0) return 100;
    return (this.timeRemaining / this.totalTime) * 100;
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index); // A, B, C, D
  }

  getCompletionMessage(): string {
    const score = this.challengeResults?.score || 0;
    
    if (score >= 95) return 'Outstanding mastery! You have achieved excellence in memory recall.';
    if (score >= 85) return 'Excellent work! Your memory skills are very strong.';
    if (score >= 75) return 'Good progress! Continue practicing to strengthen your recall ability.';
    return 'Keep practicing! Regular review will improve your memory retention.';
  }

  // Action methods
  reviewChallenge() {
    // Implementation for reviewing answers
    this.showToast('Review feature coming soon!');
  }

  retryChallenge() {
    this.challengeCompleted = false;
    this.startChallenge(this.currentChallengeType);
  }

  returnToMenu() {
    this.isInChallenge = false;
    this.challengeCompleted = false;
    this.currentChallengeType = '';
  }

  generateCertificate() {
    this.showToast('Certificate generation feature coming soon!');
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
