import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonButton,
  IonIcon,
  IonText,
  IonSpinner,
  IonBackButton,
  IonButtons
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaChapterItem } from '../bhagavad-gita/bhagavad-gita.service';
import { play, arrowBack } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-bhagavad-gita-chapter',
  templateUrl: './bhagavad-gita-chapter.page.html',
  styleUrls: ['./bhagavad-gita-chapter.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonButton,
    IonIcon,
    IonText,
    IonSpinner,
    IonBackButton,
    IonButtons,
    CommonModule, 
    FormsModule
  ]
})
export class BhagavadGitaChapterPage implements OnInit {
  chapterData: BhagavadGitaChapterItem | null = null;
  chapterNumber: string = '';
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService
  ) {
    addIcons({ play, arrowBack });
  }

  ngOnInit() {
    // Get chapter number from route parameters
    this.chapterNumber = this.route.snapshot.paramMap.get('chapterNumber') || '';
    console.log('Loading chapter:', this.chapterNumber);
    
    if (this.chapterNumber) {
      this.loadChapterData();
    } else {
      this.error = 'Chapter number not provided';
      this.loading = false;
    }
  }

  private loadChapterData(): void {
    console.log('Loading Bhagavad Gita chapter data...');
    
    this.bhagavadGitaService.getBgChaptersByCategory('tamil').subscribe({
      next: (response) => {
        console.log('Chapter data received:', response);
        
        if (response && response.length > 0) {
          // Find the specific chapter
          const chapter = response[0].cardItems.find(
            (item: BhagavadGitaChapterItem) => item.category === this.chapterNumber
          );
          
          if (chapter) {
            this.chapterData = chapter;
            console.log('Found chapter:', this.chapterData);
          } else {
            this.error = `Chapter ${this.chapterNumber} not found`;
          }
        } else {
          this.error = 'No chapter data available';
        }
        
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error fetching chapter data:', error);
        this.error = 'Failed to load chapter data';
        this.loading = false;
      }
    });
  }

  playAudio(audioUrl: string): void {
    console.log(`Playing audio: ${audioUrl}`);
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  goBack(): void {
    this.router.navigate(['/bhagavad-gita']);
  }
}
