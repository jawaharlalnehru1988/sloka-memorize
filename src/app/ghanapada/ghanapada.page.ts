import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent,  
         IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
         IonButton, IonIcon } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

// Interfaces for Ghana Pāṭha
interface Word {
  sanskrit: string;
  roman: string;
  meaning: string;
  position: number;
}

interface GhanaStep {
  text: string;
  roman: string;
  type: 'ghana-pair' | 'ghana-reverse' | 'ghana-dense' | 'ghana-complete';
  words: Word[];
  complexity: 'foundation' | 'intermediate' | 'advanced' | 'master';
}

interface GhanaPattern {
  id: number;
  words: Word[];
  steps: GhanaStep[];
  complexity: 'foundation' | 'intermediate' | 'advanced' | 'master';
  instruction: string;
  focusWords: string;
  currentStep?: GhanaStep;
  currentStepIndex: number;
  isCompleted: boolean;
  perfectionRequired: boolean;
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
  complexity: 'foundation' | 'intermediate' | 'advanced' | 'master';
  totalWords: number;
  ghanaPatterns: number;
  estimatedTime: string;
}

interface PracticeResult {
  accuracy: number;
  rating: 'perfect' | 'excellent' | 'good' | 'needs-work';
  title: string;
  message: string;
  suggestions?: string[];
}

interface MasteryLevel {
  technique: string;
  status: 'not-started' | 'learning' | 'practicing' | 'mastered' | 'perfect';
  percentage: number;
}

type TrainingMode = 'foundation' | 'intensive' | 'perfection' | 'certification';

@Component({
  selector: 'app-ghanapada',
  templateUrl: './ghanapada.page.html',
  styleUrls: ['./ghanapada.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton, IonIcon, CommonModule, FormsModule, RouterModule, TechniqueHeaderComponent]
})
export class GhanapadaPage implements OnInit {
  
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
  
  // Mastery tracking
  masteryLevels: { [key: string]: MasteryLevel } = {
    'padapada': { technique: 'Pada Pāṭha', status: 'mastered', percentage: 95 },
    'kramapada': { technique: 'Krama Pāṭha', status: 'mastered', percentage: 88 },
    'jatapada': { technique: 'Jatā Pāṭha', status: 'practicing', percentage: 75 }
  };
  
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
      complexity: 'intermediate',
      totalWords: 7,
      ghanaPatterns: 5,
      estimatedTime: '3-6 months'
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
      complexity: 'advanced',
      totalWords: 7,
      ghanaPatterns: 5,
      estimatedTime: '6-12 months'
    },
    {
      id: 3,
      reference: 'Bhagavad Gītā 2.13',
      title: 'Eternal Soul',
      lines: [
        {
          sanskrit: 'देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा',
          roman: 'dehino \'smin yathā dehe kaumāraṁ yauvanaṁ jarā',
          words: [
            { sanskrit: 'देहिन:', roman: 'dehinaḥ', meaning: 'of the soul', position: 1 },
            { sanskrit: 'अस्मिन्', roman: 'asmin', meaning: 'in this', position: 2 },
            { sanskrit: 'यथा', roman: 'yathā', meaning: 'as', position: 3 },
            { sanskrit: 'देहे', roman: 'dehe', meaning: 'in body', position: 4 },
            { sanskrit: 'कौमारम्', roman: 'kaumāram', meaning: 'childhood', position: 5 },
            { sanskrit: 'यौवनम्', roman: 'yauvanam', meaning: 'youth', position: 6 },
            { sanskrit: 'जरा', roman: 'jarā', meaning: 'old age', position: 7 }
          ]
        }
      ],
      meaning: 'As the soul passes in this body from childhood to youth to old age...',
      complexity: 'master',
      totalWords: 7,
      ghanaPatterns: 5,
      estimatedTime: '12+ months'
    }
  ];
  
  currentPattern: GhanaPattern | null = null;
  ghanaPatterns: GhanaPattern[] = [];

  constructor() { }

  ngOnInit() {
    console.log('Ghana Pāṭha page initialized - Ultimate Vedic mastery');
  }

  // Mastery level methods
  getMasteryStatus(technique: string): string {
    const mastery = this.masteryLevels[technique];
    if (!mastery) return 'not-available';
    
    switch (mastery.status) {
      case 'perfect':
      case 'mastered': return 'mastered';
      case 'practicing': return 'learning';
      default: return 'not-started';
    }
  }

  getMasteryIcon(technique: string): string {
    const status = this.getMasteryStatus(technique);
    switch (status) {
      case 'mastered': return 'checkmark-circle';
      case 'learning': return 'hourglass';
      case 'not-started': return 'radio-button-off';
      default: return 'close-circle';
    }
  }

  getMasteryLevel(technique: string): string {
    const mastery = this.masteryLevels[technique];
    if (!mastery) return 'Not Available';
    
    if (mastery.status === 'mastered' || mastery.status === 'perfect') {
      return `${mastery.percentage}% Mastered`;
    } else if (mastery.status === 'practicing') {
      return `${mastery.percentage}% Progress`;
    } else {
      return 'Not Started';
    }
  }

  // Mode access control
  canAccessMode(mode: TrainingMode): boolean {
    const jataMastery = this.masteryLevels['jatapada'];
    
    switch (mode) {
      case 'foundation':
        return jataMastery.status === 'mastered' || jataMastery.percentage >= 80;
      case 'intensive':
        return this.selectedMode === 'foundation' && this.completedPatterns >= 2;
      case 'perfection':
        return this.selectedMode === 'intensive' && this.completedPatterns >= 4;
      case 'certification':
        return this.selectedMode === 'perfection' && this.completedPatterns >= this.totalPatterns;
      default:
        return false;
    }
  }

  // Mode selection
  selectMode(mode: TrainingMode): void {
    if (!this.canAccessMode(mode)) return;
    
    this.selectedMode = mode;
    console.log('Selected Ghana training mode:', mode);
  }

  // Sloka selection
  selectSloka(sloka: Sloka): void {
    this.selectedSloka = sloka;
    this.generateGhanaPatterns();
    this.initializeTraining();
    console.log('Selected sloka for Ghana mastery:', sloka.reference);
  }

  // Generate Ghana patterns for the selected sloka
  private generateGhanaPatterns(): void {
    if (!this.selectedSloka) return;

    this.ghanaPatterns = [];
    const words = this.selectedSloka.lines[0].words;
    
    // Generate tri-word Ghana patterns (most complex)
    for (let i = 0; i <= words.length - 3; i++) {
      const patternWords = words.slice(i, i + 3);
      const pattern = this.createGhanaPattern(patternWords, i + 1);
      this.ghanaPatterns.push(pattern);
    }
    
    this.totalPatterns = this.ghanaPatterns.length;
  }

  // Create a single Ghana pattern (1-2-1, 2-3-2, 1-2-3-2-1) - Ultimate complexity
  private createGhanaPattern(words: Word[], patternNumber: number): GhanaPattern {
    const steps: GhanaStep[] = [];
    const complexity = this.getPatternComplexity(patternNumber);
    
    // Step 1: 1-2-1 (ghana-pair)
    steps.push({
      text: `${words[0].sanskrit} ${words[1].sanskrit} ${words[0].sanskrit}`,
      roman: `${words[0].roman} ${words[1].roman} ${words[0].roman}`,
      type: 'ghana-pair',
      words: [words[0], words[1], words[0]],
      complexity
    });
    
    // Step 2: 2-3-2 (ghana-pair)
    steps.push({
      text: `${words[1].sanskrit} ${words[2].sanskrit} ${words[1].sanskrit}`,
      roman: `${words[1].roman} ${words[2].roman} ${words[1].roman}`,
      type: 'ghana-pair',
      words: [words[1], words[2], words[1]],
      complexity
    });
    
    // Step 3: 1-2-3-2-1 (ghana-complete - ultimate dense pattern)
    steps.push({
      text: `${words[0].sanskrit} ${words[1].sanskrit} ${words[2].sanskrit} ${words[1].sanskrit} ${words[0].sanskrit}`,
      roman: `${words[0].roman} ${words[1].roman} ${words[2].roman} ${words[1].roman} ${words[0].roman}`,
      type: 'ghana-complete',
      words: [words[0], words[1], words[2], words[1], words[0]],
      complexity
    });

    return {
      id: patternNumber,
      words: words,
      steps: steps,
      complexity: complexity,
      instruction: `Master the ultimate dense pattern for ${words[0].sanskrit}, ${words[1].sanskrit}, ${words[2].sanskrit}`,
      focusWords: `${words[0].sanskrit} • ${words[1].sanskrit} • ${words[2].sanskrit}`,
      currentStepIndex: 0,
      isCompleted: false,
      perfectionRequired: true
    };
  }

  private getPatternComplexity(patternNumber: number): 'foundation' | 'intermediate' | 'advanced' | 'master' {
    if (patternNumber <= 2) return 'foundation';
    if (patternNumber <= 3) return 'intermediate';
    if (patternNumber <= 4) return 'advanced';
    return 'master';
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
    if (this.ghanaPatterns.length > 0) {
      this.currentPattern = this.ghanaPatterns[this.currentPatternIndex];
      this.currentPattern.currentStepIndex = this.currentStepIndex;
      this.currentPattern.currentStep = this.currentPattern.steps[this.currentStepIndex];
    }
  }

  // Progress calculation
  getProgressPercentage(): number {
    if (this.totalPatterns === 0) return 0;
    const totalSteps = this.totalPatterns * 3; // 3 steps per Ghana pattern
    const completedSteps = this.completedPatterns * 3 + this.currentStepIndex;
    return Math.round((completedSteps / totalSteps) * 100);
  }

  // Audio controls - specialized for Ghana
  playAudio(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPlayingAudio = true;
    console.log('Playing Ghana audio for:', this.currentPattern.currentStep.text);
    
    // Simulate dense pattern audio playback
    setTimeout(() => {
      this.isPlayingAudio = false;
    }, 3000);
  }

  playSlowMotion(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPlayingAudio = true;
    console.log('Playing slow motion Ghana for:', this.currentPattern.currentStep.text);
    
    // Simulate slow motion dense audio
    setTimeout(() => {
      this.isPlayingAudio = false;
    }, 5000);
  }

  playResonance(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPlayingAudio = true;
    console.log('Playing bell resonance for:', this.currentPattern.currentStep.text);
    
    // Simulate bell-like resonant audio
    setTimeout(() => {
      this.isPlayingAudio = false;
    }, 4000);
  }

  // Practice and evaluation - requires perfection
  practicePattern(): void {
    if (!this.currentPattern?.currentStep) return;
    
    this.isPracticing = true;
    console.log('Starting Ghana practice for:', this.currentPattern.currentStep.text);
    
    // Simulate speech recognition and rigorous evaluation
    setTimeout(() => {
      this.isPracticing = false;
      this.evaluateGhanaPractice();
    }, 4000);
  }

  private evaluateGhanaPractice(): void {
    // Ghana evaluation is much more stringent
    const accuracy = Math.random() * 100;
    let rating: 'perfect' | 'excellent' | 'good' | 'needs-work';
    let title: string;
    let message: string;

    if (accuracy >= 95) {
      rating = 'perfect';
      title = 'Perfect Ghana Resonance!';
      message = 'Flawless execution of the dense pattern. You have achieved the bell-like perfection of true Ghana mastery!';
    } else if (accuracy >= 85) {
      rating = 'excellent';
      title = 'Excellent Dense Pattern!';
      message = 'Very good Ghana recitation. Minor adjustments needed for perfect resonance.';
    } else if (accuracy >= 70) {
      rating = 'good';
      title = 'Good Effort';
      message = 'The Ghana pattern needs refinement. Focus on the dense sequence precision.';
    } else {
      rating = 'needs-work';
      title = 'More Practice Required';
      message = 'Ghana Pāṭha demands absolute perfection. Continue practicing the dense pattern with patience.';
    }

    this.practiceResult = {
      accuracy: Math.round(accuracy),
      rating,
      title,
      message
    };
  }

  // Navigation methods - stricter for Ghana
  nextPattern(): void {
    if (!this.canProceed()) return;

    if (this.currentStepIndex < 2) { // 3 steps per Ghana pattern (0, 1, 2)
      // Move to next step in current pattern
      this.currentStepIndex++;
    } else {
      // Move to next pattern
      this.currentPattern!.isCompleted = true;
      this.completedPatterns++;
      
      if (this.currentPatternIndex < this.ghanaPatterns.length - 1) {
        this.currentPatternIndex++;
        this.currentStepIndex = 0;
      } else {
        // Ghana training completed
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
      this.currentStepIndex = 2; // Last step of previous pattern
      this.ghanaPatterns[this.currentPatternIndex].isCompleted = false;
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
    this.ghanaPatterns.forEach(pattern => {
      pattern.isCompleted = false;
      pattern.currentStepIndex = 0;
    });
    
    this.updateCurrentPattern();
  }

  // Ghana requires perfection or guided mode
  canProceed(): boolean {
    return this.practiceResult?.rating === 'perfect' || 
           (this.practiceResult?.rating === 'excellent' && this.selectedMode === 'foundation');
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
  getComplexityIcon(): string {
    if (!this.currentPattern) return 'diamond-outline';
    
    switch (this.currentPattern.complexity) {
      case 'foundation': return 'library-outline';
      case 'intermediate': return 'school-outline';
      case 'advanced': return 'trophy-outline';
      case 'master': return 'diamond-outline';
      default: return 'diamond-outline';
    }
  }

  getGhanaTypeSymbol(stepType: string): string {
    switch (stepType) {
      case 'ghana-pair': return '◈';
      case 'ghana-reverse': return '◇';
      case 'ghana-dense': return '◆';
      case 'ghana-complete': return '♦';
      default: return '◯';
    }
  }

  // Feedback methods
  getFeedbackIcon(): string {
    if (!this.practiceResult) return 'help-circle-outline';
    
    switch (this.practiceResult.rating) {
      case 'perfect': return 'diamond-outline';
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
    const hours = Math.floor(elapsed / 3600000);
    const minutes = Math.floor((elapsed % 3600000) / 60000);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes} min`;
  }

  getAccuracyScore(): number {
    if (this.practiceResult) {
      return this.practiceResult.accuracy;
    }
    return Math.floor(Math.random() * 10) + 90; // Simulate 90-100% for Ghana
  }

  generateCertificate(): void {
    console.log('Generating Ghana Pāṭhī Certificate...');
    // This would generate a downloadable certificate
    alert('Ghana Pāṭhī Certificate generated! (This would download a PDF certificate in a real implementation)');
  }

  restartTraining(): void {
    this.resetTraining();
    this.isCompleted = false;
  }
}
