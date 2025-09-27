import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { PadapadaService, Sloka, Word } from './padapada.service';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";



@Component({
  selector: 'app-padapada',
  templateUrl: './padapada.page.html',
  styleUrls: ['./padapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class PadapadaPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentWordIndex: number = 0;
  isRecording: boolean = false;
  pronunciationFeedback: string = '';
  feedbackClass: string = '';
  slokas: Sloka[];




  constructor(private padapadaService: PadapadaService) {
    // Load slokas from the service
    this.slokas = this.padapadaService.slokas;

   }

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
