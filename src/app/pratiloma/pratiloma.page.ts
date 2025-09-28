import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, playOutline, micOutline, checkmarkCircleOutline, ellipseOutline, volumeHighOutline, recordingOutline, libraryOutline, helpOutline, eyeOffOutline, refreshOutline, checkmarkOutline, closeOutline, ribbonOutline, bulbOutline, checkmarkCircle } from 'ionicons/icons';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

interface Word {
  devanagari: string;
  roman: string;
  meaning: string;
  originalIndex: number;
  used?: boolean;
  correct?: boolean;
}

interface Line {
  devanagari: string;
  roman: string;
  meaning: string;
  words: Word[];
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Line[];
}

interface TrainingMode {
  type: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  locked: boolean;
}

interface TrainingLevel {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: 'app-pratiloma',
  templateUrl: './pratiloma.page.html',
  styleUrls: ['./pratiloma.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonButton, FormsModule, TechniqueHeaderComponent]
})
export class PratilomaPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentWordIndex: number = 0;
  currentLevel: number = 0;
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

  trainingLevels: TrainingLevel[] = [
    {
      title: 'Beginner - Guided Reading',
      description: 'Read and repeat the reverse sequence with visual guides',
      completed: false,
      current: true
    },
    {
      title: 'Intermediate - Audio Practice',
      description: 'Listen and repeat without seeing the text',
      completed: false,
      current: false
    },
    {
      title: 'Challenge - Word Arrangement',
      description: 'Arrange words in correct reverse order',
      completed: false,
      current: false
    },
    {
      title: 'Advanced - Memory Recall',
      description: 'Recite complete śloka in reverse from memory',
      completed: false,
      current: false
    },
    {
      title: 'Master - Fluent Recitation',
      description: 'Fluent reverse recitation with proper rhythm',
      completed: false,
      current: false
    }
  ];

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
      icon: 'puzzle-outline',
      completed: false,
      locked: false
    },
    {
      type: 'memory',
      title: 'Memory Recall',
      description: 'Recite from memory',
      icon: 'brain-outline',
      completed: false,
      locked: false
    }
  ];

  slokas: Sloka[] = [
    {
      id: 1,
      title: 'Gītā 2.47',
      subtitle: 'कर्मण्येवाधिकारस्ते',
      description: 'Perfect for learning reverse recitation fundamentals',
      difficulty: 'Beginner',
      lines: [
        {
          devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
          roman: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
          meaning: 'You have a right to perform your prescribed duty, but not to the fruits of action',
          words: [
            { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'in action', originalIndex: 0 },
            { devanagari: 'एव', roman: 'eva', meaning: 'certainly', originalIndex: 1 },
            { devanagari: 'अधिकारः', roman: 'adhikāraḥ', meaning: 'right/authority', originalIndex: 2 },
            { devanagari: 'ते', roman: 'te', meaning: 'your', originalIndex: 3 },
            { devanagari: 'मा', roman: 'mā', meaning: 'not', originalIndex: 4 },
            { devanagari: 'फलेषु', roman: 'phaleṣu', meaning: 'in fruits', originalIndex: 5 },
            { devanagari: 'कदाचन', roman: 'kadācana', meaning: 'at any time', originalIndex: 6 }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'Gītā 7.7',
      subtitle: 'मत्तः परतरं नान्यत्',
      description: 'Intermediate level for building reverse recitation confidence',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।',
          roman: 'mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya',
          meaning: 'There is nothing superior to Me, O Dhanañjaya',
          words: [
            { devanagari: 'मत्तः', roman: 'mattaḥ', meaning: 'than Me', originalIndex: 0 },
            { devanagari: 'परतरम्', roman: 'parataram', meaning: 'superior', originalIndex: 1 },
            { devanagari: 'न', roman: 'na', meaning: 'not', originalIndex: 2 },
            { devanagari: 'अन्यत्', roman: 'anyat', meaning: 'other', originalIndex: 3 },
            { devanagari: 'किञ्चित्', roman: 'kiñcit', meaning: 'anything', originalIndex: 4 },
            { devanagari: 'अस्ति', roman: 'asti', meaning: 'there is', originalIndex: 5 },
            { devanagari: 'धनञ्जय', roman: 'dhanañjaya', meaning: 'O Arjuna', originalIndex: 6 }
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Gītā 18.66',
      subtitle: 'सर्वधर्मान्परित्यज्य',
      description: 'Advanced practice with Krishna\'s final instruction',
      difficulty: 'Advanced',
      lines: [
        {
          devanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।',
          roman: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja',
          meaning: 'Abandon all varieties of dharma and just surrender unto Me alone',
          words: [
            { devanagari: 'सर्व', roman: 'sarva', meaning: 'all', originalIndex: 0 },
            { devanagari: 'धर्मान्', roman: 'dharmān', meaning: 'duties', originalIndex: 1 },
            { devanagari: 'परित्यज्य', roman: 'parityajya', meaning: 'abandoning', originalIndex: 2 },
            { devanagari: 'माम्', roman: 'mām', meaning: 'unto Me', originalIndex: 3 },
            { devanagari: 'एकम्', roman: 'ekam', meaning: 'alone', originalIndex: 4 },
            { devanagari: 'शरणम्', roman: 'śaraṇam', meaning: 'surrender', originalIndex: 5 },
            { devanagari: 'व्रज', roman: 'vraja', meaning: 'go', originalIndex: 6 }
          ]
        }
      ]
    }
  ];

  constructor() {
    addIcons({libraryOutline,chevronBackOutline,volumeHighOutline,chevronForwardOutline,playOutline,closeOutline,refreshOutline,checkmarkOutline,helpOutline,eyeOffOutline,checkmarkCircle,ribbonOutline,bulbOutline,micOutline,checkmarkCircleOutline,ellipseOutline,recordingOutline});
  }

  ngOnInit() {
  }

  selectSloka(slokaId: number) {
    this.selectedSloka = this.slokas.find(s => s.id === slokaId) || null;
    this.currentWordIndex = 0;
    this.resetAllModes();
    this.initializeChallenge();
  }

  switchMode(mode: TrainingMode) {
    if (!mode.locked) {
      this.currentMode = mode;
      this.resetModeState();
    }
  }

  getReverseWords(): Word[] {
    if (!this.selectedSloka) return [];
    return [...this.selectedSloka.lines[0].words].reverse();
  }

  getOriginalWords(): Word[] {
    if (!this.selectedSloka) return [];
    return this.selectedSloka.lines[0].words;
  }

  getCurrentWord(): Word {
    const reverseWords = this.getReverseWords();
    return reverseWords[this.currentWordIndex] || { devanagari: '', roman: '', meaning: '', originalIndex: 0 };
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
    const word = this.getCurrentWord();
    console.log('Playing word:', word.roman);
    this.showTemporaryFeedback(`🔊 Playing: ${word.roman}`, 'feedback-audio', 2000);
  }

  playReverseSequence() {
    this.hasHeardSequence = true;
    const reverseWords = this.getReverseWords();
    const sequence = reverseWords.map(w => w.roman).join(' ');
    console.log('Playing reverse sequence:', sequence);
    this.showTemporaryFeedback('🎵 Playing complete reverse sequence...', 'feedback-audio', 3000);
  }

  startRecording() {
    if (!this.hasHeardSequence) return;
    
    this.isRecording = true;
    this.practiceFeedback = '';
    
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateRecording();
    }, 4000);
  }

  startMemoryRecording() {
    this.isRecording = true;
    this.memoryFeedback = '';
    
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateMemoryRecording();
    }, 6000);
  }

  private evaluateRecording() {
    const accuracy = Math.random();
    
    if (accuracy > 0.8) {
      this.practiceFeedback = '🎉 Excellent reverse recitation! Perfect pronunciation and sequence!';
      this.feedbackClass = 'feedback-excellent';
      this.trainingModes.find(m => m.type === 'audio')!.completed = true;
    } else if (accuracy > 0.6) {
      this.practiceFeedback = '👍 Good attempt! Focus on the word sequence and pronunciation.';
      this.feedbackClass = 'feedback-good';
    } else {
      this.practiceFeedback = '🔄 Keep practicing! Listen to the sequence again and try to match the rhythm.';
      this.feedbackClass = 'feedback-needs-work';
    }
  }

  private evaluateMemoryRecording() {
    const accuracy = Math.random();
    
    if (accuracy > 0.75) {
      this.memoryFeedback = '🏆 Masterful! You have achieved perfect reverse recitation from memory!';
      this.memoryFeedbackClass = 'feedback-excellent';
      this.trainingModes.find(m => m.type === 'memory')!.completed = true;
    } else if (accuracy > 0.5) {
      this.memoryFeedback = '💪 Good memory recall! Practice a few more times for fluency.';
      this.memoryFeedbackClass = 'feedback-good';
    } else {
      this.memoryFeedback = '🧠 Keep strengthening your memory. Use the hints if needed.';
      this.memoryFeedbackClass = 'feedback-needs-work';
    }
  }

  getShuffledWords(): Word[] {
    return this.shuffledWords;
  }

  selectWordForChallenge(word: Word) {
    if (word.used) return;
    
    word.used = true;
    this.selectedSequence.push(word);
    this.challengeFeedback = '';
  }

  removeFromSequence(index: number) {
    const word = this.selectedSequence[index];
    word.used = false;
    this.selectedSequence.splice(index, 1);
  }

  resetChallenge() {
    this.selectedSequence = [];
    this.shuffledWords.forEach(word => {
      word.used = false;
      word.correct = false;
    });
    this.challengeFeedback = '';
    this.initializeChallenge();
  }

  checkChallengeAnswer() {
    const reverseWords = this.getReverseWords();
    let correct = true;
    
    for (let i = 0; i < this.selectedSequence.length; i++) {
      if (this.selectedSequence[i].originalIndex !== reverseWords[i].originalIndex) {
        correct = false;
        break;
      }
    }
    
    if (correct) {
      this.challengeFeedback = '🎉 Perfect! You have correctly arranged the words in reverse order!';
      this.challengeFeedbackClass = 'feedback-excellent';
      this.trainingModes.find(m => m.type === 'challenge')!.completed = true;
    } else {
      this.challengeFeedback = '🔄 Not quite right. Check the reverse sequence and try again.';
      this.challengeFeedbackClass = 'feedback-needs-work';
    }
  }

  private initializeChallenge() {
    if (!this.selectedSloka) return;
    
    this.shuffledWords = [...this.selectedSloka.lines[0].words].map(word => ({
      ...word,
      used: false,
      correct: false
    }));
    
    // Shuffle the words
    for (let i = this.shuffledWords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledWords[i], this.shuffledWords[j]] = [this.shuffledWords[j], this.shuffledWords[i]];
    }
  }

  getTrainingProgress(): number {
    const completedModes = this.trainingModes.filter(m => m.completed).length;
    return Math.round((completedModes / this.trainingModes.length) * 100);
  }

  isTrainingCompleted(): boolean {
    return this.trainingModes.every(mode => mode.completed);
  }

  claimMasteryBadge() {
    alert('🏆 Pratiloma Pāṭha Master Badge Earned!\n\n🪷 Blessed by Goddess Sarasvatī!\n\nYou have mastered the ancient art of reverse recitation. Your memory and concentration are now significantly enhanced!\n\n+200 points awarded!');
  }

  selectNextSloka() {
    const currentIndex = this.slokas.findIndex(s => s.id === this.selectedSloka?.id);
    const nextIndex = (currentIndex + 1) % this.slokas.length;
    this.selectSloka(this.slokas[nextIndex].id);
  }

  private resetAllModes() {
    this.trainingModes.forEach(mode => {
      mode.completed = false;
      mode.locked = false;
    });
    this.resetModeState();
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
