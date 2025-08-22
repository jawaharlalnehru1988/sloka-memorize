import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, 
         IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
         IonButton, IonIcon } from '@ionic/angular/standalone';

// Interfaces for Jatā Pāṭha
interface Word {
  sanskrit: string;
  roman: string;
  meaning: string;
  position: number;
}

interface BraidStep {
  text: string;
  roman: string;
  type: 'pair' | 'pair-reverse' | 'triplet' | 'triplet-reverse';
  words: Word[];
}

interface BraidPattern {
  id: number;
  words: Word[];
  steps: BraidStep[];
  type: 'basic' | 'intermediate' | 'advanced';
  instruction: string;
  focusWords: string;
  currentStep?: BraidStep;
  currentStepIndex: number;
  isCompleted: boolean;
}

interface Sloka {
  id: number;
  reference: string;
  title: string;
  lines: {
    sanskrit: string;
    roman: string;
    words: Word[];
  }[];
  meaning: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  totalWords: number;
  braidPatterns: number;
}

interface PracticeResult {
  accuracy: number;
  rating: 'excellent' | 'good' | 'needs-work';
  title: string;
  message: string;
  suggestions?: string[];
}

type TrainingMode = 'guided' | 'pattern-practice' | 'speed-building' | 'memory-challenge';

@Component({
  selector: 'app-jatapada',
  templateUrl: './jatapada.page.html',
  styleUrls: ['./jatapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
           IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
           IonButton, IonIcon, CommonModule, FormsModule, RouterModule]
})
export class JatapadaPage implements OnInit {
  
  // Training state
  selectedMode: TrainingMode | null = null;
  selectedSloka: Sloka | null = null;
  currentPatternIndex: number = 0;
  currentStepIndex: number = 0;
  isCompleted: boolean = false;
  
  // Audio and practice state
  isPlayingAudio: boolean = false;
  isPracticing: boolean = false;
  practiceResult: PracticeResult | null = null;
  
  // Progress tracking
  totalPatterns: number = 0;
  completedPatterns: number = 0;
  startTime: Date | null = null;
  
  // Data
  availableSlokas: Sloka[] = [
    {
      id: 1,
      reference: 'Bhagavad Gītā 2.47',
      title: 'Right to Action',
      lines: [
        {
          sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
          roman: 'karmaṇy-evādhikāras-te mā phaleṣu kadācana',
          words: [
            { sanskrit: 'कर्मणि', roman: 'karmaṇi', meaning: 'in action', position: 1 },
            { sanskrit: 'एव', roman: 'eva', meaning: 'only/certainly', position: 2 },
            { sanskrit: 'अधिकार:', roman: 'adhikāraḥ', meaning: 'right/authority', position: 3 },
            { sanskrit: 'ते', roman: 'te', meaning: 'your', position: 4 },
            { sanskrit: 'मा', roman: 'mā', meaning: 'never', position: 5 },
            { sanskrit: 'फलेषु', roman: 'phaleṣu', meaning: 'in fruits/results', position: 6 },
            { sanskrit: 'कदाचन', roman: 'kadācana', meaning: 'at any time', position: 7 }
          ]
        }
      ],
      meaning: 'You have a right to perform your prescribed duty, but not to the fruits of action.',
      difficulty: 'intermediate',
      totalWords: 7,
      braidPatterns: 5
    },
    {
      id: 2,
      reference: 'Bhagavad Gītā 18.66',
      title: 'Surrender to Krishna',
      lines: [
        {
          sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
          roman: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
          words: [
            { sanskrit: 'सर्व', roman: 'sarva', meaning: 'all', position: 1 },
            { sanskrit: 'धर्मान्', roman: 'dharmān', meaning: 'duties', position: 2 },
            { sanskrit: 'परित्यज्य', roman: 'parityajya', meaning: 'abandoning', position: 3 },
            { sanskrit: 'माम्', roman: 'mām', meaning: 'unto Me', position: 4 },
            { sanskrit: 'एकम्', roman: 'ekam', meaning: 'only', position: 5 },
            { sanskrit: 'शरणम्', roman: 'śaraṇam', meaning: 'surrender', position: 6 },
            { sanskrit: 'व्रज', roman: 'vraja', meaning: 'go', position: 7 }
          ]
        }
      ],
      meaning: 'Abandon all varieties of religion and just surrender unto Me.',
      difficulty: 'advanced',
      totalWords: 7,
      braidPatterns: 5
    },
    {
      id: 3,
      reference: 'Bhagavad Gītā 7.7',
      title: 'Supreme Truth',
      lines: [
        {
          sanskrit: 'मत्त: परतरं नान्यत्किञ्चिदस्ति धनञ्जय',
          roman: 'mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya',
          words: [
            { sanskrit: 'मत्त:', roman: 'mattaḥ', meaning: 'beyond Me', position: 1 },
            { sanskrit: 'परतरम्', roman: 'parataram', meaning: 'superior', position: 2 },
            { sanskrit: 'न', roman: 'na', meaning: 'not', position: 3 },
            { sanskrit: 'अन्यत्', roman: 'anyat', meaning: 'anything else', position: 4 },
            { sanskrit: 'किञ्चित्', roman: 'kiñcit', meaning: 'anything', position: 5 },
            { sanskrit: 'अस्ति', roman: 'asti', meaning: 'there is', position: 6 },
            { sanskrit: 'धनञ्जय', roman: 'dhanañjaya', meaning: 'O Arjuna', position: 7 }
          ]
        }
      ],
      meaning: 'O conqueror of wealth, there is no truth superior to Me.',
      difficulty: 'beginner',
      totalWords: 7,
      braidPatterns: 5
    }
  ];
  
  currentPattern: BraidPattern | null = null;
  braidPatterns: BraidPattern[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Jatā Pāṭha page initialized');
  }

  // Mode selection
  selectMode(mode: TrainingMode): void {
    this.selectedMode = mode;
    console.log('Selected training mode:', mode);
  }

  // Sloka selection
  selectSloka(sloka: Sloka): void {
    this.selectedSloka = sloka;
    this.generateBraidPatterns();
    this.initializeTraining();
    console.log('Selected sloka:', sloka.reference);
  }

  // Generate braid patterns for the selected sloka
  private generateBraidPatterns(): void {
    if (!this.selectedSloka) return;

    this.braidPatterns = [];
    const words = this.selectedSloka.lines[0].words;
    
    // Generate tri-word braid patterns
    for (let i = 0; i <= words.length - 3; i++) {
      const patternWords = words.slice(i, i + 3);
      const pattern = this.createBraidPattern(patternWords, i + 1);
      this.braidPatterns.push(pattern);
    }
    
    this.totalPatterns = this.braidPatterns.length;
  }

  // Create a single braid pattern (1-2, 2-1, 1-2-3, 3-2-1, 1-2-3)
  private createBraidPattern(words: Word[], patternNumber: number): BraidPattern {
    const steps: BraidStep[] = [];
    
    // Step 1: 1-2 (pair)
    steps.push({
      text: `${words[0].sanskrit} ${words[1].sanskrit}`,
      roman: `${words[0].roman} ${words[1].roman}`,
      type: 'pair',
      words: [words[0], words[1]]
    });
    
    // Step 2: 2-1 (pair-reverse)
    steps.push({
      text: `${words[1].sanskrit} ${words[0].sanskrit}`,
      roman: `${words[1].roman} ${words[0].roman}`,
      type: 'pair-reverse',
      words: [words[1], words[0]]
    });
    
    // Step 3: 1-2-3 (triplet)
    steps.push({
      text: `${words[0].sanskrit} ${words[1].sanskrit} ${words[2].sanskrit}`,
      roman: `${words[0].roman} ${words[1].roman} ${words[2].roman}`,
      type: 'triplet',
      words: words
    });
    
    // Step 4: 3-2-1 (triplet-reverse)
    steps.push({
      text: `${words[2].sanskrit} ${words[1].sanskrit} ${words[0].sanskrit}`,
      roman: `${words[2].roman} ${words[1].roman} ${words[0].roman}`,
      type: 'triplet-reverse',
      words: [words[2], words[1], words[0]]
    });
    
    // Step 5: 1-2-3 (triplet - final)
    steps.push({
      text: `${words[0].sanskrit} ${words[1].sanskrit} ${words[2].sanskrit}`,
      roman: `${words[0].roman} ${words[1].roman} ${words[2].roman}`,
      type: 'triplet',
      words: words
    });

    return {
      id: patternNumber,
      words: words,
      steps: steps,
      type: patternNumber <= 2 ? 'basic' : patternNumber <= 4 ? 'intermediate' : 'advanced',
      instruction: `Practice the braid pattern for words ${words[0].sanskrit}, ${words[1].sanskrit}, ${words[2].sanskrit}`,
      focusWords: `${words[0].sanskrit} • ${words[1].sanskrit} • ${words[2].sanskrit}`,
      currentStepIndex: 0,
      isCompleted: false
    };
  }

  // Initialize training
  private initializeTraining(): void {
    this.currentPatternIndex = 0;
    this.currentStepIndex = 0;
    this.completedPatterns = 0;
    this.isCompleted = false;
    this.startTime = new Date();
    this.updateCurrentPattern();
  }

  // Update current pattern and step
  private updateCurrentPattern(): void {
    if (this.braidPatterns.length > 0) {
      this.currentPattern = this.braidPatterns[this.currentPatternIndex];
      this.currentPattern.currentStepIndex = this.currentStepIndex;
      this.currentPattern.currentStep = this.currentPattern.steps[this.currentStepIndex];
    }
  }

  // Progress calculation
  getProgressPercentage(): number {
    if (this.totalPatterns === 0) return 0;
    const totalSteps = this.totalPatterns * 5; // 5 steps per pattern
    const completedSteps = this.completedPatterns * 5 + this.currentStepIndex;
    return Math.round((completedSteps / totalSteps) * 100);
  }

  // Audio controls
  playAudio(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPlayingAudio = true;
    console.log('Playing audio for:', this.currentPattern.currentStep.text);
    
    // Simulate audio playback
    setTimeout(() => {
      this.isPlayingAudio = false;
    }, 2000);
  }

  slowPlay(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPlayingAudio = true;
    console.log('Playing slow audio for:', this.currentPattern.currentStep.text);
    
    // Simulate slow audio playback
    setTimeout(() => {
      this.isPlayingAudio = false;
    }, 3000);
  }

  // Practice and evaluation
  practicePattern(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPracticing = true;
    console.log('Starting practice for:', this.currentPattern.currentStep.text);
    
    // Simulate speech recognition and evaluation
    setTimeout(() => {
      this.isPracticing = false;
      this.evaluatePractice();
    }, 3000);
  }

  private evaluatePractice(): void {
    // Simulate practice evaluation
    const accuracy = Math.random() * 100;
    let rating: 'excellent' | 'good' | 'needs-work';
    let title: string;
    let message: string;

    if (accuracy >= 85) {
      rating = 'excellent';
      title = 'Excellent Braid Pattern!';
      message = 'Perfect execution of the Jatā sequence. Your braided recitation is flawless!';
    } else if (accuracy >= 70) {
      rating = 'good';
      title = 'Good Effort!';
      message = 'Nice work on the braid pattern. Practice the reverse sequences for better flow.';
    } else {
      rating = 'needs-work';
      title = 'Keep Practicing';
      message = 'The braid pattern needs more work. Focus on the word order and transitions.';
    }

    this.practiceResult = {
      accuracy: Math.round(accuracy),
      rating,
      title,
      message
    };
  }

  // Navigation methods
  nextPattern(): void {
    if (!this.canProceed()) return;

    if (this.currentStepIndex < 4) {
      // Move to next step in current pattern
      this.currentStepIndex++;
    } else {
      // Move to next pattern
      this.currentPattern!.isCompleted = true;
      this.completedPatterns++;
      
      if (this.currentPatternIndex < this.braidPatterns.length - 1) {
        this.currentPatternIndex++;
        this.currentStepIndex = 0;
      } else {
        // Training completed
        this.isCompleted = true;
        return;
      }
    }
    
    this.updateCurrentPattern();
    this.practiceResult = null;
  }

  previousPattern(): void {
    if (this.currentPatternIndex === 0 && this.currentStepIndex === 0) return;

    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
    } else if (this.currentPatternIndex > 0) {
      this.currentPatternIndex--;
      this.currentStepIndex = 4; // Last step of previous pattern
      this.braidPatterns[this.currentPatternIndex].isCompleted = false;
      this.completedPatterns--;
    }
    
    this.updateCurrentPattern();
    this.practiceResult = null;
  }

  retryPattern(): void {
    this.practiceResult = null;
  }

  resetTraining(): void {
    this.currentPatternIndex = 0;
    this.currentStepIndex = 0;
    this.completedPatterns = 0;
    this.isCompleted = false;
    this.practiceResult = null;
    this.startTime = new Date();
    
    // Reset all patterns
    this.braidPatterns.forEach(pattern => {
      pattern.isCompleted = false;
      pattern.currentStepIndex = 0;
    });
    
    this.updateCurrentPattern();
  }

  canProceed(): boolean {
    return this.practiceResult?.rating === 'excellent' || this.selectedMode === 'guided';
  }

  // Step timeline methods
  getStepStatus(stepIndex: number): string {
    if (stepIndex < this.currentStepIndex) return 'completed';
    if (stepIndex === this.currentStepIndex) return 'current';
    return 'upcoming';
  }

  getStepIcon(stepIndex: number): string {
    if (stepIndex < this.currentStepIndex) return 'checkmark-circle';
    if (stepIndex === this.currentStepIndex) return 'radio-button-on';
    return 'radio-button-off';
  }

  getStepColor(stepIndex: number): string {
    if (stepIndex < this.currentStepIndex) return 'success';
    if (stepIndex === this.currentStepIndex) return 'warning';
    return 'medium';
  }

  goToStep(stepIndex: number): void {
    if (stepIndex <= this.currentStepIndex) {
      this.currentStepIndex = stepIndex;
      this.updateCurrentPattern();
      this.practiceResult = null;
    }
  }

  // Pattern helper methods
  getPatternIcon(): string {
    if (!this.currentPattern) return 'git-branch-outline';
    
    switch (this.currentPattern.type) {
      case 'basic': return 'git-branch-outline';
      case 'intermediate': return 'git-network-outline';
      case 'advanced': return 'git-merge-outline';
      default: return 'git-branch-outline';
    }
  }

  getStepTypeSymbol(stepType: string): string {
    switch (stepType) {
      case 'pair': return '↔';
      case 'pair-reverse': return '↔';
      case 'triplet': return '⟷';
      case 'triplet-reverse': return '⟷';
      default: return '○';
    }
  }

  // Feedback methods
  getFeedbackIcon(): string {
    if (!this.practiceResult) return 'help-circle-outline';
    
    switch (this.practiceResult.rating) {
      case 'excellent': return 'checkmark-circle-outline';
      case 'good': return 'thumbs-up-outline';
      case 'needs-work': return 'refresh-outline';
      default: return 'help-circle-outline';
    }
  }

  // Completion methods
  getCompletionTime(): string {
    if (!this.startTime) return '0 min';
    
    const elapsed = Date.now() - this.startTime.getTime();
    const minutes = Math.floor(elapsed / 60000);
    return `${minutes} min`;
  }

  getAccuracyScore(): number {
    if (this.practiceResult) {
      return this.practiceResult.accuracy;
    }
    return Math.floor(Math.random() * 15) + 85; // Simulate 85-100% accuracy
  }

  restartTraining(): void {
    this.resetTraining();
    this.isCompleted = false;
  }
}
