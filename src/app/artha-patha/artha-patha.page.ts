import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from '../shared/services/seo.service';
import { 
  IonContent, 
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
  IonChip,
  IonLabel,
  IonSpinner,
  IonFab,
  IonFabButton,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  bookOutline,
  textOutline,
  trendingUpOutline,
  eyeOutline,
  volumeHighOutline,
  refreshOutline,
  searchOutline,
  appsOutline,
  fitnessOutline,
  heartOutline,
  bulbOutline,
  shieldOutline,
  leafOutline,
  infiniteOutline,
  arrowForwardOutline,
  addOutline,
  informationCircleOutline,
  book,
  add
} from 'ionicons/icons';
import { TechniqueHeaderComponent } from '../shared/components/technique-header/technique-header.component';
import { ArthaPatha, MeaningToSloka, SlokaCategory } from './artha-patha';

@Component({
  selector: 'app-artha-patha',
  templateUrl: './artha-patha.page.html',
  styleUrls: ['./artha-patha.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonIcon,
    IonChip,
    IonLabel,
    IonSpinner,
    IonFab,
    IonFabButton,
    CommonModule, 
    FormsModule,
    TechniqueHeaderComponent
  ]
})
export class ArthaPathaPage implements OnInit {
  private arthaService = inject(ArthaPatha);
  private router = inject(Router);
  private modalController = inject(ModalController);
  private seoService = inject(SeoService);

  // Data properties
  allMeanings: MeaningToSloka[] = [];
  filteredMeanings: MeaningToSloka[] = [];
  categories: SlokaCategory[] = [];
  
  // UI state
  searchTerm: string = '';
  selectedCategory: string = '';
  isLoading: boolean = true;
  
  // Computed properties
  totalMeanings: number = 0;
  totalCategories: number = 0;

  constructor() {
    // Register icons
    addIcons({
      bookOutline,
      textOutline,
      trendingUpOutline,
      eyeOutline,
      volumeHighOutline,
      refreshOutline,
      searchOutline,
      appsOutline,
      fitnessOutline,
      heartOutline,
      bulbOutline,
      shieldOutline,
      leafOutline,
      infiniteOutline,
      arrowForwardOutline,
      addOutline,
      informationCircleOutline,
      book,
      add
    });
  }

  ngOnInit() {
    // SEO optimization
    this.seoService.updateSEO({
      title: 'Artha-pāṭha - Meaning to Sloka Learning | Master Sanskrit Through Translations',
      description: 'Learn Sanskrit slokas by starting with meanings you already know and love. Artha-pāṭha progressively reveals the beautiful verses of Bhagavad Gītā, creating deep connection through reverse learning approach.',
      keywords: 'meaning to sloka, reverse learning Sanskrit, Sanskrit through translation, learn Devanagari, Bhagavad Gita meanings, progressive sloka reveal, Sanskrit memorization, translation to verse, contextual Sanskrit learning, emotional Sanskrit connection',
      author: 'Hare Krishna Sloka'
    });

    // Add Course structured data
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Artha-pāṭha - Meaning to Sloka Sanskrit Learning",
      "description": "Master Sanskrit slokas by starting with meanings you already understand, progressively revealing the original verses",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka",
        "sameAs": "https://askharekrishna.com"
      },
      "educationalLevel": "Beginner to Advanced",
      "inLanguage": ["en", "sa", "hi"],
      "coursePrerequisites": "Basic understanding of Bhagavad Gītā meanings",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT10M"
      }
    });

    // Add breadcrumb structured data
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://askharekrishna.com/home"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "Artha-pāṭha",
        "item": "https://askharekrishna.com/artha-patha"
      }]
    });

    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // Load categories
    this.arthaService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.totalCategories = categories.length;
    });

    // Load all meanings
    this.arthaService.getAllMeanings().subscribe(meanings => {
      this.allMeanings = meanings;
      this.filteredMeanings = meanings;
      this.totalMeanings = meanings.length;
      this.isLoading = false;
    });
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.applyFilters();
    } else {
      this.arthaService.searchMeanings(this.searchTerm).subscribe(results => {
        this.filteredMeanings = this.selectedCategory 
          ? results.filter(m => m.category === this.selectedCategory)
          : results;
      });
    }
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedCategory === '') {
      this.filteredMeanings = this.allMeanings;
    } else {
      this.arthaService.getMeaningsByCategory(this.selectedCategory).subscribe(meanings => {
        this.filteredMeanings = meanings;
      });
    }
  }

  openMeaning(id: number) {
    this.router.navigate(['/artha-patha', id]);
  }

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Karma Yoga': 'fitness-outline',
      'Bhakti Yoga': 'heart-outline',
      'Jnana Yoga': 'bulb-outline',
      'Dharma': 'shield-outline',
      'Detachment': 'leaf-outline',
      'Self-Realization': 'infinite-outline'
    };
    return iconMap[category] || 'book-outline';
  }

  getCategoryColor(category: string): string {
    const colorMap: Record<string, string> = {
      'Karma Yoga': '#FF6B6B',
      'Bhakti Yoga': '#4ECDC4',
      'Jnana Yoga': '#95E1D3',
      'Dharma': '#F38181',
      'Detachment': '#AA96DA',
      'Self-Realization': '#FCBAD3'
    };
    return colorMap[category] || '#FFD93D';
  }

  getMeaningPreview(text: string): string {
    const maxLength = 150;
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  async openAddMeaningModal() {
    // TODO: Implement modal for adding custom meanings
    alert('Add Your Meaning feature coming soon! This will allow you to add your favorite Bhagavad Gītā translations and learn their Sanskrit slokas.');
  }
}
