import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { PadapadaService, Sloka, Word } from '../padapada.service';
import { TechniqueHeaderComponent } from "../../shared/components/technique-header/technique-header.component";

@Component({
  selector: 'app-padapada-training',
  templateUrl: './padapada-training.page.html',
  styleUrls: ['./padapada-training.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonButton, IonBackButton, IonButtons,
    CommonModule, FormsModule, TechniqueHeaderComponent
  ]
})
export class PadapadaTrainingPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentWordIndex: number = 0;
  isRecording: boolean = false;
  pronunciationFeedback: string = '';
  feedbackClass: string = '';
  slokaId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private padapadaService: PadapadaService
  ) { }

  ngOnInit() {
    // Get sloka ID from route parameter
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.slokaId = parseInt(id, 10);
        this.loadSloka(this.slokaId);
      }
    });
  }

  loadSloka(slokaId: number) {
    const sloka = this.padapadaService.slokas.find(s => s.id === slokaId);
    if (sloka) {
      this.selectedSloka = sloka;
      this.currentWordIndex = 0;
      this.pronunciationFeedback = '';
      // Reset all practiced flags
      this.selectedSloka.words.forEach(word => word.practiced = false);
    } else {
      // If sloka not found, redirect back to main page
      this.router.navigate(['/padapada']);
    }
  }

  get currentWord(): Word {
    return this.selectedSloka?.words[this.currentWordIndex] || { devanagari: '', roman: '', meaning: '' };
  }

  get progressPercentage(): number {
    if (!this.selectedSloka) return 0;
    const practiceCount = this.selectedSloka.words.filter(word => word.practiced).length;
    return (practiceCount / this.selectedSloka.words.length) * 100;
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
    console.log('Playing word slowly:', this.currentWord.roman);
    this.simulateAudioFeedback('Audio: Slow pronunciation of ' + this.currentWord.roman);
  }

  playWordNormal() {
    console.log('Playing word normally:', this.currentWord.roman);
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
    alert('Full sloka practice mode coming soon! 🎉');
  }

  goBack() {
    this.router.navigate(['/padapada']);
  }
}