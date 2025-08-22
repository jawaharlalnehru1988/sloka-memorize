import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline, playOutline, micOutline, checkmarkCircleOutline, starOutline, ellipseOutline, radioButtonOffOutline, trophyOutline, ribbonOutline, libraryOutline, volumeHighOutline, recordingOutline, arrowForwardOutline, arrowDownOutline, playCircleOutline, layersOutline, listOutline, musicalNotesOutline, playForwardOutline, radioButtonOn, lockClosedOutline, medalOutline, timeOutline, repeatOutline, checkmarkCircle, trophy, bookOutline } from 'ionicons/icons';

interface Line {
  devanagari: string;
  roman: string;
  meaning: string;
  practiced: number;
  mastered: boolean;
  audioUrl?: string;
}

interface Sloka {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Line[];
}

@Component({
  selector: 'app-anuloma',
  templateUrl: './anuloma.page.html',
  styleUrls: ['./anuloma.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule]
})
export class AnulomaPage implements OnInit {

  selectedSloka: Sloka | null = null;
  currentLineIndex: number = 0;
  isRecording: boolean = false;
  isRecordingCombined: boolean = false;
  hasHeardLine: boolean = false;
  practiceeFeedback: string = '';
  feedbackClass: string = '';
  combinedFeedback: string = '';
  combinedFeedbackClass: string = '';

  // Sample sloka data for Anuloma practice
  slokas: Sloka[] = [
    {
      id: 1,
      title: 'Gītā 2.47',
      subtitle: 'कर्मण्येवाधिकारस्ते',
      description: 'Famous verse about action without attachment - perfect for learning forward progression',
      difficulty: 'Beginner Friendly',
      lines: [
        {
          devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',
          roman: 'karmaṇy evādhikāras te mā phaleṣu kadācana',
          meaning: 'You have a right to perform your prescribed duty, but not to the fruits of action',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
          roman: 'mā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi',
          meaning: 'Never consider yourself the cause of the results, and never be attached to not doing your duty',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 2,
      title: 'Gītā 4.7-8',
      subtitle: 'यदा यदा हि धर्मस्य',
      description: 'Krishna\'s divine promise about His appearance - excellent for building rhythm and flow',
      difficulty: 'Intermediate',
      lines: [
        {
          devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।',
          roman: 'yadā yadā hi dharmasya glānir bhavati bhārata',
          meaning: 'Whenever and wherever there is a decline in dharma, O Bhārata',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
          roman: 'abhyutthānam adharmasya tadātmānaṁ sṛjāmy aham',
          meaning: 'And a predominant rise of adharma, at that time I manifest Myself',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।',
          roman: 'paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām',
          meaning: 'To deliver the pious and to annihilate the miscreants',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'धर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
          roman: 'dharma-saṁsthāpanārthāya sambhavāmi yuge yuge',
          meaning: 'And to reestablish dharma, I appear millennium after millennium',
          practiced: 0,
          mastered: false
        }
      ]
    },
    {
      id: 3,
      title: 'Gītā 18.65',
      subtitle: 'मन्मना भव मद्भक्तो',
      description: 'Beautiful devotional instruction - practice sequential surrender and devotion',
      difficulty: 'Devotional',
      lines: [
        {
          devanagari: 'मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु।',
          roman: 'man-manā bhava mad-bhakto mad-yājī māṁ namaskuru',
          meaning: 'Always think of Me, be devoted to Me, worship Me, and offer obeisances unto Me',
          practiced: 0,
          mastered: false
        },
        {
          devanagari: 'मामेवैष्यसि सत्यं ते प्रतिजाने प्रियोऽसि मे॥',
          roman: 'mām evaiṣyasi satyaṁ te pratijāne priyo \'si me',
          meaning: 'Thus you will come to Me without fail. I promise you this because you are My very dear friend',
          practiced: 0,
          mastered: false
        }
      ]
    }
  ];

  constructor() { 
    addIcons({arrowForwardOutline,bookOutline,libraryOutline,trophyOutline,arrowDownOutline,playCircleOutline,micOutline,checkmarkCircleOutline,layersOutline,listOutline,starOutline,musicalNotesOutline,checkmarkCircle,playForwardOutline,radioButtonOn,lockClosedOutline,chevronBackOutline,chevronForwardOutline,trophy,medalOutline,timeOutline,repeatOutline,playOutline,ellipseOutline,radioButtonOffOutline,ribbonOutline,volumeHighOutline,recordingOutline});
  }

  ngOnInit() {
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
    const currentProgress = this.currentLineIndex / totalLines;
    const masteryProgress = masteredLines / totalLines;
    return Math.round(Math.max(currentProgress, masteryProgress) * 100);
  }

  selectSloka(slokaId: number) {
    this.selectedSloka = this.slokas.find(s => s.id === slokaId) || null;
    this.currentLineIndex = 0;
    this.resetPracticeState();
    if (this.selectedSloka) {
      // Reset all line progress
      this.selectedSloka.lines.forEach(line => {
        line.practiced = 0;
        line.mastered = false;
      });
    }
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

  goToLine(lineIndex: number) {
    // Can only go to current line or previously mastered lines
    if (lineIndex <= this.currentLineIndex || this.selectedSloka?.lines[lineIndex].mastered) {
      this.currentLineIndex = lineIndex;
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
    // TODO: Implement actual audio playback at slow speed
    console.log('Playing line slowly:', this.currentLine.roman);
    this.showTemporaryFeedback('🔊 Playing line at slow speed...', 'feedback-audio');
  }

  playLineNormal() {
    this.hasHeardLine = true;
    // TODO: Implement actual audio playback at normal speed
    console.log('Playing line normally:', this.currentLine.roman);
    this.showTemporaryFeedback('🎵 Playing line at normal speed...', 'feedback-audio');
  }

  startRecording() {
    if (!this.hasHeardLine) return;
    
    this.isRecording = true;
    this.practiceeFeedback = '';
    
    // Simulate recording process
    setTimeout(() => {
      this.isRecording = false;
      this.evaluateLineRecording();
    }, 3000);

    console.log('Recording practice for line:', this.currentLine.roman);
  }

  private evaluateLineRecording() {
    // Simulate pronunciation evaluation
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
    if (this.currentLine.practiced > 0) return 'ellipse-outline';
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
    console.log('Playing combined lines:', combinedLines.map(l => l.roman).join(' | '));
    this.showTemporaryFeedback(`🎵 Playing combined lines 1-${this.currentLineIndex + 1}...`, 'feedback-audio');
  }

  recordCombined() {
    this.isRecordingCombined = true;
    this.combinedFeedback = '';
    
    // Simulate combined recording process
    setTimeout(() => {
      this.isRecordingCombined = false;
      this.evaluateCombinedRecording();
    }, 5000);

    console.log('Recording combined lines practice');
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

  practiceFullSloka() {
    console.log('Starting full sloka practice for:', this.selectedSloka?.title);
    alert('🎉 Full Śloka Practice Mode!\n\nYou can now recite the entire verse with perfect forward flow and rhythm.');
  }

  claimMasteryBadge() {
    alert('🏆 Anuloma Pāṭha Master Badge Earned!\n\n🎊 Congratulations! You\'ve mastered the forward sequential recitation method.\n\n+150 points awarded!');
  }

  selectNextSloka() {
    const currentIndex = this.slokas.findIndex(s => s.id === this.selectedSloka?.id);
    const nextIndex = (currentIndex + 1) % this.slokas.length;
    this.selectSloka(this.slokas[nextIndex].id);
  }

  private resetPracticeState() {
    this.practiceeFeedback = '';
    this.combinedFeedback = '';
    this.hasHeardLine = false;
    this.isRecording = false;
    this.isRecordingCombined = false;
  }

}
