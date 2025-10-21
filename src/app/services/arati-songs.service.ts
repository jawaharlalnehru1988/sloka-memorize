import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface AudioData {
  audioSrc: string;
  auther: string;
}

export interface SongItem {
  img: string;
  title: string;
  desc: string;
  tamilDescription: string;
  audioData: AudioData;
}

// API Response interface (what we get from the server)
export interface ApiSongItem {
  img: string;
  title: string;
  desc: string;
  tamilDescription: string;
  audioData: {
    audioSrc: string;
    auther: string;
    [key: string]: any; // for other properties we don't need
  };
  [key: string]: any; // for other properties we don't need
}

export interface ApiResponse {
  _id: string;
  categoryName: string;
  cardItems: ApiSongItem[];
  [key: string]: any; // for other properties we don't need
}

// What our components expect
export interface AratiSongsResponse {
  categoryName: string;
  cardItems: SongItem[];
}

@Injectable({
  providedIn: 'root'
})
export class AratiSongsService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * Fetch devotional arati songs from the API
   * @returns Observable containing category name and song items
   */
  getAratiSongs(): Observable<AratiSongsResponse> {
    return this.http.get<ApiResponse[]>(`${this.baseUrl}/ram-bhajan`).pipe(
      map((responseArray: ApiResponse[]) => {
        // Since the API returns an array of objects, we'll flatten all cardItems
        const allSongs: SongItem[] = [];
        let categoryName = 'Devotional Arati Songs'; // Default category name
        
        responseArray.forEach((responseItem: ApiResponse) => {
          // Use the first category name we find
          if (responseItem.categoryName) {
            categoryName = responseItem.categoryName;
          }
          
          // Transform and add all songs from this response item
          const transformedSongs = responseItem.cardItems.map((apiSong: ApiSongItem): SongItem => ({
            img: apiSong.img,
            title: apiSong.title,
            desc: apiSong.desc,
            tamilDescription: apiSong.tamilDescription,
            audioData: {
              audioSrc: apiSong.audioData.audioSrc,
              auther: apiSong.audioData.auther
            }
          }));
          
          allSongs.push(...transformedSongs);
        });
        
        return {
          categoryName,
          cardItems: allSongs
        };
      })
    );
  }

  /**
   * Get a single song by title (for detail page)
   * @param title - The title of the song to find
   * @returns The song item or undefined if not found
   */
  async getSongByTitle(title: string): Promise<SongItem | undefined> {
    try {
      const response = await this.getAratiSongs().toPromise();
      return response?.cardItems.find(song => song.title === title);
    } catch (error) {
      console.error('Error fetching song by title:', error);
      return undefined;
    }
  }

  /**
   * Search songs by title or author
   * @param searchTerm - The search term to filter by
   * @returns Observable containing filtered songs
   */
  searchSongs(searchTerm: string): Observable<SongItem[]> {
    return new Observable(observer => {
      this.getAratiSongs().subscribe({
        next: (response) => {
          const filteredSongs = response.cardItems.filter(song =>
            song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.audioData.auther.toLowerCase().includes(searchTerm.toLowerCase()) ||
            song.desc.toLowerCase().includes(searchTerm.toLowerCase())
          );
          observer.next(filteredSongs);
          observer.complete();
        },
        error: (error) => observer.error(error)
      });
    });
  }
}