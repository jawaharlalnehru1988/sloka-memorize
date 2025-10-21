import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonCard, IonCardContent,
  IonCardHeader, IonCardTitle, IonButton, IonIcon,
  IonSearchbar, IonChip, IonLabel, IonBadge, IonFab, IonFabButton,
  ModalController
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { 
  calculator, search, apps, book, fitness, bulb, leaf, heart, shield,
  text, trendingUp, eye, volumeHigh, refresh, add, informationCircle,
  arrowForward, calculatorOutline, calculatorSharp
} from 'ionicons/icons';
import { NumberToVerse, VerseReference, ChapterCategory } from './number-to-verse';
import { TechniqueHeaderComponent } from '../shared/components/technique-header/technique-header.component';
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'app-number-to-verse-technique',
  templateUrl: './number-to-verse-technique.page.html',
  styleUrls: ['./number-to-verse-technique.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle, IonButton, IonIcon,
    IonSearchbar, IonChip, IonLabel, IonBadge, IonFab, IonFabButton,
    CommonModule, FormsModule, TechniqueHeaderComponent
  ]
})
export class NumberToVerseTechniquePage implements OnInit {
  private verseService = inject(NumberToVerse);
  private router = inject(Router);
  private modalController = inject(ModalController);
  private seoService = inject(SeoService);

  allVerses: VerseReference[] = [];
  filteredVerses: VerseReference[] = [];
  chapters: ChapterCategory[] = [];
  searchTerm: string = '';
  selectedChapter: number | null = null;
  isLoading: boolean = true;

  // Stats
  totalVerses: number = 0;
  totalChapters: number = 0;

  constructor() {
    // Register icons
    addIcons({
      calculator,
      search,
      apps,
      book,
      fitness,
      bulb,
      leaf,
      heart,
      shield,
      text,
      trendingUp,
      eye,
      volumeHigh,
      refresh,
      add,
      informationCircle,
      arrowForward,
      calculatorOutline,
      calculatorSharp
    });
  }

  ngOnInit() {
    // SEO optimization
    this.seoService.updateSEO({
      title: 'Number to Verse - Reference-Based Learning | Bhagavad Gita Memory Training',
      description: 'Master verse recall by chapter and verse number. Train your memory to instantly recall Sanskrit slokas from Bhagavad Gita using verse references like BG 2.47, BG 18.66.',
      keywords: 'verse number to sloka, BG verse reference, Sanskrit verse recall, Bhagavad Gita numbers, chapter verse memory, reference-based learning, verse lookup training, sloka number memorization, Gita verse index',
      author: 'Hare Krishna Sloka'
    });

    // Add Course structured data
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Number to Verse - Reference-Based Bhagavad Gita Learning",
      "description": "Learn to recall Sanskrit slokas using chapter and verse numbers",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka",
        "sameAs": "https://askharekrishna.com"
      },
      "educationalLevel": "Beginner to Advanced",
      "inLanguage": ["en", "sa", "hi"],
      "coursePrerequisites": "Basic familiarity with Bhagavad Gita"
    });

    // Add Breadcrumb structured data
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://askharekrishna.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Learning Techniques",
          "item": "https://askharekrishna.com/techniques"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Number to Verse",
          "item": "https://askharekrishna.com/number-to-verse-technique"
        }
      ]
    });

    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    // Load verses
    this.verseService.getAllVerses().subscribe(verses => {
      this.allVerses = verses;
      this.filteredVerses = verses;
      this.totalVerses = verses.length;
      this.isLoading = false;
    });

    // Load chapters
    this.verseService.getChapters().subscribe(chapters => {
      this.chapters = chapters;
      this.totalChapters = chapters.length;
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.verseService.searchVerses(this.searchTerm).subscribe(verses => {
        this.filteredVerses = verses;
        if (this.selectedChapter !== null) {
          this.filteredVerses = this.filteredVerses.filter(v => v.chapter === this.selectedChapter);
        }
      });
    } else {
      this.applyFilters();
    }
  }

  filterByChapter(chapter: number | null) {
    this.selectedChapter = chapter;
    this.applyFilters();
  }

  applyFilters() {
    if (this.selectedChapter === null) {
      this.filteredVerses = this.allVerses;
    } else {
      this.verseService.getVersesByChapter(this.selectedChapter).subscribe(verses => {
        this.filteredVerses = verses;
      });
    }

    // Apply search filter if search term exists
    if (this.searchTerm.trim()) {
      this.onSearch();
    }
  }

  openVerse(id: number) {
    this.router.navigate(['/number-to-verse-technique', id]);
  }

  getChapterIcon(chapter: number): string {
    const chapterData = this.chapters.find(c => c.chapter === chapter);
    return chapterData?.icon || 'book';
  }

  getChapterColor(chapter: number): string {
    const chapterData = this.chapters.find(c => c.chapter === chapter);
    return chapterData?.color || '#9C27B0';
  }

  getFirstWordsPreview(text: string): string {
    return text.length > 40 ? text.substring(0, 40) + '...' : text;
  }

  openAddVerseModal() {
    // Future: Open modal to add custom verses
    console.log('Add custom verse modal');
  }

}
