import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar, 
  IonButton, 
  IonButtons, 
  IonBackButton, 
  IonIcon,
  ToastController,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  volumeHigh, 
  checkmarkCircle, 
  informationCircle, 
  listCircle, 
  library, 
  book, 
  star, 
  libraryOutline,
  musicalNotes,
  body,
  volumeLow,
  volumeMedium,
  micOutline,
  play,
  playSkipForward,
  mic,
  stop,
  analytics,
  bulb,
  refresh,
  arrowForward,
  trophy,
  time,
  fitness,
  ear,
  school,
  heart
} from 'ionicons/icons';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

// Interfaces for Pronunciation Training
interface PhoneticSound {
  id: string;
  devanagari: string;
  roman: string;
  description: string;
  category: 'vowel' | 'consonant';
  articulationPlace?: string;
  audioFile?: string;
}

interface PronunciationExercise {
  id: string;
  type: 'individual' | 'combination' | 'word' | 'phrase';
  devanagari: string;
  roman: string;
  phoneticGuide?: string;
  mouthPosition?: string;
  difficulty: 'foundation' | 'intermediate' | 'advanced' | 'master';
  targetSounds: string[];
  commonMistakes?: string[];
}

interface PronunciationFeedback {
  accuracy: number;
  vowelClarity: number;
  consonantPrecision: number;
  rhythm: number;
  suggestions: string[];
  detailedAnalysis?: string;
}

interface MasteryCategory {
  name: string;
  progress: number;
  status: 'not-started' | 'learning' | 'mastered';
  exercises: PronunciationExercise[];
}

interface CompletionStats {
  accuracy: number;
  practiceTime: string;
  exercisesCompleted: number;
  soundsMastered: number;
}

@Component({
  selector: 'app-uchcharana',
  templateUrl: './uchcharana.page.html',
  styleUrls: ['./uchcharana.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
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
export class UchcharanaPage implements OnInit {
  // Training state
  isTraining = false;
  isCompleted = false;
  currentMode: 'foundation' | 'intermediate' | 'advanced' | 'master' = 'foundation';
  
  // Exercise tracking
  currentExercise = 1;
  totalExercises = 0;
  currentExerciseData: PronunciationExercise | null = null;
  currentExerciseType = '';
  currentInstruction = '';
  
  // Audio and recording
  isRecording = false;
  pronunciationFeedback: PronunciationFeedback | null = null;
  
  // Mastery tracking
  masteryCategories: MasteryCategory[] = [];
  prerequisiteMastery = {
    padapada: 85,
    vakyapada: 78,
    anuloma: 82
  };
  
  // Completion stats
  completionStats: CompletionStats = {
    accuracy: 0,
    practiceTime: '0h 0m',
    exercisesCompleted: 0,
    soundsMastered: 0
  };

  // Sample exercises data
  private exercises: { [key: string]: PronunciationExercise[] } = {
    foundation: [
      {
        id: 'f1',
        type: 'individual',
        devanagari: 'अ',
        roman: 'a',
        phoneticGuide: 'Short "a" as in "father" but shorter',
        mouthPosition: 'Open mouth naturally, tongue relaxed at bottom of mouth',
        difficulty: 'foundation',
        targetSounds: ['a'],
        commonMistakes: ['Making it too long', 'Adding English accent']
      },
      {
        id: 'f2',
        type: 'individual',
        devanagari: 'आ',
        roman: 'ā',
        phoneticGuide: 'Long "aa" as in "father"',
        mouthPosition: 'Wider mouth opening, tongue low and back',
        difficulty: 'foundation',
        targetSounds: ['aa'],
        commonMistakes: ['Making it too short', 'Diphthong pronunciation']
      },
      {
        id: 'f3',
        type: 'individual',
        devanagari: 'क',
        roman: 'ka',
        phoneticGuide: 'Unaspirated "k" sound',
        mouthPosition: 'Back of tongue touches soft palate',
        difficulty: 'foundation',
        targetSounds: ['ka'],
        commonMistakes: ['Adding aspiration', 'English "k" sound']
      }
    ],
    intermediate: [
      {
        id: 'i1',
        type: 'combination',
        devanagari: 'कृ',
        roman: 'kṛ',
        phoneticGuide: 'K + vocalic R',
        mouthPosition: 'Tongue tip slightly curled for R sound',
        difficulty: 'intermediate',
        targetSounds: ['ka', 'ri'],
        commonMistakes: ['Separating k and r', 'Wrong R pronunciation']
      },
      {
        id: 'i2',
        type: 'combination',
        devanagari: 'श्र',
        roman: 'śra',
        phoneticGuide: 'Palatal sh + R combination',
        mouthPosition: 'Tongue blade near hard palate',
        difficulty: 'intermediate',
        targetSounds: ['sha', 'ra'],
        commonMistakes: ['Using English "sh"', 'Unclear combination']
      }
    ],
    advanced: [
      {
        id: 'a1',
        type: 'word',
        devanagari: 'धर्मक्षेत्रे',
        roman: 'dharma-kṣetre',
        phoneticGuide: 'dhar-ma-kSHe-tre',
        mouthPosition: 'Complex consonant clusters require precise articulation',
        difficulty: 'advanced',
        targetSounds: ['dha', 'ma', 'kṣa', 'tre'],
        commonMistakes: ['Simplifying clusters', 'Wrong stress patterns']
      }
    ],
    master: [
      {
        id: 'm1',
        type: 'phrase',
        devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः',
        roman: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ',
        phoneticGuide: 'Complete first line with proper rhythm and intonation',
        mouthPosition: 'Maintain consistent articulation throughout',
        difficulty: 'master',
        targetSounds: ['all'],
        commonMistakes: ['Inconsistent pronunciation', 'Wrong meter']
      }
    ]
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({
      volumeHigh,
      checkmarkCircle,
      informationCircle,
      listCircle,
      library,
      book,
      star,
      libraryOutline,
      musicalNotes,
      body,
      volumeLow,
      volumeMedium,
      micOutline,
      play,
      playSkipForward,
      mic,
      stop,
      analytics,
      bulb,
      refresh,
      arrowForward,
      trophy,
      time,
      fitness,
      ear,
      school,
      heart
    });
  }

  ngOnInit() {
    this.initializeMasteryCategories();
    this.loadProgress();
  }

  private initializeMasteryCategories() {
    this.masteryCategories = [
      {
        name: 'Vowel Sounds',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['foundation'].filter(e => e.targetSounds.some(s => ['a', 'aa', 'i', 'ii', 'u', 'uu', 'e', 'o'].includes(s)))
      },
      {
        name: 'Basic Consonants',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['foundation'].filter(e => e.targetSounds.some(s => s.includes('a') && s.length === 2))
      },
      {
        name: 'Consonant Clusters',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['intermediate']
      },
      {
        name: 'Word Mastery',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['advanced']
      },
      {
        name: 'Complete Recitation',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['master']
      }
    ];
  }

  private loadProgress() {
    // Load from localStorage or service
    const saved = localStorage.getItem('uchcharana-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.masteryCategories = progress.masteryCategories || this.masteryCategories;
      this.completionStats = progress.completionStats || this.completionStats;
      this.isCompleted = progress.isCompleted || false;
    }
  }

  private saveProgress() {
    const progress = {
      masteryCategories: this.masteryCategories,
      completionStats: this.completionStats,
      isCompleted: this.isCompleted
    };
    localStorage.setItem('uchcharana-progress', JSON.stringify(progress));
  }

  // Mastery checking methods
  getMasteryClass(technique: string): string {
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

  getMasteryStatusIcon(status: string): string {
    switch (status) {
      case 'mastered': return 'checkmark-circle';
      case 'learning': return 'time';
      default: return 'ellipse-outline';
    }
  }

  // Training mode access
  canAccessMode(mode: string): boolean {
    switch (mode) {
      case 'foundation':
        return this.prerequisiteMastery.padapada >= 70;
      case 'intermediate':
        return this.masteryCategories.find(c => c.name === 'Vowel Sounds')?.status === 'mastered';
      case 'advanced':
        return this.masteryCategories.find(c => c.name === 'Consonant Clusters')?.status === 'mastered';
      case 'master':
        return this.masteryCategories.find(c => c.name === 'Word Mastery')?.status === 'mastered';
      default:
        return false;
    }
  }

  // Training methods
  startPhoneticTraining(mode: 'foundation' | 'intermediate' | 'advanced' | 'master') {
    if (!this.canAccessMode(mode)) {
      this.showAccessRequiredMessage(mode);
      return;
    }

    this.currentMode = mode;
    this.isTraining = true;
    this.currentExercise = 1;
    this.totalExercises = this.exercises[mode].length;
    this.currentExerciseData = this.exercises[mode][0];
    this.currentExerciseType = this.currentExerciseData.type;
    this.setCurrentInstruction();
    this.pronunciationFeedback = null;
  }

  private async showAccessRequiredMessage(mode: string) {
    const requirements = {
      foundation: 'Complete Padapāṭha mastery required',
      intermediate: 'Complete Foundation Phonetics mastery required',
      advanced: 'Complete Syllable Combinations mastery required',
      master: 'Complete Word Precision mastery required'
    };

    const alert = await this.alertController.create({
      header: 'Access Required',
      message: requirements[mode as keyof typeof requirements],
      buttons: ['OK']
    });
    await alert.present();
  }

  private setCurrentInstruction() {
    if (!this.currentExerciseData) return;
    
    const instructions = {
      individual: 'Focus on articulating this single sound with perfect clarity',
      combination: 'Practice the smooth flow between these connected sounds',
      word: 'Pronounce the complete word with proper syllable stress',
      phrase: 'Recite with traditional rhythm and authentic intonation'
    };
    
    this.currentInstruction = instructions[this.currentExerciseData.type];
  }

  // Audio and phonetic methods
  playPhonetic(soundId: string) {
    // Simulate audio playback
    this.showToast(`Playing pronunciation for: ${soundId}`);
  }

  playModelPronunciation() {
    if (this.currentExerciseData) {
      this.showToast(`Playing model pronunciation for: ${this.currentExerciseData.roman}`);
    }
  }

  playSlowPronunciation() {
    if (this.currentExerciseData) {
      this.showToast(`Playing slow pronunciation for: ${this.currentExerciseData.roman}`);
    }
  }

  startRecording() {
    this.isRecording = !this.isRecording;
    
    if (this.isRecording) {
      this.showToast('Recording started... Speak now');
      // Simulate recording for 3 seconds
      setTimeout(() => {
        this.isRecording = false;
        this.generatePronunciationFeedback();
      }, 3000);
    }
  }

  private generatePronunciationFeedback() {
    // Simulate pronunciation analysis
    const accuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
    this.pronunciationFeedback = {
      accuracy,
      vowelClarity: Math.floor(Math.random() * 20) + 80,
      consonantPrecision: Math.floor(Math.random() * 25) + 75,
      rhythm: Math.floor(Math.random() * 30) + 70,
      suggestions: this.generateSuggestions(accuracy)
    };
  }

  private generateSuggestions(accuracy: number): string[] {
    const suggestions = [
      'Focus on opening your mouth wider for vowels',
      'Keep your tongue more relaxed during consonants',
      'Practice breathing from your diaphragm',
      'Slow down to ensure clear articulation',
      'Pay attention to the rhythm and flow',
      'Practice individual sounds before combinations'
    ];
    
    const count = accuracy < 80 ? 3 : accuracy < 90 ? 2 : 1;
    return suggestions.slice(0, count);
  }

  getAccuracyClass(): string {
    if (!this.pronunciationFeedback) return '';
    const accuracy = this.pronunciationFeedback.accuracy;
    if (accuracy >= 90) return 'excellent';
    if (accuracy >= 80) return 'good';
    if (accuracy >= 70) return 'fair';
    return 'needs-improvement';
  }

  canProceed(): boolean {
    return this.pronunciationFeedback?.accuracy ? this.pronunciationFeedback.accuracy >= 70 : false;
  }

  // Exercise navigation
  repeatExercise() {
    this.pronunciationFeedback = null;
    this.setCurrentInstruction();
  }

  nextExercise() {
    if (!this.canProceed()) return;

    this.currentExercise++;
    if (this.currentExercise > this.totalExercises) {
      this.completeTrainingMode();
      return;
    }

    this.currentExerciseData = this.exercises[this.currentMode][this.currentExercise - 1];
    this.currentExerciseType = this.currentExerciseData.type;
    this.setCurrentInstruction();
    this.pronunciationFeedback = null;
    this.updateProgress();
  }

  private updateProgress() {
    const progress = (this.currentExercise / this.totalExercises) * 100;
    const categoryIndex = this.getMasteryCategoryIndex();
    if (categoryIndex >= 0) {
      this.masteryCategories[categoryIndex].progress = Math.floor(progress);
      if (progress >= 80) {
        this.masteryCategories[categoryIndex].status = 'learning';
      }
    }
  }

  private getMasteryCategoryIndex(): number {
    const categoryMap = {
      foundation: 0, // Vowel Sounds for foundation
      intermediate: 2, // Consonant Clusters
      advanced: 3, // Word Mastery
      master: 4 // Complete Recitation
    };
    return categoryMap[this.currentMode] || -1;
  }

  private completeTrainingMode() {
    const categoryIndex = this.getMasteryCategoryIndex();
    if (categoryIndex >= 0) {
      this.masteryCategories[categoryIndex].progress = 100;
      this.masteryCategories[categoryIndex].status = 'mastered';
    }

    this.isTraining = false;
    this.updateCompletionStats();
    this.saveProgress();
    this.showCompletionMessage();

    // Check if all categories are mastered
    if (this.masteryCategories.every(c => c.status === 'mastered')) {
      this.isCompleted = true;
      this.saveProgress();
    }
  }

  private updateCompletionStats() {
    this.completionStats.exercisesCompleted += this.totalExercises;
    this.completionStats.soundsMastered = this.masteryCategories.filter(c => c.status === 'mastered').length * 10;
    this.completionStats.accuracy = Math.floor(
      this.masteryCategories.reduce((sum, c) => sum + c.progress, 0) / this.masteryCategories.length
    );
  }

  private async showCompletionMessage() {
    const toast = await this.toastController.create({
      message: `${this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1)} training completed successfully!`,
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
  }

  // Utility methods
  getProgressPercentage(): number {
    if (this.totalExercises === 0) return 0;
    return Math.floor((this.currentExercise / this.totalExercises) * 100);
  }

  getExerciseIcon(): string {
    switch (this.currentExerciseType) {
      case 'individual': return 'volume-low';
      case 'combination': return 'volume-medium';
      case 'word': return 'volume-high';
      case 'phrase': return 'mic-outline';
      default: return 'volume-medium';
    }
  }

  // Navigation methods
  proceedToNextTechnique() {
    this.router.navigate(['/likhitapada']);
  }

  reviewPronunciation() {
    this.isCompleted = false;
    this.isTraining = false;
    // Reset some progress if needed
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
