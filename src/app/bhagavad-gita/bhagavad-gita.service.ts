import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';

export interface BhagavadGitaSloka {
  _id: string;
  slokaNo: string;
  orderNo: number;
  slokaText: string;
  SlokaVoice: string;
  slokaMeaning: string;
  __v: number;
}

export interface BhagavadGitaChapterItem {
  img: string;
  title: string;
  category: string;
  desc: string;
  audioData: {
    audioSrc: string;
    imageSrc: string;
    auther: string;
    title: string;
    _id: string;
  };
  rating: string;
  action: string;
  _id: string;
}

export interface BhagavadGitaChapterResponse {
  categoryName: string;
  cardItems: BhagavadGitaChapterItem[];
}

@Injectable({
  providedIn: 'root'
})
export class BhagavadGitaService {
  private baseUrl = "https://dats-backend.vercel.app";
  
  // Cache for storing all chapter data (all languages at once)
  private allChaptersCache: BhagavadGitaChapterResponse[] | null = null;
  private slokaCache: BhagavadGitaSloka[] | null = null;
  
  // BehaviorSubjects for reactive state management
  private allChaptersSubject = new BehaviorSubject<BhagavadGitaChapterResponse[] | null>(null);
  private slokaDataSubject = new BehaviorSubject<BhagavadGitaSloka[] | null>(null);
  
  // Public observables for components to subscribe to
  public allChapters$ = this.allChaptersSubject.asObservable();
  public slokaData$ = this.slokaDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get all Bhagavad Gita slokas with caching
  getBgSlokas(): Observable<BhagavadGitaSloka[]> {
    // Return cached data if available
    if (this.slokaCache) {
      return of(this.slokaCache);
    }

    // Fetch from API if not cached
    const url = `${this.baseUrl}/bg-sloka`;
    
    return this.http.get<BhagavadGitaSloka[]>(url).pipe(
      tap((slokas) => {
        this.slokaCache = slokas;
        this.slokaDataSubject.next(slokas);
        console.log('✅ BG slokas cached successfully');
      }),
      shareReplay(1)
    );
  }

  getAllBgChapters(): Observable<BhagavadGitaChapterResponse[]> {
    if (this.allChaptersCache) {
      return of(this.allChaptersCache);
    }

    const url = `${this.baseUrl}/bg-sloka-chapters`;
    
    return this.http.get<BhagavadGitaChapterResponse[]>(url).pipe(
      tap((chapters) => {
        this.allChaptersCache = chapters;
        this.allChaptersSubject.next(chapters);
      }),
      shareReplay(1) // Share the same response with multiple subscribers
    );
  }

  // Get chapters filtered by language
  getChaptersByLanguage(language: string = 'tamil'): Observable<BhagavadGitaChapterResponse[]> {
    return this.getAllBgChapters().pipe(
      map((allChapters) => {
        const languageMap: { [key: string]: string } = {
          'tamil': 'Bhagavad Gita Tamil',
          'kannada': 'Bhagavad Gita Kannada',
          'sanskrit': 'Bhagavad Gita Sanskrit'
        };
        
        const targetCategoryName = languageMap[language] || 'Bhagavad Gita Tamil';
        
        const filteredChapters = allChapters.filter(chapter => 
          chapter.categoryName === targetCategoryName
        );

        return filteredChapters;
      })
    );
  }

  // Get available languages from cached data
  getAvailableLanguages(): string[] {
    if (!this.allChaptersCache) {
      return ['tamil', 'kannada', 'sanskrit']; // Default fallback
    }
    
    const languageMap: { [key: string]: string } = {
      'Bhagavad Gita Tamil': 'tamil',
      'Bhagavad Gita Kannada': 'kannada',
      'Bhagavad Gita Sanskrit': 'sanskrit'
    };
    
    const availableCategories = [...new Set(this.allChaptersCache.map(chapter => chapter.categoryName))];
    const availableLanguages = availableCategories.map(cat => languageMap[cat]).filter(Boolean);
    
    return availableLanguages;
  }

  // Get cached chapter data for a specific language
  getCachedChaptersByLanguage(language: string = 'tamil'): BhagavadGitaChapterResponse[] | null {
    if (!this.allChaptersCache) {
      return null;
    }
    
    const languageMap: { [key: string]: string } = {
      'tamil': 'Bhagavad Gita Tamil',
      'kannada': 'Bhagavad Gita Kannada',
      'sanskrit': 'Bhagavad Gita Sanskrit'
    };
    
    const targetCategoryName = languageMap[language] || 'Bhagavad Gita Tamil';
    const filteredChapters = this.allChaptersCache.filter(chapter => 
      chapter.categoryName === targetCategoryName
    );
    
    return filteredChapters.length > 0 ? filteredChapters : null;
  }

  // Get cached sloka data synchronously
  getCachedSlokaData(): BhagavadGitaSloka[] | null {
    return this.slokaCache;
  }

  // Get a specific chapter by number from cache for a specific language
  getChapterByNumber(chapterNumber: string, language: string = 'tamil'): BhagavadGitaChapterItem | null {
    const cachedChapters = this.getCachedChaptersByLanguage(language);
    
    if (!cachedChapters || cachedChapters.length === 0) {
      return null;
    }

    const chapterItem = cachedChapters[0].cardItems.find(
      (item: BhagavadGitaChapterItem) => item.category === chapterNumber
    );

    return chapterItem || null;
  }

  // Clear cache (useful for refresh scenarios)
  clearCache(): void {
    this.slokaCache = null;
    this.allChaptersCache = null;
    this.slokaDataSubject.next(null);
    this.allChaptersSubject.next(null);
  }

  // Preload data (useful for app initialization)
  preloadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Load both slokas and all chapters
      Promise.all([
        this.getBgSlokas().toPromise(),
        this.getAllBgChapters().toPromise()
      ]).then(() => {
        console.log('✅ All BG data preloaded and cached');
        resolve();
      }).catch((error) => {
        console.error('❌ Error preloading BG data:', error);
        reject(error);
      });
    });
  }

  // Get a specific sloka by ID
  getSlokaById(id: string): Observable<BhagavadGitaSloka> {
    const url = `${this.baseUrl}/bg-sloka/${id}`;
    return this.http.get<BhagavadGitaSloka>(url);
  }

  getSlokasByChapter(chapter: number): Observable<BhagavadGitaSloka[]> {
    const url = `${this.baseUrl}/bg-sloka`;
    return this.http.get<BhagavadGitaSloka[]>(url);
  }

  logSlokas(): void {
    this.getBgSlokas().subscribe({
      next: (slokas) => {
        slokas.forEach((sloka, index) => {
          console.log(`📜 Sloka ${index + 1}:`, sloka);
        });
      },
      error: (error) => {
        console.error('Error fetching BG slokas:', error);
      },
      complete: () => {
        console.log('BG slokas fetch completed');
      }
    });
  }
}
