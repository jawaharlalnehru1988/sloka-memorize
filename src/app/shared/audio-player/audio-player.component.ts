import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonButton,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { play, pause, download, speedometer, share, repeat } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    IonText
  ]
})
export class AudioPlayerComponent implements OnDestroy, OnChanges, AfterViewInit {
  @ViewChild('circularCanvas', { static: false }) circularCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('spectrumCanvas', { static: false }) spectrumCanvas!: ElementRef<HTMLCanvasElement>;
  
  @Input() audioUrl: string = '';
  @Input() audioTitle: string = 'Audio';
  @Input() enableDownload: boolean = true;
  @Input() enableShare: boolean = true;
  @Input() enableSpeedControl: boolean = true;
  @Input() enableLoop: boolean = true;
  @Input() autoLoadMetadata: boolean = true;
  
  @Output() onPlay = new EventEmitter<void>();
  @Output() onPause = new EventEmitter<void>();
  @Output() onTimeUpdate = new EventEmitter<{ currentTime: number, duration: number, progress: number }>();
  @Output() onDownload = new EventEmitter<string>();
  @Output() onShare = new EventEmitter<void>();
  @Output() onLoopToggle = new EventEmitter<boolean>();
  
  // Audio control properties
  currentAudio: HTMLAudioElement | null = null;
  isPlaying: boolean = false;
  isLooping: boolean = false;
  currentTime: number = 0;
  duration: number = 0;
  progress: number = 0;
  playbackSpeed: number = 1;
  availableSpeeds: number[] = [0.5, 0.75, 1, 1.25, 1.5, 2];
  
  // Web Audio API properties for visualization
  audioContext: AudioContext | null = null;
  analyser: AnalyserNode | null = null;
  dataArray: Uint8Array | null = null;
  source: MediaElementAudioSourceNode | null = null;
  
  // Visualization properties
  beatDetected: boolean = false;
  frequencyBars: number[] = Array(20).fill(0);
  circularCtx: CanvasRenderingContext2D | null = null;
  spectrumCtx: CanvasRenderingContext2D | null = null;
  animationFrame: number | null = null;
  
  // Performance optimization properties
  private lastFrameTime: number = 0;
  private frameRate: number = 30; // Reduced from 60fps to 30fps for better performance
  private frameInterval: number = 1000 / this.frameRate;
  
  // Debug flag to disable Web Audio for testing
  disableWebAudio: boolean = false;
  
  // Beat detection properties
  private beatThreshold: number = 180;
  private beatDecay: number = 0.98;
  private beatMin: number = 0.15;
  private lastBeatTime: number = 0;
  
  // Touch/drag support for progress bar
  private isDragging: boolean = false;
  private progressContainer: HTMLElement | null = null;

  constructor() {
    addIcons({
      play,
      pause,
      download,
      speedometer,
      share,
      repeat
    });
  }

  ngAfterViewInit(): void {
    // Initialize canvas contexts
    setTimeout(() => {
      this.initializeVisualization();
    }, 100);
  }

  private initializeVisualization(): void {
    if (this.circularCanvas?.nativeElement) {
      this.circularCtx = this.circularCanvas.nativeElement.getContext('2d');
    }
    
    if (this.spectrumCanvas?.nativeElement) {
      this.spectrumCtx = this.spectrumCanvas.nativeElement.getContext('2d');
    }
    
    // Setup Web Audio API for real-time analysis
    this.setupWebAudio();
    
    // Start animation loop (will show static visualization without Web Audio)
    this.startVisualization();
  }

  private setupWebAudio(): void {
    if (!this.currentAudio) {
      console.log('No audio element available for Web Audio setup');
      return;
    }
    
    // Clean up any existing Web Audio setup first
    this.cleanupWebAudio();
    
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create analyser node
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.8;
      
      // Create data array for frequency data
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(new ArrayBuffer(bufferLength));
      
      // Connect audio element to analyser and speakers
      this.source = this.audioContext.createMediaElementSource(this.currentAudio);
      
      // Create gain node for volume control (optional)
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 1.0; // Full volume
      
      // Connect: source -> analyser -> gain -> destination (speakers)
      this.source.connect(this.analyser);
      this.analyser.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      // Also connect source directly to destination for backup audio path
      this.source.connect(this.audioContext.destination);
      
      setTimeout(() => {
        if (this.currentAudio && !this.currentAudio.paused && this.analyser && this.dataArray) {
          // Test if we're getting real audio data
          (this.analyser as any).getByteFrequencyData(this.dataArray);
          const hasAudioData = Array.from(this.dataArray).some(value => value > 0);
          
          if (!hasAudioData) {
            console.warn('⚠️ No audio data detected - visualization will show static animation only');
          }
        }
      }, 2000);
    } catch (error: any) {
      console.error('Error setting up Web Audio API:', error);
      
      if (error.name === 'InvalidStateError' || error.message.includes('CORS')) {
        console.warn('CORS issue detected. Web Audio API cannot access external audio source.');
        console.info('To fix this, the audio server needs to include CORS headers: Access-Control-Allow-Origin: *');
      }
      
      console.warn('Falling back to normal audio playback without real-time visualization');
      // If Web Audio setup fails, at least ensure normal audio playback
      this.cleanupWebAudio();
      
      // Set flag to use static visualization only
      this.disableWebAudio = true;
    }
  }

  private cleanupWebAudio(): void {
    try {
      if (this.source) {
        this.source.disconnect();
        this.source = null;
      }
      
      if (this.analyser) {
        this.analyser.disconnect();
        this.analyser = null;
      }
      
      if (this.audioContext && this.audioContext.state !== 'closed') {
        this.audioContext.close();
      }
      this.audioContext = null;
      
      // Reset data array
      this.dataArray = null;
      
    } catch (error) {
      console.error('Error cleaning up Web Audio API:', error);
    }
  }

  private startVisualization(): void {
    const animate = (currentTime: number) => {
      // Throttle frame rate for better performance
      if (currentTime - this.lastFrameTime < this.frameInterval) {
        this.animationFrame = requestAnimationFrame(animate);
        return;
      }
      this.lastFrameTime = currentTime;
      
      if (this.isPlaying && this.analyser && this.dataArray) {
        // Get frequency data
        (this.analyser as any).getByteFrequencyData(this.dataArray);
        
        // Update frequency bars for progress bar visualization
        this.updateFrequencyBars();
        
        // Detect beats
        this.detectBeat();
        
        // Draw circular visualization
        this.drawCircularVisualization();
        
        // Draw spectrum visualization
        this.drawSpectrumVisualization();
      } else {
        // Draw static visualizations when not playing (lower frame rate)
        if (currentTime - this.lastFrameTime > 100) { // 10fps for static
          this.drawStaticVisualization();
        }
      }
      
      this.animationFrame = requestAnimationFrame(animate);
    };
    
    animate(0);
  }

  private updateFrequencyBars(): void {
    if (!this.dataArray) return;
    
    const barCount = this.frequencyBars.length;
    const dataPerBar = Math.floor(this.dataArray.length / barCount);
    
    for (let i = 0; i < barCount; i++) {
      let sum = 0;
      for (let j = 0; j < dataPerBar; j++) {
        sum += this.dataArray[i * dataPerBar + j];
      }
      this.frequencyBars[i] = (sum / dataPerBar / 255) * 100;
    }
  }

  private detectBeat(): void {
    if (!this.dataArray) return;
    
    // Calculate average amplitude of lower frequencies (bass)
    let sum = 0;
    const bassEnd = Math.floor(this.dataArray.length * 0.1); // First 10% for bass
    
    for (let i = 0; i < bassEnd; i++) {
      sum += this.dataArray[i];
    }
    
    const average = sum / bassEnd;
    const now = Date.now();
    
    // Beat detection logic
    if (average > this.beatThreshold && (now - this.lastBeatTime) > 200) {
      this.beatDetected = true;
      this.lastBeatTime = now;
      
      // Reset beat detection after a short time
      setTimeout(() => {
        this.beatDetected = false;
      }, 150);
    }
    
    // Adjust threshold dynamically
    this.beatThreshold = Math.max(
      this.beatMin * 255,
      this.beatThreshold * this.beatDecay
    );
  }

  private drawCircularVisualization(): void {
    if (!this.circularCtx) return;
    
    const canvas = this.circularCanvas.nativeElement;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 70; // Slightly smaller to fit better
    
    // Clear canvas
    this.circularCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw outer circle with rainbow effect
    this.circularCtx.beginPath();
    this.circularCtx.arc(centerX, centerY, radius + 15, 0, 2 * Math.PI);
    const gradient = this.circularCtx.createConicGradient(0, centerX, centerY);
    gradient.addColorStop(0, '#ff5722');
    gradient.addColorStop(0.16, '#ff9800');
    gradient.addColorStop(0.33, '#4caf50');
    gradient.addColorStop(0.5, '#2196f3');
    gradient.addColorStop(0.66, '#9c27b0');
    gradient.addColorStop(0.83, '#e91e63');
    gradient.addColorStop(1, '#ff5722');
    this.circularCtx.strokeStyle = gradient;
    this.circularCtx.lineWidth = 4;
    this.circularCtx.stroke();
    
    // Draw frequency bars in circular pattern
    const bars = 48; // More bars for smoother effect
    const angleStep = (2 * Math.PI) / bars;
    
    if (this.dataArray && this.isPlaying) {
      // Real audio data visualization
      for (let i = 0; i < bars; i++) {
        const angle = i * angleStep;
        const freqIndex = Math.floor((i / bars) * this.dataArray.length);
        const amplitude = Math.max(this.dataArray[freqIndex] / 255, 0.1); // Minimum amplitude
        
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;
        const endX = centerX + Math.cos(angle) * (radius + amplitude * 40);
        const endY = centerY + Math.sin(angle) * (radius + amplitude * 40);
        
        this.circularCtx.beginPath();
        this.circularCtx.moveTo(startX, startY);
        this.circularCtx.lineTo(endX, endY);
        this.circularCtx.strokeStyle = `hsl(${(i * 7.5 + Date.now() * 0.2) % 360}, 85%, 65%)`;
        this.circularCtx.lineWidth = 3;
        this.circularCtx.stroke();
        
        // Add glow effect
        this.circularCtx.shadowColor = this.circularCtx.strokeStyle;
        this.circularCtx.shadowBlur = 8;
        this.circularCtx.stroke();
        this.circularCtx.shadowBlur = 0;
      }
    } else {
      // Static/demo visualization when not playing
      for (let i = 0; i < bars; i++) {
        const angle = i * angleStep;
        const amplitude = Math.sin(Date.now() * 0.003 + i * 0.3) * 0.3 + 0.2;
        
        const startX = centerX + Math.cos(angle) * radius;
        const startY = centerY + Math.sin(angle) * radius;
        const endX = centerX + Math.cos(angle) * (radius + amplitude * 25);
        const endY = centerY + Math.sin(angle) * (radius + amplitude * 25);
        
        this.circularCtx.beginPath();
        this.circularCtx.moveTo(startX, startY);
        this.circularCtx.lineTo(endX, endY);
        this.circularCtx.strokeStyle = `hsla(${(i * 7.5 + Date.now() * 0.1) % 360}, 70%, 55%, 0.7)`;
        this.circularCtx.lineWidth = 2;
        this.circularCtx.stroke();
      }
    }
  }

  private drawSpectrumVisualization(): void {
    if (!this.spectrumCtx) return;
    
    const canvas = this.spectrumCanvas.nativeElement;
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    this.spectrumCtx.clearRect(0, 0, width, height);
    
    // Draw spectrum bars
    const bars = 32; // Reduced for better visibility
    const barWidth = (width / bars) - 2; // Add spacing between bars
    
    // Debug logging - only log occasionally to avoid spam
    if (Math.random() < 0.01) { // Log ~1% of the time
      console.log('Spectrum Debug:', {
        hasDataArray: !!this.dataArray,
        isPlaying: this.isPlaying,
        dataArrayLength: this.dataArray?.length,
        firstFewValues: this.dataArray?.slice(0, 5),
        hasSpectrumCtx: !!this.spectrumCtx
      });
    }
    
    if (this.dataArray && this.isPlaying) {
      // Real audio data visualization
      for (let i = 0; i < bars; i++) {
        const freqIndex = Math.floor((i / bars) * this.dataArray.length);
        const amplitude = this.dataArray[freqIndex] / 255;
        const barHeight = Math.max(amplitude * height, 2); // Minimum height of 2px
        
        const hue = (i * 11 + Date.now() * 0.1) % 360;
        this.spectrumCtx.fillStyle = `hsl(${hue}, 85%, 65%)`;
        this.spectrumCtx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
        
        // Add glow effect
        this.spectrumCtx.shadowColor = `hsl(${hue}, 85%, 65%)`;
        this.spectrumCtx.shadowBlur = 10;
        this.spectrumCtx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
        this.spectrumCtx.shadowBlur = 0;
      }
    } else {
      // Static/demo visualization when not playing
      for (let i = 0; i < bars; i++) {
        const amplitude = Math.sin(Date.now() * 0.005 + i * 0.5) * 0.3 + 0.1;
        const barHeight = amplitude * height;
        
        const hue = (i * 11 + Date.now() * 0.1) % 360;
        this.spectrumCtx.fillStyle = `hsla(${hue}, 60%, 50%, 0.6)`;
        this.spectrumCtx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
      }
    }
  }

  private drawStaticVisualization(): void {
    // Draw static circular visualization
    if (this.circularCtx) {
      const canvas = this.circularCanvas.nativeElement;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      this.circularCtx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw animated static circle with gradient
      this.circularCtx.beginPath();
      this.circularCtx.arc(centerX, centerY, 70, 0, 2 * Math.PI);
      
      // Create gradient that rotates
      const gradient = this.circularCtx.createConicGradient(Date.now() * 0.001, centerX, centerY);
      gradient.addColorStop(0, 'rgba(255, 87, 34, 0.6)');
      gradient.addColorStop(0.25, 'rgba(255, 152, 0, 0.6)');
      gradient.addColorStop(0.5, 'rgba(76, 175, 80, 0.6)');
      gradient.addColorStop(0.75, 'rgba(33, 150, 243, 0.6)');
      gradient.addColorStop(1, 'rgba(255, 87, 34, 0.6)');
      
      this.circularCtx.strokeStyle = gradient;
      this.circularCtx.lineWidth = 3;
      this.circularCtx.stroke();
      
      // Add pulsing inner circle
      const pulseRadius = 40 + Math.sin(Date.now() * 0.005) * 5;
      this.circularCtx.beginPath();
      this.circularCtx.arc(centerX, centerY, pulseRadius, 0, 2 * Math.PI);
      this.circularCtx.strokeStyle = 'rgba(255, 152, 0, 0.4)';
      this.circularCtx.lineWidth = 2;
      this.circularCtx.stroke();
    }
    
    // Draw static spectrum visualization
    if (this.spectrumCtx) {
      const canvas = this.spectrumCanvas.nativeElement;
      const width = canvas.width;
      const height = canvas.height;
      
      this.spectrumCtx.clearRect(0, 0, width, height);
      
      // Draw animated static bars
      const bars = 32;
      const barWidth = (width / bars) - 2;
      
      for (let i = 0; i < bars; i++) {
        const amplitude = Math.sin(Date.now() * 0.003 + i * 0.4) * 0.4 + 0.2;
        const barHeight = amplitude * height;
        
        const hue = (i * 11 + Date.now() * 0.05) % 360;
        this.spectrumCtx.fillStyle = `hsla(${hue}, 60%, 50%, 0.5)`;
        this.spectrumCtx.fillRect(i * (barWidth + 2), height - barHeight, barWidth, barHeight);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['audioUrl'] && changes['audioUrl'].currentValue) {
      // Clean up previous audio
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.src = '';
        this.currentAudio = null;
      }
      
      // Reset state
      this.isPlaying = false;
      this.isLooping = false;
      this.currentTime = 0;
      this.duration = 0;
      this.progress = 0;
      
      // Initialize new audio if autoLoadMetadata is enabled
      if (this.autoLoadMetadata) {
        this.initializeAudio(this.audioUrl);
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up visualization
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    // Clean up Web Audio API
    this.cleanupWebAudio();
    
    // Clean up audio
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.src = ''; // This will stop loading and cleanup
      this.currentAudio = null;
    }
    this.isPlaying = false;
  }

  playAudio(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      // If audio is currently playing, pause it
      this.pauseAudio();
    } else {
      // If no audio is playing or it's paused, start/resume playing
      this.resumeOrStartAudio();
    }
  }

  private resumeOrStartAudio(): void {
    // If audio is already initialized and just paused, resume it
    if (this.currentAudio && this.currentAudio.src.includes(this.audioUrl)) {
      this.currentAudio.play().then(() => {
        this.isPlaying = true;
        this.onPlay.emit();
        
        // Resume AudioContext if it's suspended (required by browsers)
        if (this.audioContext && this.audioContext.state === 'suspended') {
          this.audioContext.resume().then(() => {
            this.startVisualization();
          }).catch(error => {
            console.error('Failed to resume AudioContext on resume:', error);
            this.startVisualization();
          });
        } else {
          this.startVisualization();
        }
      }).catch(error => {
        console.error('Error resuming audio:', error);
        this.isPlaying = false;
      });
    } else {
      // If no audio or different audio, start fresh
      this.startAudio();
    }
  }

  private startAudio(): void {
    // Store current position if audio exists
    const savedTime = this.currentAudio ? this.currentAudio.currentTime : 0;
    
    // Only stop current audio if it's a different source
    if (this.currentAudio && !this.currentAudio.src.includes(this.audioUrl)) {
      this.stopCurrentAudio(true); // Reset time for different audio
    }
    
    // Initialize audio if not already done or if it's a different source
    if (!this.currentAudio || !this.currentAudio.src.includes(this.audioUrl)) {
      this.initializeAudio(this.audioUrl);
    }
    
    // Wait for metadata to be loaded before playing
    if (this.duration <= 0) {
      this.currentAudio!.addEventListener('loadedmetadata', () => {
        // Restore saved position if any
        if (savedTime > 0 && this.currentAudio) {
          this.currentAudio.currentTime = savedTime;
          this.currentTime = savedTime;
          this.progress = (savedTime / this.duration) * 100;
        }
        this.playLoadedAudio();
      }, { once: true });
    } else {
      // Restore saved position if any
      if (savedTime > 0 && this.currentAudio) {
        this.currentAudio.currentTime = savedTime;
        this.currentTime = savedTime;
        this.progress = (savedTime / this.duration) * 100;
      }
      this.playLoadedAudio();
    }
  }
  
  private playLoadedAudio(): void {
    if (!this.currentAudio) return;
    
    // Play the audio
    this.currentAudio.play().then(() => {
      this.isPlaying = true;
      this.onPlay.emit();
      
      // Resume AudioContext if it's suspended (required by browsers)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().then(() => {
            this.startVisualization();
        }).catch(error => {
          console.error('Failed to resume AudioContext:', error);
          this.startVisualization();
        });
      } else {
        this.startVisualization();
      }
    }).catch(error => {
      console.error('Error playing audio:', error);
      this.isPlaying = false;
    });
  }

  private pauseAudio(): void {
    if (this.currentAudio && !this.currentAudio.paused) {
      this.currentAudio.pause();
      this.isPlaying = false;
      this.onPause.emit();
      
      // Stop visualization animation
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = null;
      }
    }
  }

  private stopCurrentAudio(resetTime: boolean = true): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      if (resetTime) {
        this.currentAudio.currentTime = 0;
        this.progress = 0;
        this.currentTime = 0;
      }
      this.isPlaying = false;
      
      // Clean up Web Audio API when stopping for a different audio source
      if (resetTime) {
        this.cleanupWebAudio();
      }
    }
  }

  // Initialize audio without playing (for seeking when not yet started)
  private initializeAudio(audioUrl: string): void {
    if (this.currentAudio) return; // Already initialized
    
    
    // Create new audio instance
    this.currentAudio = new Audio(audioUrl);
    this.currentAudio.crossOrigin = 'anonymous'; // Enable CORS for Web Audio API
    this.currentAudio.preload = 'metadata'; // Load metadata immediately
    this.currentAudio.playbackRate = this.playbackSpeed;
    this.currentAudio.loop = this.isLooping; // Set loop based on current state
    
    // Set up event listeners
    this.currentAudio.addEventListener('loadedmetadata', () => {
      if (this.currentAudio) {
        this.duration = this.currentAudio.duration;
      }
    });
    
    this.currentAudio.addEventListener('timeupdate', () => {
      if (this.currentAudio) {
        this.currentTime = this.currentAudio.currentTime;
        this.progress = (this.currentTime / this.duration) * 100;
        this.onTimeUpdate.emit({
          currentTime: this.currentTime,
          duration: this.duration,
          progress: this.progress
        });
      }
    });
    
    this.currentAudio.addEventListener('ended', () => {
      this.isPlaying = false;
      if (this.isLooping) {
        // If looping is enabled, restart the audio
        this.currentTime = 0;
        this.progress = 0;
        if (this.currentAudio) {
          this.currentAudio.currentTime = 0;
          this.currentAudio.play().then(() => {
            this.isPlaying = true;
            this.onPlay.emit();
          }).catch(error => {
            console.error('Error restarting audio in loop mode:', error);
          });
        }
      } else {
        // Normal behavior - stop at the end
        this.progress = 0;
        this.currentTime = 0;
      }
    });
    
    this.currentAudio.addEventListener('error', (error) => {
      console.error('Error loading audio:', error);
    });
    
    // Force load metadata
    this.currentAudio.load();
  }

  // Progress bar handlers
  onProgressBarClick(event: any): void {
    if (this.isDragging) return; // Don't handle click if we're dragging
    this.seekToPosition(event);
  }
  
  // Touch event handlers for mobile devices
  onTouchStart(event: TouchEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.progressContainer = event.target as HTMLElement;
    this.addDraggingClass();
    this.seekToPosition(event);
  }
  
  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.seekToPosition(event);
  }
  
  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.isDragging = false;
    this.removeDraggingClass();
    this.progressContainer = null;
  }
  
  // Mouse event handlers for desktop devices
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging = true;
    this.progressContainer = event.target as HTMLElement;
    this.addDraggingClass();
    this.seekToPosition(event);
  }
  
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.seekToPosition(event);
  }
  
  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    event.preventDefault();
    this.isDragging = false;
    this.removeDraggingClass();
    this.progressContainer = null;
  }
  
  // Helper methods for visual feedback
  private addDraggingClass(): void {
    const container = document.querySelector('.audio-progress-container');
    if (container) {
      container.classList.add('dragging');
    }
  }
  
  private removeDraggingClass(): void {
    const container = document.querySelector('.audio-progress-container');
    if (container) {
      container.classList.remove('dragging');
    }
  }
  
  // Common seek function for both touch and mouse events
  private seekToPosition(event: TouchEvent | MouseEvent | any): void {
    // If no audio is loaded yet, create it first
    if (!this.currentAudio && this.audioUrl) {
      this.initializeAudio(this.audioUrl);
    }
    
    if (!this.currentAudio) return;
    
    // If duration is not available yet, wait for metadata to load
    if (this.duration <= 0) {
      this.currentAudio.addEventListener('loadedmetadata', () => {
        this.performSeek(event);
      }, { once: true });
      
      // Force load metadata if not already loading
      if (this.currentAudio.readyState === 0) {
        this.currentAudio.load();
      }
      return;
    }
    
    this.performSeek(event);
  }
  
  private performSeek(event: TouchEvent | MouseEvent | any): void {
    if (!this.currentAudio || this.duration <= 0) return;
    
    let clientX: number;
    
    // Get the appropriate clientX based on event type
    if (event.type.startsWith('touch')) {
      const touchEvent = event as TouchEvent;
      if (touchEvent.touches && touchEvent.touches.length > 0) {
        clientX = touchEvent.touches[0].clientX;
      } else if (touchEvent.changedTouches && touchEvent.changedTouches.length > 0) {
        clientX = touchEvent.changedTouches[0].clientX;
      } else {
        return;
      }
    } else {
      clientX = (event as MouseEvent).clientX || event.offsetX;
    }
    
    // Find the progress container element
    let progressElement = event.target as HTMLElement;
    while (progressElement && !progressElement.classList.contains('audio-progress-container')) {
      progressElement = progressElement.parentElement!;
    }
    
    if (!progressElement) return;
    
    const rect = progressElement.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const totalWidth = rect.width;
    const clickPercentage = Math.max(0, Math.min(1, clickX / totalWidth));
    const newTime = clickPercentage * this.duration;
    
    this.currentAudio.currentTime = newTime;
    this.currentTime = newTime;
    this.progress = clickPercentage * 100;
  }

  // Format time in MM:SS format
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // Change playback speed
  changePlaybackSpeed(): void {
    const currentIndex = this.availableSpeeds.indexOf(this.playbackSpeed);
    const nextIndex = (currentIndex + 1) % this.availableSpeeds.length;
    this.playbackSpeed = this.availableSpeeds[nextIndex];
    
    // Apply speed to current audio if playing
    if (this.currentAudio) {
      this.currentAudio.playbackRate = this.playbackSpeed;
    }
  }

  // Download audio file
  downloadAudio(): void {
    if (this.audioUrl) {
      this.onDownload.emit(this.audioUrl);
    }
  }

  // Share functionality
  shareAudio(): void {
    this.onShare.emit();
  }

  // Toggle loop functionality
  toggleLoop(): void {
    this.isLooping = !this.isLooping;
    
    // Apply loop setting to current audio if it exists
    if (this.currentAudio) {
      this.currentAudio.loop = this.isLooping;
    }
    
    this.onLoopToggle.emit(this.isLooping);
  }
}
