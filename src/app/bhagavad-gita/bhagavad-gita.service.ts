import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

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
  
  // Cache for storing data
  private slokaCache: BhagavadGitaSloka[] | null = null;
  private chapterCache: BhagavadGitaChapterResponse[] | null = null;
  
  // BehaviorSubjects for reactive state management
  private chapterDataSubject = new BehaviorSubject<BhagavadGitaChapterResponse[] | null>(null);
  private slokaDataSubject = new BehaviorSubject<BhagavadGitaSloka[] | null>(null);
  
  // Public observables for components to subscribe to
  public chapterData$ = this.chapterDataSubject.asObservable();
  public slokaData$ = this.slokaDataSubject.asObservable();

  constructor(private http: HttpClient) { }

  // Get all Bhagavad Gita slokas with caching
  getBgSlokas(): Observable<BhagavadGitaSloka[]> {
    // Return cached data if available
    if (this.slokaCache) {
      console.log('🔄 Returning cached BG slokas');
      return of(this.slokaCache);
    }

    // Fetch from API if not cached
    const url = `${this.baseUrl}/bg-sloka`;
    console.log('🌐 Fetching BG slokas from API:', url);
    
    return this.http.get<BhagavadGitaSloka[]>(url).pipe(
      tap((slokas) => {
        // Cache the data
        this.slokaCache = slokas;
        this.slokaDataSubject.next(slokas);
        console.log('✅ BG slokas cached successfully');
      }),
      shareReplay(1) // Share the same response with multiple subscribers
    );
  }

  // Get Bhagavad Gita chapters by category with caching
  getBgChaptersByCategory(category: string = 'tamil'): Observable<BhagavadGitaChapterResponse[]> {
    // Return cached data if available
    if (this.chapterCache) {
      console.log('🔄 Returning cached BG chapters');
      return of(this.chapterCache);
    }

    // Fetch from API if not cached
    const url = `${this.baseUrl}/bg-sloka-chapters/category/${category}`;
    console.log('🌐 Fetching BG chapters from API:', url);
    
    return this.http.get<BhagavadGitaChapterResponse[]>(url).pipe(
      tap((chapters) => {
        // Cache the data
        this.chapterCache = chapters;
        this.chapterDataSubject.next(chapters);
        console.log('✅ BG chapters cached successfully');
      }),
      shareReplay(1) // Share the same response with multiple subscribers
    );
  }

  // Get cached chapter data synchronously
  getCachedChapterData(): BhagavadGitaChapterResponse[] | null {
    return this.chapterCache;
  }

  // Get cached sloka data synchronously
  getCachedSlokaData(): BhagavadGitaSloka[] | null {
    return this.slokaCache;
  }

  // Get a specific chapter by number from cache
  getChapterByNumber(chapterNumber: string): BhagavadGitaChapterItem | null {
    if (!this.chapterCache || this.chapterCache.length === 0) {
      return null;
    }

    const chapterItem = this.chapterCache[0].cardItems.find(
      (item: BhagavadGitaChapterItem) => item.category === chapterNumber
    );

    return chapterItem || null;
  }

  // Clear cache (useful for refresh scenarios)
  clearCache(): void {
    this.slokaCache = null;
    this.chapterCache = null;
    this.slokaDataSubject.next(null);
    this.chapterDataSubject.next(null);
    console.log('🗑️ Cache cleared');
  }

  // Preload data (useful for app initialization)
  preloadData(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Load both slokas and chapters
      Promise.all([
        this.getBgSlokas().toPromise(),
        this.getBgChaptersByCategory('tamil').toPromise()
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

  // Get slokas by chapter (if needed for filtering)
  getSlokasByChapter(chapter: number): Observable<BhagavadGitaSloka[]> {
    const url = `${this.baseUrl}/bg-sloka`;
    return this.http.get<BhagavadGitaSloka[]>(url);
    // Note: You might need to filter client-side or modify API if server doesn't support chapter filtering
  }

  // Log slokas to console (for debugging)
  logSlokas(): void {
    this.getBgSlokas().subscribe({
      next: (slokas) => {
        console.log('=== Bhagavad Gita Slokas ===');
        console.log(`Total slokas received: ${slokas.length}`);
        console.log('Slokas data:', slokas);
        
        // Log each sloka with detailed information
        slokas.forEach((sloka, index) => {
          console.log(`\n--- Sloka ${index + 1} ---`);
          console.log(`ID: ${sloka._id}`);
          console.log(`Sloka No: ${sloka.slokaNo}`);
          console.log(`Order No: ${sloka.orderNo}`);
          console.log(`Text: ${sloka.slokaText}`);
          console.log(`Voice URL: ${sloka.SlokaVoice}`);
          console.log(`Meaning: ${sloka.slokaMeaning}`);
        });
      },
      error: (error) => {
        console.error('Error fetching BG slokas:', error);
        console.error('API URL attempted:', `${this.baseUrl}/bg-sloka`);
      },
      complete: () => {
        console.log('BG slokas fetch completed');
      }
    });
  }
}
