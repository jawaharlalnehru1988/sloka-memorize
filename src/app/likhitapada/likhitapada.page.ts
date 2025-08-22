import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  create, 
  checkmarkCircle, 
  informationCircle, 
  listCircle, 
  library, 
  book, 
  star, 
  fingerPrint,
  copy,
  documentText,
  bookOutline,
  refresh,
  arrowUndo,
  grid,
  analytics,
  bulb,
  helpCircle,
  checkmarkCircle as checkmark,
  arrowForward,
  trophy,
  handLeft,
  time,
  heart,
  eye, leaf, diamond } from 'ionicons/icons';

// Interfaces for Writing Practice
interface WritingExercise {
  id: string;
  type: 'character' | 'word' | 'phrase' | 'verse';
  devanagari: string;
  roman: string;
  meaning?: string;
  difficulty: 'tracing' | 'copying' | 'composition' | 'manuscript';
  targetCharacters: string[];
  strokeOrder?: string[];
  guidelines?: boolean;
}

interface WritingFeedback {
  characterFormation: number;
  strokeOrder: number;
  spacing: number;
  overall: number;
  suggestions: string[];
  detailedAnalysis?: string;
}

interface WritingCategory {
  name: string;
  progress: number;
  status: 'not-started' | 'learning' | 'mastered';
  exercises: WritingExercise[];
}

interface CompletionStats {
  charactersWritten: number;
  exercisesCompleted: number;
  accuracy: number;
  practiceTime: string;
  manuscriptsCreated: number;
}

interface DrawingPoint {
  x: number;
  y: number;
  pressure?: number;
  timestamp: number;
}

interface DrawingStroke {
  points: DrawingPoint[];
  color: string;
  width: number;
}

@Component({
  selector: 'app-likhitapada',
  templateUrl: './likhitapada.page.html',
  styleUrls: ['./likhitapada.page.scss'],
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
    FormsModule
  ]
})
export class LikhitapadaPage implements OnInit {
  @ViewChild('drawingCanvas', { static: false }) drawingCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('writingCanvas', { static: false }) writingCanvasRef!: ElementRef;

  // Training state
  isWriting = false;
  isCompleted = false;
  currentMode: 'tracing' | 'copying' | 'composition' | 'manuscript' = 'tracing';
  selectedScript: 'devanagari' | 'roman' | 'combined' = 'devanagari';
  
  // Exercise tracking
  currentExercise = 1;
  totalExercises = 0;
  currentExerciseData: WritingExercise | null = null;
  currentExerciseType = '';
  currentInstruction = '';
  
  // Drawing state
  isDrawing = false;
  showGuidelines = true;
  currentStrokes: DrawingStroke[] = [];
  currentStroke: DrawingStroke | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null = null;
  
  // Feedback and progress
  writingFeedback: WritingFeedback | null = null;
  writingCategories: WritingCategory[] = [];
  prerequisiteMastery = {
    padapada: 85,
    uchcharana: 88,
    vakyapada: 82
  };
  
  // Completion stats
  completionStats: CompletionStats = {
    charactersWritten: 0,
    exercisesCompleted: 0,
    accuracy: 0,
    practiceTime: '0h 0m',
    manuscriptsCreated: 0
  };

  // Sample exercises data
  private exercises: { [key: string]: WritingExercise[] } = {
    tracing: [
      {
        id: 't1',
        type: 'character',
        devanagari: 'अ',
        roman: 'a',
        meaning: 'The first vowel',
        difficulty: 'tracing',
        targetCharacters: ['अ'],
        strokeOrder: ['vertical line', 'horizontal top', 'curved right'],
        guidelines: true
      },
      {
        id: 't2',
        type: 'character',
        devanagari: 'क',
        roman: 'ka',
        meaning: 'The first consonant',
        difficulty: 'tracing',
        targetCharacters: ['क'],
        strokeOrder: ['vertical left', 'horizontal top', 'vertical right', 'horizontal middle'],
        guidelines: true
      }
    ],
    copying: [
      {
        id: 'c1',
        type: 'word',
        devanagari: 'धर्म',
        roman: 'dharma',
        meaning: 'righteousness, duty',
        difficulty: 'copying',
        targetCharacters: ['ध', 'र्', 'म'],
        guidelines: true
      },
      {
        id: 'c2',
        type: 'word',
        devanagari: 'क्षेत्र',
        roman: 'kṣetra',
        meaning: 'field, realm',
        difficulty: 'copying',
        targetCharacters: ['क्', 'षे', 'त्', 'र'],
        guidelines: false
      }
    ],
    composition: [
      {
        id: 'co1',
        type: 'phrase',
        devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे',
        roman: 'dharma-kṣetre kuru-kṣetre',
        meaning: 'In the field of dharma, in Kurukshetra',
        difficulty: 'composition',
        targetCharacters: ['सभी'],
        guidelines: false
      }
    ],
    manuscript: [
      {
        id: 'm1',
        type: 'verse',
        devanagari: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥',
        roman: 'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāścaiva kim akurvata sañjaya',
        meaning: 'Complete first verse of Bhagavad Gītā',
        difficulty: 'manuscript',
        targetCharacters: ['all'],
        guidelines: false
      }
    ]
  };

  constructor(
    private router: Router,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({create,checkmarkCircle,informationCircle,listCircle,library,book,star,leaf,diamond,fingerPrint,copy,documentText,bookOutline,refresh,arrowUndo,grid,analytics,bulb,helpCircle,arrowForward,trophy,time,handLeft,heart,eye,checkmark});
  }

  ngOnInit() {
    this.initializeWritingCategories();
    this.loadProgress();
  }

  ngAfterViewInit() {
    // Initialize canvas when view is ready
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }

  private initializeWritingCategories() {
    this.writingCategories = [
      {
        name: 'Character Formation',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['tracing']
      },
      {
        name: 'Word Writing',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['copying']
      },
      {
        name: 'Memory Composition',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['composition']
      },
      {
        name: 'Manuscript Creation',
        progress: 0,
        status: 'not-started',
        exercises: this.exercises['manuscript']
      }
    ];
  }

  private loadProgress() {
    const saved = localStorage.getItem('likhita-progress');
    if (saved) {
      const progress = JSON.parse(saved);
      this.writingCategories = progress.writingCategories || this.writingCategories;
      this.completionStats = progress.completionStats || this.completionStats;
      this.isCompleted = progress.isCompleted || false;
      this.selectedScript = progress.selectedScript || 'devanagari';
    }
  }

  private saveProgress() {
    const progress = {
      writingCategories: this.writingCategories,
      completionStats: this.completionStats,
      isCompleted: this.isCompleted,
      selectedScript: this.selectedScript
    };
    localStorage.setItem('likhita-progress', JSON.stringify(progress));
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

  // Script selection
  selectScript(script: 'devanagari' | 'roman' | 'combined') {
    this.selectedScript = script;
    this.saveProgress();
    this.showToast(`Selected ${script} script for practice`);
  }

  // Training mode access
  canAccessMode(mode: string): boolean {
    switch (mode) {
      case 'tracing':
        return this.prerequisiteMastery.uchcharana >= 70;
      case 'copying':
        return this.writingCategories.find(c => c.name === 'Character Formation')?.status === 'mastered';
      case 'composition':
        return this.writingCategories.find(c => c.name === 'Word Writing')?.status === 'mastered';
      case 'manuscript':
        return this.writingCategories.find(c => c.name === 'Memory Composition')?.status === 'mastered';
      default:
        return false;
    }
  }

  // Writing practice methods
  startWritingPractice(mode: 'tracing' | 'copying' | 'composition' | 'manuscript') {
    if (!this.canAccessMode(mode)) {
      this.showAccessRequiredMessage(mode);
      return;
    }

    this.currentMode = mode;
    this.isWriting = true;
    this.currentExercise = 1;
    this.totalExercises = this.exercises[mode].length;
    this.currentExerciseData = this.exercises[mode][0];
    this.currentExerciseType = this.currentExerciseData.type;
    this.setCurrentInstruction();
    this.writingFeedback = null;
    
    // Initialize canvas after setting up exercise
    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }

  private async showAccessRequiredMessage(mode: string) {
    const requirements = {
      tracing: 'Complete Ucchāraṇa mastery required',
      copying: 'Complete Character Formation mastery required', 
      composition: 'Complete Word Writing mastery required',
      manuscript: 'Complete Memory Composition mastery required'
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
      tracing: {
        character: 'Trace over the dotted character outline following the stroke order',
        word: 'Trace each character in the word maintaining proper spacing',
        phrase: 'Trace the complete phrase with attention to rhythm',
        verse: 'Trace the full verse with traditional formatting'
      },
      copying: {
        character: 'Copy the character by looking at the reference',
        word: 'Copy the complete word maintaining character proportions',
        phrase: 'Copy the phrase with proper word spacing',
        verse: 'Copy the verse with traditional line breaks'
      },
      composition: {
        character: 'Write the character from memory',
        word: 'Write the complete word from memory',
        phrase: 'Write the phrase from memory with correct spelling',
        verse: 'Write the full verse from memory'
      },
      manuscript: {
        character: 'Create a beautiful character with decorative elements',
        word: 'Present the word in manuscript style',
        phrase: 'Format the phrase as in traditional manuscripts',
        verse: 'Create a complete manuscript page with proper layout'
      }
    };
    
    this.currentInstruction = instructions[this.currentMode][this.currentExerciseData.type];
  }

  // Canvas methods
  private initializeCanvas() {
    if (this.drawingCanvas?.nativeElement) {
      this.canvas = this.drawingCanvas.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      
      if (this.ctx) {
        this.ctx.strokeStyle = '#2d3748';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        
        // Set canvas background
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  }

  startDrawing(event: TouchEvent | MouseEvent) {
    if (!this.canvas || !this.ctx) return;
    
    event.preventDefault();
    this.isDrawing = true;
    
    const point = this.getEventPoint(event);
    this.currentStroke = {
      points: [{ ...point, timestamp: Date.now() }],
      color: '#2d3748',
      width: 2
    };
    
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);
  }

  draw(event: TouchEvent | MouseEvent) {
    if (!this.isDrawing || !this.canvas || !this.ctx || !this.currentStroke) return;
    
    event.preventDefault();
    const point = this.getEventPoint(event);
    
    this.currentStroke.points.push({ ...point, timestamp: Date.now() });
    
    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
  }

  stopDrawing(event: TouchEvent | MouseEvent) {
    if (!this.isDrawing || !this.currentStroke) return;
    
    event.preventDefault();
    this.isDrawing = false;
    
    this.currentStrokes.push(this.currentStroke);
    this.currentStroke = null;
    
    // Auto-evaluate after stroke completion
    this.autoEvaluateStroke();
  }

  private getEventPoint(event: TouchEvent | MouseEvent): DrawingPoint {
    if (!this.canvas) return { x: 0, y: 0, timestamp: Date.now() };
    
    const rect = this.canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if (event instanceof TouchEvent) {
      clientX = event.touches[0]?.clientX || event.changedTouches[0]?.clientX || 0;
      clientY = event.touches[0]?.clientY || event.changedTouches[0]?.clientY || 0;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    return {
      x: (clientX - rect.left) * (this.canvas.width / rect.width),
      y: (clientY - rect.top) * (this.canvas.height / rect.height),
      timestamp: Date.now()
    };
  }

  private autoEvaluateStroke() {
    // Auto-evaluation after each stroke for immediate feedback
    if (this.currentStrokes.length > 0) {
      // Simple evaluation - in real implementation, this would use AI/ML
      const mockAccuracy = Math.floor(Math.random() * 30) + 70;
      this.generateWritingFeedback(mockAccuracy);
    }
  }

  clearCanvas() {
    if (!this.canvas || !this.ctx) return;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.currentStrokes = [];
    this.writingFeedback = null;
  }

  undoLastStroke() {
    if (this.currentStrokes.length === 0) return;
    
    this.currentStrokes.pop();
    this.redrawCanvas();
  }

  private redrawCanvas() {
    if (!this.canvas || !this.ctx) return;
    
    this.clearCanvas();
    
    this.currentStrokes.forEach(stroke => {
      this.ctx!.strokeStyle = stroke.color;
      this.ctx!.lineWidth = stroke.width;
      this.ctx!.beginPath();
      
      stroke.points.forEach((point, index) => {
        if (index === 0) {
          this.ctx!.moveTo(point.x, point.y);
        } else {
          this.ctx!.lineTo(point.x, point.y);
        }
      });
      
      this.ctx!.stroke();
    });
  }

  toggleGuidelines() {
    this.showGuidelines = !this.showGuidelines;
  }

  // Exercise methods
  repeatExercise() {
    this.clearCanvas();
    this.writingFeedback = null;
    this.setCurrentInstruction();
  }

  getWritingHelp() {
    this.showWritingHelp();
  }

  private async showWritingHelp() {
    const alert = await this.alertController.create({
      header: 'Writing Help',
      message: this.getHelpMessage(),
      buttons: ['OK']
    });
    await alert.present();
  }

  private getHelpMessage(): string {
    if (!this.currentExerciseData) return 'No exercise selected';
    
    const helpMessages = {
      tracing: 'Follow the dotted lines slowly and carefully. Pay attention to stroke order.',
      copying: 'Look at the reference text and reproduce it character by character.',
      composition: 'Write from memory. Take your time to recall each character.',
      manuscript: 'Focus on beautiful presentation with proper spacing and alignment.'
    };
    
    return helpMessages[this.currentMode];
  }

  evaluateWriting() {
    const accuracy = Math.floor(Math.random() * 30) + 70; // Mock evaluation
    this.generateWritingFeedback(accuracy);
  }

  private generateWritingFeedback(baseAccuracy: number) {
    this.writingFeedback = {
      characterFormation: Math.min(100, baseAccuracy + Math.floor(Math.random() * 10)),
      strokeOrder: Math.min(100, baseAccuracy + Math.floor(Math.random() * 10) - 5),
      spacing: Math.min(100, baseAccuracy + Math.floor(Math.random() * 15) - 5),
      overall: baseAccuracy,
      suggestions: this.generateSuggestions(baseAccuracy)
    };
  }

  private generateSuggestions(accuracy: number): string[] {
    const allSuggestions = [
      'Focus on maintaining consistent character height',
      'Pay attention to proper stroke order',
      'Improve spacing between characters',
      'Practice individual characters before combining',
      'Slow down to ensure accuracy',
      'Use guidelines to maintain alignment',
      'Focus on smooth, flowing strokes',
      'Practice difficult characters separately'
    ];
    
    const count = accuracy < 80 ? 3 : accuracy < 90 ? 2 : 1;
    return allSuggestions.slice(0, count);
  }

  getAccuracyClass(accuracy: number): string {
    if (accuracy >= 90) return 'excellent';
    if (accuracy >= 80) return 'good';
    if (accuracy >= 70) return 'fair';
    return 'needs-improvement';
  }

  canProceed(): boolean {
    return this.writingFeedback?.overall ? this.writingFeedback.overall >= 70 : false;
  }

  nextExercise() {
    if (!this.canProceed()) return;

    this.currentExercise++;
    if (this.currentExercise > this.totalExercises) {
      this.completeWritingMode();
      return;
    }

    this.currentExerciseData = this.exercises[this.currentMode][this.currentExercise - 1];
    this.currentExerciseType = this.currentExerciseData.type;
    this.setCurrentInstruction();
    this.clearCanvas();
    this.writingFeedback = null;
    this.updateProgress();
  }

  private updateProgress() {
    const progress = (this.currentExercise / this.totalExercises) * 100;
    const categoryIndex = this.getWritingCategoryIndex();
    if (categoryIndex >= 0) {
      this.writingCategories[categoryIndex].progress = Math.floor(progress);
      if (progress >= 80) {
        this.writingCategories[categoryIndex].status = 'learning';
      }
    }
  }

  private getWritingCategoryIndex(): number {
    const categoryMap = {
      tracing: 0,
      copying: 1,
      composition: 2,
      manuscript: 3
    };
    return categoryMap[this.currentMode] || -1;
  }

  private completeWritingMode() {
    const categoryIndex = this.getWritingCategoryIndex();
    if (categoryIndex >= 0) {
      this.writingCategories[categoryIndex].progress = 100;
      this.writingCategories[categoryIndex].status = 'mastered';
    }

    this.isWriting = false;
    this.updateCompletionStats();
    this.saveProgress();
    this.showCompletionMessage();

    if (this.writingCategories.every(c => c.status === 'mastered')) {
      this.isCompleted = true;
      this.saveProgress();
    }
  }

  private updateCompletionStats() {
    this.completionStats.exercisesCompleted += this.totalExercises;
    this.completionStats.charactersWritten += this.totalExercises * 5; // Estimate
    this.completionStats.accuracy = Math.floor(
      this.writingCategories.reduce((sum, c) => sum + c.progress, 0) / this.writingCategories.length
    );
    
    if (this.currentMode === 'manuscript') {
      this.completionStats.manuscriptsCreated += 1;
    }
  }

  private async showCompletionMessage() {
    const toast = await this.toastController.create({
      message: `${this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1)} practice completed!`,
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
      case 'character': return 'finger-print';
      case 'word': return 'copy';
      case 'phrase': return 'create';
      case 'verse': return 'document-text';
      default: return 'create';
    }
  }

  // Navigation methods
  proceedToNextTechnique() {
    this.router.navigate(['/smarana']);
  }

  reviewWriting() {
    this.isCompleted = false;
    this.isWriting = false;
  }

  viewManuscripts() {
    this.showToast('Manuscript gallery feature coming soon!');
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
