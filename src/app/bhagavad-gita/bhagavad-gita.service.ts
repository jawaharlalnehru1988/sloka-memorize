import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class BhagavadGitaService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get all Bhagavad Gita slokas
  getBgSlokas(): Observable<BhagavadGitaSloka[]> {
    const url = `${this.baseUrl}/bg-sloka`;
    console.log('Fetching BG slokas from:', url);
    return this.http.get<BhagavadGitaSloka[]>(url);
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
