import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent
} from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../../shared/components/technique-header/technique-header.component";
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, checkmarkOutline, chevronBackOutline, chevronForwardOutline, cogOutline, hourglassOutline, linkOutline, playOutline } from 'ionicons/icons';

// Define interfaces for the training data
interface KramaStep {
  type: 'single' | 'pair';
  text: string;
  roman: string;
  wordIndices: number[];
  instruction: string;
}

// Define interfaces matching the main page structure
interface Word {
  devanagari: string;
  roman: string;
  meaning: string;
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  devanagari: string[];
  roman: string[];
  words: Word[];
  meaning: string;
  difficulty: string;
}

interface PracticeResult {
  level: 'excellent' | 'good' | 'needs-work';
  title: string;
  message: string;
}

interface Recording {
  id: string;
  timestamp: Date;
  duration: number;
  size: number;
  mode: string;
  slokaId: number;
  stepIndex: number;
}

@Component({
  selector: 'app-kramapada-training',
  templateUrl: './kramapada-training.page.html',
  styleUrls: ['./kramapada-training.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    CommonModule, FormsModule, TechniqueHeaderComponent
  ]
})
export class KramapadaTrainingPage implements OnInit, AfterViewInit {
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  selectedSloka: Sloka | null = null;
  selectedMode: 'guided' | 'interactive' | 'challenge' | 'custom' = 'guided';
  currentStep: number = 0;
  totalSteps: number = 0;
  kramaSequence: KramaStep[] = [];
  isRecording: boolean = false;
  practiceResult: PracticeResult | null = null;
  completionTime: string = '';
  accuracy: number = 0;
  recordings: Recording[] = [];

  // The component will receive sloka data via route parameters
  // In a real app, this would come from a shared service
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {

    addIcons({
      cogOutline, checkmarkOutline, hourglassOutline, playOutline,linkOutline, chevronBackOutline, chevronForwardOutline,checkmarkCircleOutline})
  }

  ngOnInit() {
    // Get sloka ID from route parameters
    this.route.params.subscribe(params => {
      const slokaId = parseInt(params['id']);
      if (slokaId) {
        this.loadSloka(slokaId);
      }
    });

    // Get mode from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['mode']) {
        this.selectedMode = params['mode'];
      }
    });
  }

  ngAfterViewInit() {
    // Ensure content is properly initialized after view is ready
    setTimeout(() => {
      if (this.content) {
        // Force content to recalculate dimensions
        this.content.getScrollElement().then(() => {
          // Content is now ready
        }).catch(err => {
          console.warn('Content initialization warning:', err);
        });
      }
    }, 100);
  }

  loadSloka(slokaId: number) {
    // Try to get sloka data from navigation state
    const navigation = this.router.getCurrentNavigation();
    const slokaData = navigation?.extras?.state?.['sloka'];
    
    if (slokaData) {
      this.selectedSloka = slokaData;
      // Use setTimeout to ensure DOM is ready before generating sequence
      setTimeout(() => {
        this.generateKramaSequence();
      }, 50);
    } else {
      // If no data in state, redirect back to main page
      console.log('No sloka data found, redirecting to main page');
      this.router.navigate(['/kramapada']);
    }
  }

  generateKramaSequence() {
    if (!this.selectedSloka || !this.selectedSloka.words) {
      console.warn('Cannot generate sequence: missing sloka or words data');
      return;
    }

    this.kramaSequence = [];
    const words = this.selectedSloka.words;

    // Validate words array
    if (!Array.isArray(words) || words.length === 0) {
      console.warn('Cannot generate sequence: invalid words array');
      return;
    }

    for (let i = 0; i < words.length; i++) {
      // Validate word structure
      const word = words[i];
      if (!word || !word.devanagari || !word.roman) {
        console.warn(`Skipping invalid word at index ${i}:`, word);
        continue;
      }

      // Single word step
      this.kramaSequence.push({
        type: 'single',
        text: word.devanagari,
        roman: word.roman,
        wordIndices: [i],
        instruction: `Recite word ${i + 1} alone`
      });

      // Pair step (except for the last word)
      if (i < words.length - 1) {
        const nextWord = words[i + 1];
        if (nextWord && nextWord.devanagari && nextWord.roman) {
          this.kramaSequence.push({
            type: 'pair',
            text: `${word.devanagari} ${nextWord.devanagari}`,
            roman: `${word.roman} ${nextWord.roman}`,
            wordIndices: [i, i + 1],
            instruction: `Recite words ${i + 1} and ${i + 2} together`
          });
        }
      }
    }

    this.totalSteps = this.kramaSequence.length;
    this.currentStep = 0;
  }

  get progressPercentage(): number {
    return this.totalSteps > 0 ? Math.round((this.currentStep / this.totalSteps) * 100) : 0;
  }

  selectMode(mode: 'guided' | 'interactive' | 'challenge' | 'custom') {
    this.selectedMode = mode;
    // Update query parameters to reflect mode change
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { mode: mode },
      queryParamsHandling: 'merge'
    });
  }

  selectNewSloka() {
    this.router.navigate(['/kramapada']);
  }

  getCurrentStepType(): string {
    if (!this.kramaSequence || this.currentStep >= this.kramaSequence.length || this.currentStep < 0) {
      return '';
    }
    return this.kramaSequence[this.currentStep]?.type || '';
  }

  getStepIcon(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'text-outline' : 'link-outline';
  }

  getStepTypeText(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'Single Word' : 'Word Pair';
  }

  getCurrentInstruction(): string {
    if (!this.kramaSequence || this.currentStep >= this.kramaSequence.length || this.currentStep < 0) {
      return '';
    }
    return this.kramaSequence[this.currentStep]?.instruction || '';
  }

  getCurrentRecitationText(): string {
    if (!this.kramaSequence || this.currentStep >= this.kramaSequence.length || this.currentStep < 0) {
      return '';
    }
    return this.kramaSequence[this.currentStep]?.text || '';
  }

  getCurrentRecitationRoman(): string {
    if (!this.kramaSequence || this.currentStep >= this.kramaSequence.length || this.currentStep < 0) {
      return '';
    }
    return this.kramaSequence[this.currentStep]?.roman || '';
  }

  shouldShowWordHighlight(): boolean {
    return this.selectedMode === 'guided' || this.selectedMode === 'interactive';
  }

  getHighlightedWords(): string {
    if (!this.kramaSequence || this.currentStep >= this.kramaSequence.length || this.currentStep < 0) {
      return '';
    }
    
    const step = this.kramaSequence[this.currentStep];
    if (!step || !this.selectedSloka || !this.selectedSloka.words) {
      return '';
    }
    
    try {
      return step.wordIndices
        .filter(index => index >= 0 && index < this.selectedSloka!.words.length)
        .map(index => this.selectedSloka!.words[index]?.devanagari || '')
        .filter(word => word.length > 0)
        .join(' + ');
    } catch (error) {
      console.warn('Error getting highlighted words:', error);
      return '';
    }
  }

  playCurrentStep() {
    // Implementation for playing audio of current step
    console.log('Playing current step:', this.getCurrentRecitationText());
  }

  playSlowly() {
    // Implementation for playing audio slowly
    console.log('Playing slowly:', this.getCurrentRecitationText());
  }

  completeCurrentStep() {
    // Mark current step as completed and provide feedback
    this.practiceResult = {
      level: 'excellent',
      title: 'Well Done!',
      message: 'Perfect pronunciation and timing. Ready for the next step.'
    };
  }

  startRecording() {
    this.isRecording = true;
    console.log('Started recording for step:', this.currentStep);
  }

  stopRecording() {
    this.isRecording = false;
    
    // Create a mock recording
    const newRecording: Recording = {
      id: Date.now().toString(),
      timestamp: new Date(),
      duration: 3000, // 3 seconds mock
      size: 256000, // 256KB mock
      mode: this.selectedMode,
      slokaId: this.selectedSloka?.id || 0,
      stepIndex: this.currentStep
    };
    
    this.recordings.push(newRecording);
    console.log('Stopped recording');
  }

  goToStep(stepIndex: number) {
    if (stepIndex >= 0 && stepIndex < this.totalSteps) {
      this.currentStep = stepIndex;
      this.practiceResult = null;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.practiceResult = null;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.practiceResult = null;
    }
  }

  canProceedToNext(): boolean {
    return this.currentStep < this.totalSteps - 1;
  }

  retryStep() {
    this.practiceResult = null;
  }

  getFeedbackIcon(): string {
    if (!this.practiceResult) return '';
    
    switch (this.practiceResult.level) {
      case 'excellent': return 'checkmark-circle-outline';
      case 'good': return 'thumbs-up-outline';
      case 'needs-work': return 'refresh-outline';
      default: return 'information-circle-outline';
    }
  }

  getCurrentStepRecordings(): Recording[] {
    return this.recordings.filter(r => 
      r.slokaId === this.selectedSloka?.id && r.stepIndex === this.currentStep
    );
  }

  getCurrentSlokaRecordingsCount(): number {
    return this.recordings.filter(r => r.slokaId === this.selectedSloka?.id).length;
  }

  playRecording(recordingId: string) {
    console.log('Playing recording:', recordingId);
  }

  deleteRecording(recordingId: string) {
    this.recordings = this.recordings.filter(r => r.id !== recordingId);
  }

  formatDuration(milliseconds: number): string {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  isSequenceCompleted(): boolean {
    return this.currentStep >= this.totalSteps - 1 && this.practiceResult?.level === 'excellent';
  }

  practiceFullSequence() {
    // Implementation for practicing the full sequence
    console.log('Practicing full sequence');
  }

  earnMasteryBadge() {
    // Implementation for earning mastery badge
    console.log('Earning mastery badge');
  }
}