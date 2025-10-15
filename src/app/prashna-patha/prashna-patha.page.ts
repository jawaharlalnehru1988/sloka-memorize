import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SeoService } from '../shared/services/seo.service';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
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
  helpCircleOutline, 
  bookOutline, 
  heartOutline,
  helpCircle,
  book,
  headset,
  sparkles,
  appsOutline,
  briefcaseOutline,
  alertCircleOutline,
  flameOutline,
  heartDislikeOutline,
  peopleOutline,
  rocketOutline,
  leafOutline,
  scaleOutline,
  infiniteOutline,
  addCircleOutline,
  searchOutline,
  arrowForwardOutline,
  personOutline,
  cellularOutline,
  add,
  heart
} from 'ionicons/icons';
import { TechniqueHeaderComponent } from '../shared/components/technique-header/technique-header.component';
import { PrashnaPatha, LifeQuestion, QuestionCategory } from './prashna-patha';

@Component({
  selector: 'app-prashna-patha',
  templateUrl: './prashna-patha.page.html',
  styleUrls: ['./prashna-patha.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
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
export class PrashnaPathaPage implements OnInit {
  private prashnaService = inject(PrashnaPatha);
  private router = inject(Router);
  private modalController = inject(ModalController);
  private seoService = inject(SeoService);

  // Data properties
  allQuestions: LifeQuestion[] = [];
  filteredQuestions: LifeQuestion[] = [];
  categories: QuestionCategory[] = [];
  
  // UI state
  searchTerm: string = '';
  selectedCategory: string = '';
  isLoading: boolean = true;
  
  // Computed properties
  totalQuestions: number = 0;
  totalSlokas: number = 0;

  constructor() {
    // Register icons
    addIcons({
      helpCircleOutline,
      bookOutline,
      heartOutline,
      helpCircle,
      book,
      headset,
      sparkles,
      appsOutline,
      briefcaseOutline,
      alertCircleOutline,
      flameOutline,
      heartDislikeOutline,
      peopleOutline,
      rocketOutline,
      leafOutline,
      scaleOutline,
      infiniteOutline,
      addCircleOutline,
      searchOutline,
      arrowForwardOutline,
      personOutline,
      cellularOutline,
      add,
      heart
    });
  }

  ngOnInit() {
    // SEO optimization
    this.seoService.updateSEO({
      title: 'Prashna Pāṭha - Question-Based Learning | Bhagavad Gita Answers',
      description: 'Find Bhagavad Gita answers to your life questions. Discover slokas that address career challenges, fear, anger, relationships, confusion, and self-realization. Learn through emotional connection and practical wisdom.',
      keywords: 'question based learning, life situation Bhagavad Gita, practical spirituality, contextual learning, Gita answers to life questions, spiritual guidance, question answer format, life challenges Krishna wisdom, emotional learning, personalized scripture study',
      author: 'Hare Krishna Sloka'
    });

    // Add Course structured data
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Prashna Pāṭha - Question-Based Bhagavad Gita Learning",
      "description": "Find Bhagavad Gita answers to your personal life questions through contextual and emotional learning",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka",
        "sameAs": "https://askharekrishna.com"
      },
      "educationalLevel": "Beginner to Advanced",
      "inLanguage": ["en", "sa"],
      "coursePrerequisites": "None",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online",
        "courseWorkload": "PT15M"
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
        "name": "Prashna Pāṭha",
        "item": "https://askharekrishna.com/prashna-patha"
      }]
    });

    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // Load categories
    this.prashnaService.getCategories().subscribe(categories => {
      this.categories = categories;
    });

    // Load all questions
    this.prashnaService.getAllQuestions().subscribe(questions => {
      this.allQuestions = questions;
      this.filteredQuestions = questions;
      this.totalQuestions = questions.length;
      
      // Calculate total slokas
      this.totalSlokas = questions.reduce((sum, q) => sum + q.relatedSlokas.length, 0);
      
      this.isLoading = false;
    });
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.applyFilters();
    } else {
      this.prashnaService.searchQuestions(this.searchTerm).subscribe(results => {
        this.filteredQuestions = this.selectedCategory 
          ? results.filter(q => q.category === this.selectedCategory)
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
      this.filteredQuestions = this.allQuestions;
    } else {
      this.prashnaService.getQuestionsByCategory(this.selectedCategory).subscribe(questions => {
        this.filteredQuestions = questions;
      });
    }
  }

  openQuestion(id: number) {
    this.router.navigate(['/prashna-patha', id]);
  }

  getCategoryIcon(category: string): string {
    const iconMap: Record<string, string> = {
      'Career': 'briefcase-outline',
      'Fear': 'alert-circle-outline',
      'Anger': 'flame-outline',
      'Loss': 'heart-dislike-outline',
      'Confusion': 'help-circle-outline',
      'Relationships': 'people-outline',
      'Motivation': 'rocket-outline',
      'Peace': 'leaf-outline',
      'Justice': 'scale-outline',
      'Self-Realization': 'infinite-outline'
    };
    return iconMap[category] || 'help-circle-outline';
  }

  async openAddQuestionModal() {
    // TODO: Implement modal for adding custom questions
    // For now, show a simple alert
    alert('Add Your Question feature coming soon! This will allow you to add your personal life questions and connect them with Bhagavad Gītā slokas.');
  }

}
