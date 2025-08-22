import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButton, IonIcon
} from '@ionic/angular/standalone';

// Interfaces for Krama Pāṭha
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

interface KramaStep {
  id: number;
  type: 'single' | 'pair';
  words: Word[];
  text: string;
  roman: string;
  instruction: string;
  completed: boolean;
}

interface PracticeResult {
  level: 'excellent' | 'good' | 'needs-work';
  title: string;
  message: string;
  accuracy: number;
}

@Component({
  selector: 'app-kramapada',
  templateUrl: './kramapada.page.html',
  styleUrls: ['./kramapada.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    IonButton, IonIcon, CommonModule, FormsModule
  ]
})
export class KramapadaPage implements OnInit {
  // Training state
  selectedMode: string | null = null;
  selectedSloka: Sloka | null = null;
  currentStep: number = 0;
  totalSteps: number = 0;
  kramaSequence: KramaStep[] = [];
  
  // Practice state
  isRecording: boolean = false;
  practiceResult: PracticeResult | null = null;
  completionTime: string = '';
  accuracy: number = 0;
  
  // Available slokas for practice
  availableSlokas: Sloka[] = [
    {
      id: 1,
      title: 'Gītā 2.47',
      subtitle: 'कर्मण्येवाधिकारस्ते',
      devanagari: [
        'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
        'मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि'
      ],
      roman: [
        'karmaṇy evādhikāras te mā phaleṣu kadācana',
        'mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi'
      ],
      words: [
        { devanagari: 'कर्मण्येव', roman: 'karmaṇy eva', meaning: 'in action only' },
        { devanagari: 'अधिकारः', roman: 'adhikāraḥ', meaning: 'right/authority' },
        { devanagari: 'ते', roman: 'te', meaning: 'your' },
        { devanagari: 'मा', roman: 'mā', meaning: 'never' },
        { devanagari: 'फलेषु', roman: 'phaleṣu', meaning: 'in fruits/results' },
        { devanagari: 'कदाचन', roman: 'kadācana', meaning: 'at any time' }
      ],
      meaning: 'You have a right to perform your prescribed duty, but not to the fruits of action.',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Gītā 15.15',
      subtitle: 'सर्वस्य चाहं हृदि सन्निविष्टो',
      devanagari: [
        'सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च',
        'वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम्'
      ],
      roman: [
        'sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca',
        'vedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham'
      ],
      words: [
        { devanagari: 'सर्वस्य', roman: 'sarvasya', meaning: 'of all' },
        { devanagari: 'च', roman: 'ca', meaning: 'and' },
        { devanagari: 'अहं', roman: 'ahaṁ', meaning: 'I' },
        { devanagari: 'हृदि', roman: 'hṛdi', meaning: 'in the heart' },
        { devanagari: 'सन्निविष्टः', roman: 'sanniviṣṭaḥ', meaning: 'situated' },
        { devanagari: 'मत्तः', roman: 'mattaḥ', meaning: 'from Me' },
        { devanagari: 'स्मृतिः', roman: 'smṛtiḥ', meaning: 'memory' },
        { devanagari: 'ज्ञानम्', roman: 'jñānam', meaning: 'knowledge' }
      ],
      meaning: 'I am seated in everyone\'s heart, and from Me come remembrance, knowledge and forgetfulness.',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Gītā 9.22',
      subtitle: 'अनन्याश्चिन्तयन्तो मां',
      devanagari: [
        'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते',
        'तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्'
      ],
      roman: [
        'ananyāś cintayanto māṁ ye janāḥ paryupāsate',
        'teṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham'
      ],
      words: [
        { devanagari: 'अनन्याः', roman: 'ananyāḥ', meaning: 'without deviation' },
        { devanagari: 'चिन्तयन्तः', roman: 'cintayantaḥ', meaning: 'thinking of' },
        { devanagari: 'मां', roman: 'māṁ', meaning: 'Me' },
        { devanagari: 'ये', roman: 'ye', meaning: 'who' },
        { devanagari: 'जनाः', roman: 'janāḥ', meaning: 'people' },
        { devanagari: 'पर्युपासते', roman: 'paryupāsate', meaning: 'worship' }
      ],
      meaning: 'For those who worship Me with devotion, meditating on My transcendental form, I carry what they lack and preserve what they have.',
      difficulty: 'Intermediate'
    }
  ];

  constructor() { }

  ngOnInit() {
    // Initialize component
  }

  // Mode selection
  selectMode(mode: string) {
    this.selectedMode = mode;
    console.log('Selected mode:', mode);
  }

  // Sloka selection
  selectSloka(slokaId: number) {
    this.selectedSloka = this.availableSlokas.find(s => s.id === slokaId) || null;
    if (this.selectedSloka) {
      this.generateKramaSequence();
      console.log('Selected sloka:', this.selectedSloka.title);
    }
  }

  // Generate the Krama sequence for the selected sloka
  generateKramaSequence() {
    if (!this.selectedSloka) return;

    this.kramaSequence = [];
    const words = this.selectedSloka.words;
    let stepId = 1;

    for (let i = 0; i < words.length; i++) {
      // Single word step
      this.kramaSequence.push({
        id: stepId++,
        type: 'single',
        words: [words[i]],
        text: words[i].devanagari,
        roman: words[i].roman,
        instruction: `Recite the word "${words[i].roman}" clearly`,
        completed: false
      });

      // Pair step (if not the last word)
      if (i < words.length - 1) {
        this.kramaSequence.push({
          id: stepId++,
          type: 'pair',
          words: [words[i], words[i + 1]],
          text: `${words[i].devanagari} ${words[i + 1].devanagari}`,
          roman: `${words[i].roman} ${words[i + 1].roman}`,
          instruction: `Combine "${words[i].roman}" with "${words[i + 1].roman}"`,
          completed: false
        });
      }
    }

    this.totalSteps = this.kramaSequence.length;
    this.currentStep = 0;
  }

  // Get current step information
  getCurrentStepType(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].type;
  }

  getStepIcon(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'radio-button-on-outline' : 'link-outline';
  }

  getStepTypeText(): string {
    const stepType = this.getCurrentStepType();
    return stepType === 'single' ? 'Single Word' : 'Word Pair';
  }

  getCurrentInstruction(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].instruction;
  }

  getCurrentRecitationText(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].text;
  }

  getCurrentRecitationRoman(): string {
    if (!this.kramaSequence[this.currentStep]) return '';
    return this.kramaSequence[this.currentStep].roman;
  }

  shouldShowWordHighlight(): boolean {
    return this.getCurrentStepType() === 'pair';
  }

  getHighlightedWords(): string {
    if (!this.kramaSequence[this.currentStep] || this.getCurrentStepType() !== 'pair') return '';
    const step = this.kramaSequence[this.currentStep];
    return step.words.map(w => w.roman).join(' + ');
  }

  // Progress calculation
  get progressPercentage(): number {
    if (this.totalSteps === 0) return 0;
    return Math.round((this.currentStep / this.totalSteps) * 100);
  }

  // Audio controls
  playCurrentStep() {
    console.log('Playing current step:', this.currentStep);
    // Simulate audio playback
    this.simulateAudioPlayback();
  }

  playSlowly() {
    console.log('Playing slowly:', this.currentStep);
    // Simulate slow audio playback
    this.simulateAudioPlayback(true);
  }

  private simulateAudioPlayback(slow: boolean = false) {
    const speed = slow ? 'slowly' : 'normally';
    console.log(`Playing ${speed}:`, this.getCurrentRecitationText());
    // In a real app, this would trigger actual audio playback
  }

  // Recording functionality
  startRecording() {
    if (this.isRecording) return;
    
    this.isRecording = true;
    console.log('Started recording for step:', this.currentStep);
    
    // Simulate recording for 3 seconds
    setTimeout(() => {
      this.stopRecording();
    }, 3000);
  }

  private stopRecording() {
    this.isRecording = false;
    console.log('Stopped recording');
    
    // Simulate practice evaluation
    this.evaluatePractice();
  }

  private evaluatePractice() {
    // Simulate random evaluation for demo
    const results: PracticeResult[] = [
      {
        level: 'excellent',
        title: 'Excellent!',
        message: 'Perfect pronunciation and timing. You can proceed to the next step.',
        accuracy: 95
      },
      {
        level: 'good',
        title: 'Good work!',
        message: 'Good pronunciation. Try to focus on the word transitions.',
        accuracy: 85
      },
      {
        level: 'needs-work',
        title: 'Needs practice',
        message: 'Practice the pronunciation a bit more before moving on.',
        accuracy: 70
      }
    ];

    const randomResult = results[Math.floor(Math.random() * results.length)];
    this.practiceResult = randomResult;
    this.accuracy = randomResult.accuracy;
  }

  getFeedbackIcon(): string {
    if (!this.practiceResult) return 'help-outline';
    
    switch (this.practiceResult.level) {
      case 'excellent': return 'checkmark-circle-outline';
      case 'good': return 'thumbs-up-outline';
      case 'needs-work': return 'refresh-outline';
      default: return 'help-outline';
    }
  }

  // Navigation
  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.practiceResult = null;
    }
  }

  nextStep() {
    if (this.currentStep < this.totalSteps - 1) {
      this.kramaSequence[this.currentStep].completed = true;
      this.currentStep++;
      this.practiceResult = null;
    }
  }

  goToStep(stepIndex: number) {
    if (stepIndex >= 0 && stepIndex < this.totalSteps) {
      this.currentStep = stepIndex;
      this.practiceResult = null;
    }
  }

  canProceedToNext(): boolean {
    return this.currentStep < this.totalSteps - 1;
  }

  retryStep() {
    this.practiceResult = null;
  }

  // Completion checking
  isSequenceCompleted(): boolean {
    return this.currentStep >= this.totalSteps - 1 && 
           this.kramaSequence.every(step => step.completed);
  }

  // Completion actions
  practiceFullSequence() {
    console.log('Practicing full sequence');
    // Implement full sequence practice
  }

  earnMasteryBadge() {
    console.log('Earning mastery badge');
    // Implement badge earning logic
  }

  selectNewSloka() {
    this.selectedSloka = null;
    this.selectedMode = null;
    this.currentStep = 0;
    this.kramaSequence = [];
    this.practiceResult = null;
  }
}
