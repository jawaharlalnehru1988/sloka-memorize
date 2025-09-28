import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaSloka } from '../../bhagavad-gita/bhagavad-gita.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, playCircleOutline, micOutline, checkmarkCircleOutline, starOutline, playForwardOutline, musicalNotesOutline, chevronBackOutline, chevronForwardOutline, trophy, checkmarkCircle } from 'ionicons/icons';

interface Line {
  devanagari: string;
  roman: string;
  meaning: string;
  practiced: number;
  mastered: boolean;
  audioUrl?: string;
}

interface AnulomaSloka {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Line[];
}

@Component({
  selector: 'app-anuloma-training',
  templateUrl: './anuloma-training.page.html',
  styleUrls: ['./anuloma-training.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonButton,
    CommonModule, 
    FormsModule
  ]
})
export class AnulomaTrainingPage implements OnInit {

  selectedSloka: AnulomaSloka | null = null;
  currentLineIndex: number = 0;
  isRecording: boolean = false;
  isRecordingCombined: boolean = false;
  hasHeardLine: boolean = false;
  practiceeFeedback: string = '';
  feedbackClass: string = '';
  combinedFeedback: string = '';
  combinedFeedbackClass: string = '';
  slokaId: string | number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bgService: BhagavadGitaService
  ) {
    addIcons({arrowBackOutline,playCircleOutline,musicalNotesOutline,micOutline,checkmarkCircleOutline,checkmarkCircle, playForwardOutline,chevronBackOutline,chevronForwardOutline,trophy,starOutline});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slokaId = params['id']; // Keep as string initially
      this.loadSloka(this.slokaId);
    });
  }

  loadSloka(slokaId: any) {
    // Load data from BhagavadGitaService and transform to AnulomaSloka
    this.bgService.getBgSlokas().subscribe(slokas => {
      if (slokas && slokas.length > 0) {
        // Find sloka by _id or use orderNo/index as fallback
        let bgSloka = slokas.find(s => s._id === slokaId || s.orderNo === slokaId);
        
        // If not found by ID, try to find by index (for backwards compatibility)
        if (!bgSloka && typeof slokaId === 'number' && slokaId > 0 && slokaId <= slokas.length) {
          bgSloka = slokas[slokaId - 1];
        }
        
        if (bgSloka) {
          this.selectedSloka = this.transformToAnulomaSloka(bgSloka, slokaId);
          this.currentLineIndex = 0;
          this.resetPracticeState();
        } else {
          this.router.navigate(['/anuloma']);
        }
      } else {
        this.router.navigate(['/anuloma']);
      }
    });
  }

  private transformToAnulomaSloka(bgSloka: BhagavadGitaSloka, id: string | number): AnulomaSloka {
    // Split the sloka text into lines (assuming double space or pipe separates lines)
    const lines = this.splitSlokaIntoLines(bgSloka.slokaText);
    const romanLines = this.generateRomanTransliteration(lines);
    
    return {
      id: id,
      title: `Gītā ${bgSloka.slokaNo}`,
      subtitle: lines[0]?.substring(0, 20) + '...',
      description: bgSloka.slokaMeaning || 'Practice this sacred verse using the Anuloma method',
      difficulty: 'Intermediate',
      lines: lines.map((line, index) => ({
        devanagari: line,
        roman: romanLines[index] || line,
        meaning: index === 0 ? bgSloka.slokaMeaning : 'Continue with devotional practice',
        practiced: 0,
        mastered: false,
        audioUrl: bgSloka.SlokaVoice
      }))
    };
  }

  private splitSlokaIntoLines(slokaText: string): string[] {
    // Split by common Sanskrit verse separators
    let lines = slokaText.split(/[।॥]/);
    lines = lines.filter(line => line.trim().length > 0);
    
    // If no separators found, try to split by length (approximate)
    if (lines.length === 1 && slokaText.length > 40) {
      const midPoint = Math.floor(slokaText.length / 2);
      const spaceIndex = slokaText.indexOf(' ', midPoint);
      if (spaceIndex > -1) {
        lines = [slokaText.substring(0, spaceIndex), slokaText.substring(spaceIndex + 1)];
      }
    }
    
    return lines.length > 0 ? lines : [slokaText];
  }

  private generateRomanTransliteration(lines: string[]): string[] {
    // Basic transliteration mapping (simplified)
    const transliterationMap: {[key: string]: string} = {
      'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū', 
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
      'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
      'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
      'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha'
    };

    return lines.map(line => {
      // For now, return a simplified version
      // In production, you'd want a proper transliteration library
      return line; // Placeholder - would implement proper transliteration
    });
  }

  get currentLine(): Line {
    return this.selectedSloka?.lines[this.currentLineIndex] || {
      devanagari: '',
      roman: '',
      meaning: '',
      practiced: 0,
      mastered: false
    };
  }

  get overallProgress(): number {
    if (!this.selectedSloka) return 0;
    const totalLines = this.selectedSloka.lines.length;
    const masteredLines = this.selectedSloka.lines.filter(line => line.mastered).length;
    return Math.round((masteredLines / totalLines) * 100);
  }

  goBack() {
    this.router.navigate(['/anuloma']);
  }

  nextLine() {
    if (this.canProceedToNext()) {
      this.currentLineIndex++;
      this.resetPracticeState();
    }
  }

  previousLine() {
    if (this.currentLineIndex > 0) {
      this.currentLineIndex--;
      this.resetPracticeState();
    }
  }

  canProceedToNext(): boolean {
    if (!this.selectedSloka) return false;
    if (this.currentLineIndex >= this.selectedSloka.lines.length - 1) return false;
    return this.currentLine.mastered;
  }

  playLineSlow() {
    this.hasHeardLine = true;
    this.showTemporaryFeedback('🔊 Playing line at slow speed...', 'feedback-audio');
  }

  playLineNormal() {
    this.hasHeardLine = true;
    this.showTemporaryFeedback('🎵 Playing line at normal speed...', 'feedback-audio');
  }

  startRecording() {
    if (!this.hasHeardLine) return;
    
    this.isRecording = true;
    this.practiceeFeedback = '';
    
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateLineRecording();
    }, 3000);

  }

  private evaluateLineRecording() {
    const accuracy = Math.random();
    
    if (accuracy > 0.75) {
      this.currentLine.practiced++;
      this.practiceeFeedback = '🎉 Excellent pronunciation! Keep practicing!';
      this.feedbackClass = 'feedback-excellent';
      
      if (this.currentLine.practiced >= 3) {
        this.practiceeFeedback += ' ✅ Ready to mark as mastered!';
      }
    } else if (accuracy > 0.5) {
      this.currentLine.practiced++;
      this.practiceeFeedback = '👍 Good attempt! Focus on rhythm and pronunciation.';
      this.feedbackClass = 'feedback-good';
    } else {
      this.practiceeFeedback = '🔄 Keep practicing! Listen carefully and try again.';
      this.feedbackClass = 'feedback-needs-work';
    }
  }

  markLineMastered() {
    if (this.currentLine.practiced >= 3) {
      this.currentLine.mastered = true;
      this.practiceeFeedback = '🏆 Line mastered! You can now proceed to the next line.';
      this.feedbackClass = 'feedback-mastered';
    }
  }

  getLineStatusClass(): string {
    if (this.currentLine.mastered) return 'status-mastered';
    if (this.currentLine.practiced >= 3) return 'status-ready';
    if (this.currentLine.practiced > 0) return 'status-practicing';
    return 'status-new';
  }

  getLineStatusIcon(): string {
    if (this.currentLine.mastered) return 'checkmark-circle-outline';
    if (this.currentLine.practiced >= 3) return 'star-outline';
    if (this.currentLine.practiced > 0) return 'radio-button-on-outline';
    return 'radio-button-off-outline';
  }

  getLineStatusText(): string {
    if (this.currentLine.mastered) return 'Mastered';
    if (this.currentLine.practiced >= 3) return 'Ready to Master';
    if (this.currentLine.practiced > 0) return `${this.currentLine.practiced}/3 Practices`;
    return 'New Line';
  }

  hasMasteredLines(): boolean {
    return this.selectedSloka ? this.selectedSloka.lines.some(line => line.mastered) : false;
  }

  getMasteredLines(): Line[] {
    if (!this.selectedSloka) return [];
    return this.selectedSloka.lines.filter(line => line.mastered);
  }

  getCombinedLines(): Line[] {
    if (!this.selectedSloka) return [];
    return this.selectedSloka.lines.slice(0, this.currentLineIndex + 1).filter(line => line.mastered || line === this.currentLine);
  }

  playCombinedLines() {
    const combinedLines = this.getCombinedLines();
    this.showTemporaryFeedback(`🎵 Playing combined lines 1-${this.currentLineIndex + 1}...`, 'feedback-audio');
  }

  recordCombined() {
    this.isRecordingCombined = true;
    this.combinedFeedback = '';
    
    setTimeout(() => {
      this.isRecordingCombined = false;
      this.evaluateCombinedRecording();
    }, 5000);

  }

  private evaluateCombinedRecording() {
    const accuracy = Math.random();
    
    if (accuracy > 0.7) {
      this.combinedFeedback = '🎉 Excellent flow! You\'re building great rhythm and continuity!';
      this.combinedFeedbackClass = 'feedback-excellent';
    } else if (accuracy > 0.5) {
      this.combinedFeedback = '👍 Good combined recitation! Work on smoother transitions between lines.';
      this.combinedFeedbackClass = 'feedback-good';
    } else {
      this.combinedFeedback = '🔄 Keep practicing the individual lines and their flow together.';
      this.combinedFeedbackClass = 'feedback-needs-work';
    }
  }

  private showTemporaryFeedback(message: string, className: string) {
    this.practiceeFeedback = message;
    this.feedbackClass = className;
    setTimeout(() => {
      this.practiceeFeedback = '';
    }, 2000);
  }

  isSlokaCompleted(): boolean {
    return this.selectedSloka ? this.selectedSloka.lines.every(line => line.mastered) : false;
  }

  private resetPracticeState() {
    this.practiceeFeedback = '';
    this.combinedFeedback = '';
    this.hasHeardLine = false;
    this.isRecording = false;
    this.isRecordingCombined = false;
  }

}
