import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
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
    private router: Router,
    private meta: Meta,
    private titleService: Title
  ) {
    addIcons({book});
  }

  ngOnInit() {
    this.setupMetaTags();
    this.loadChapterData();
  }

  private setupMetaTags(): void {
    // Set page title
    const pageTitle = 'Bhagavad Gita - Tamil Audio with Meanings';
    this.titleService.setTitle(pageTitle);

    // Set Open Graph meta tags for social media sharing
    const lordKrishnaImageUrl = 'https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg';
    const description = 'Listen to all 18 chapters of Bhagavad Gita in Tamil with detailed meanings. Experience the divine teachings of Lord Krishna through audio recitation and spiritual learning.';
    
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: lordKrishnaImageUrl });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: window.location.href });
    
    // Twitter Card meta tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: lordKrishnaImageUrl });
    
    // WhatsApp and social media specific meta tags
    this.meta.updateTag({ property: 'og:site_name', content: 'Hare Krishna Sloka' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_US' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'Lord Krishna - Bhagavad Gita Tamil' });
    
    console.log('✅ Meta tags set up for Bhagavad Gita main page with Lord Krishna image');
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
