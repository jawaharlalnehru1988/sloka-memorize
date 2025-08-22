import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';

interface Word {
  devanagari: string;
  roman: string;
  meaning: string;
  practiced?: boolean;
  audio?: string;
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  text: string;
  words: Word[];
}

@Component({
  selector: 'app-padapada',
  templateUrl: './padapada.page.html',
  styleUrls: ['./padapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule]
})
export class PadapadaPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentWordIndex: number = 0;
  isRecording: boolean = false;
  pronunciationFeedback: string = '';
  feedbackClass: string = '';

  // Sample sloka data
  slokas: Sloka[] = [
    {
      id: 1,
      title: 'Gītā 2.47',
      subtitle: 'कर्मण्येवाधिकारस्ते',
      description: 'Famous verse about action without attachment to results',
      text: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन',
      words: [
        { devanagari: 'कर्मणि', roman: 'karmaṇi', meaning: 'in action' },
        { devanagari: 'एव', roman: 'eva', meaning: 'only' },
        { devanagari: 'अधिकारः', roman: 'adhikāraḥ', meaning: 'right' },
        { devanagari: 'ते', roman: 'te', meaning: 'your' },
        { devanagari: 'मा', roman: 'mā', meaning: 'never' },
        { devanagari: 'फलेषु', roman: 'phaleṣu', meaning: 'in results' },
        { devanagari: 'कदाचन', roman: 'kadācana', meaning: 'at any time' }
      ]
    },
    {
      id: 2,
      title: 'Gītā 7.1',
      subtitle: 'श्रीभगवानुवाच',
      description: 'Beginning of Krishna\'s teachings on devotional knowledge',
      text: 'श्रीभगवानुवाच',
      words: [
        { devanagari: 'श्री', roman: 'śrī', meaning: 'blessed' },
        { devanagari: 'भगवान्', roman: 'bhagavān', meaning: 'Lord' },
        { devanagari: 'उवाच', roman: 'uvāca', meaning: 'said' }
      ]
    },
    {
      id: 3,
      title: 'Gītā 18.66',
      subtitle: 'सर्वधर्मान्परित्यज्य',
      description: 'The ultimate instruction of surrender unto Krishna',
      text: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज',
      words: [
        { devanagari: 'सर्व', roman: 'sarva', meaning: 'all' },
        { devanagari: 'धर्मान्', roman: 'dharmān', meaning: 'duties' },
        { devanagari: 'परित्यज्य', roman: 'parityajya', meaning: 'abandoning' },
        { devanagari: 'माम्', roman: 'mām', meaning: 'unto Me' },
        { devanagari: 'एकम्', roman: 'ekam', meaning: 'only' },
        { devanagari: 'शरणम्', roman: 'śaraṇam', meaning: 'surrender' },
        { devanagari: 'व्रज', roman: 'vraja', meaning: 'go' }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  get currentWord(): Word {
    return this.selectedSloka?.words[this.currentWordIndex] || { devanagari: '', roman: '', meaning: '' };
  }

  get progressPercentage(): number {
    if (!this.selectedSloka) return 0;
    const practiceCount = this.selectedSloka.words.filter(word => word.practiced).length;
    return (practiceCount / this.selectedSloka.words.length) * 100;
  }

  selectSloka(slokaId: number) {
    this.selectedSloka = this.slokas.find(s => s.id === slokaId) || null;
    this.currentWordIndex = 0;
    this.pronunciationFeedback = '';
    if (this.selectedSloka) {
      // Reset all practiced flags
      this.selectedSloka.words.forEach(word => word.practiced = false);
    }
  }

  nextWord() {
    if (this.selectedSloka && this.currentWordIndex < this.selectedSloka.words.length - 1) {
      this.currentWordIndex++;
      this.pronunciationFeedback = '';
    }
  }

  previousWord() {
    if (this.currentWordIndex > 0) {
      this.currentWordIndex--;
      this.pronunciationFeedback = '';
    }
  }

  playWordSlow() {
    // Placeholder for audio playback (slow)
    console.log('Playing word slowly:', this.currentWord.roman);
    // TODO: Implement actual audio playback with slower speed
    this.simulateAudioFeedback('Audio: Slow pronunciation of ' + this.currentWord.roman);
  }

  playWordNormal() {
    // Placeholder for audio playback (normal)
    console.log('Playing word normally:', this.currentWord.roman);
    // TODO: Implement actual audio playback with normal speed
    this.simulateAudioFeedback('Audio: Normal pronunciation of ' + this.currentWord.roman);
  }

  startRecording() {
    this.isRecording = true;
    this.pronunciationFeedback = '';
    
    // Simulate recording process
    setTimeout(() => {
      this.isRecording = false;
      this.simulatePronunciationCheck();
    }, 2000);

    // TODO: Implement actual speech recognition
    // if ('webkitSpeechRecognition' in window) {
    //   const recognition = new (window as any).webkitSpeechRecognition();
    //   recognition.lang = 'sa-IN'; // Sanskrit
    //   recognition.onresult = (event: any) => {
    //     const transcript = event.results[0][0].transcript;
    //     this.checkPronunciation(transcript);
    //   };
    //   recognition.start();
    // }
  }

  private simulatePronunciationCheck() {
    // Simulate pronunciation feedback (replace with actual speech recognition)
    const accuracy = Math.random();
    
    if (accuracy > 0.8) {
      this.pronunciationFeedback = 'Excellent! ✅';
      this.feedbackClass = 'feedback-excellent';
      this.currentWord.practiced = true;
    } else if (accuracy > 0.6) {
      this.pronunciationFeedback = 'Good, try again for better accuracy ⚠️';
      this.feedbackClass = 'feedback-good';
    } else {
      this.pronunciationFeedback = 'Needs improvement, listen and try again ❌';
      this.feedbackClass = 'feedback-needs-work';
    }
  }

  private simulateAudioFeedback(message: string) {
    // Temporary feedback for audio simulation
    this.pronunciationFeedback = message;
    this.feedbackClass = 'feedback-audio';
    setTimeout(() => {
      this.pronunciationFeedback = '';
    }, 2000);
  }

  isAllWordsPracticed(): boolean {
    return this.selectedSloka ? this.selectedSloka.words.every(word => word.practiced) : false;
  }

  practiceFullSloka() {
    console.log('Starting full sloka practice for:', this.selectedSloka?.title);
    // TODO: Implement full sloka practice mode
    alert('Full sloka practice mode coming soon! 🎉');
  }

}
