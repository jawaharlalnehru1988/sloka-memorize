import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSpinner
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaChapterResponse, BhagavadGitaChapterItem } from './bhagavad-gita.service';
import { book, close, chevronDown, play, bookmark, image } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

export interface CardContent {
  audioSrc: string;
  buttonText: string;
  content: string;
  image: string;
  sectionToRedirect: string;
  title: string;
  orderNo: number;
}

@Component({
  selector: 'app-bhagavad-gita',
  templateUrl: './bhagavad-gita.page.html',
  styleUrls: ['./bhagavad-gita.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonSpinner,
    CommonModule,
    FormsModule,
    TechniqueHeaderComponent
]
})
export class BhagavadGitaPage implements OnInit {
  cardContents: CardContent[] = [];
  loading: boolean = true;

  constructor(
    private bhagavadGitaService: BhagavadGitaService,
    private router: Router
  ) {
    addIcons({book});
  }

  ngOnInit() {
    this.loadChapterData();
  }

  private loadChapterData(): void {
    console.log('🔄 Loading Bhagavad Gita chapter data...');
    this.loading = true;
    
    // Use cached data if available, otherwise fetch from API
    this.bhagavadGitaService.getBgChaptersByCategory('tamil').subscribe({
      next: (response) => {
        console.log('=== BHAGAVAD GITA CHAPTERS ===');
        console.log('✅ Chapter data received:', response);
        
        // Extract card items from the response and add to cardContents
        if (response && response.length > 0) {
          const chapterCards: CardContent[] = response[0].cardItems.map((item: BhagavadGitaChapterItem) => ({
            title: item.title,
            content: item.desc || 'Chapter from Bhagavad Gita',
            image: item.img,
            buttonText: 'Start Learning',
            sectionToRedirect: `bhagavad-gita-chapter-${item.category}`,
            audioSrc: item.audioData.audioSrc,
            orderNo: parseInt(item.category, 10) // Convert string to number
          }));

          // Sort chapter cards by orderNo in ascending order
          chapterCards.sort((a, b) => a.orderNo - b.orderNo);

          // Add sorted chapter cards to the existing cardContents
          this.cardContents = [...this.cardContents, ...chapterCards];
          
          console.log('📚 Updated cardContents:', this.cardContents);
        }
      },
      error: (error) => {
        console.error('❌ Error fetching Bhagavad Gita chapters:', error);
        this.loading = false;
      },
      complete: () => {
        console.log('✅ Bhagavad Gita chapters loading completed');
        this.loading = false;
      }
    });
  }

  navigateToSection(section: string): void {
    console.log(`Navigating to section: ${section}`);
    // For now, just log the navigation. Later you can implement actual routing
    // this.router.navigate([`/${section}`]);
  }

  navigateToChapter(section: string): void {
    console.log(`Navigating to chapter: ${section}`);
    
    if (section.startsWith('bhagavad-gita-chapter-')) {
      // Extract chapter number from section string
      const chapterNumber = section.replace('bhagavad-gita-chapter-', '');
      console.log(`Extracted chapter number: ${chapterNumber}`);
      
      // Navigate to chapter detail page
      this.router.navigate(['/bhagavad-gita-chapter', chapterNumber]);
    } else {
      // For other sections, you could navigate to different pages or handle differently
      console.log('Non-chapter section clicked:', section);
    }
  }



}
