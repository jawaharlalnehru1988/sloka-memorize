import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { BhagavadGitaService } from '../bhagavad-gita/bhagavad-gita.service';
import { TechniqueHeaderComponent } from '../shared/components/technique-header/technique-header.component';
import { addIcons } from 'ionicons';
import { 
  arrowForwardOutline,
  bookOutline,
  libraryOutline,
  trophyOutline,
  arrowDownOutline,
  playCircleOutline,
  micOutline,
  checkmarkCircleOutline,
  layersOutline,
  listOutline,
  starOutline,
  timeOutline,
  repeatOutline,
  musicalNotesOutline
} from 'ionicons/icons';
interface AnulomaSloka {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  difficulty: string;
  lines: Array<{
    devanagari: string;
    roman: string;
    meaning: string;
    practiced: number;
    mastered: boolean;
  }>;
}

@Component({
  selector: 'app-anuloma',
  templateUrl: './anuloma.page.html',
  styleUrls: ['./anuloma.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class AnulomaPage implements OnInit {
  slokas: AnulomaSloka[] = [];

  constructor(
    private router: Router,
    private bhagavadGitaService: BhagavadGitaService
  ) {
    // Register all the icons used in the template
    addIcons({
      'arrow-forward-outline': arrowForwardOutline,
      'book-outline': bookOutline,
      'library-outline': libraryOutline,
      'trophy-outline': trophyOutline,
      'arrow-down-outline': arrowDownOutline,
      'play-circle-outline': playCircleOutline,
      'mic-outline': micOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'layers-outline': layersOutline,
      'list-outline': listOutline,
      'star-outline': starOutline,
      'time-outline': timeOutline,
      'repeat-outline': repeatOutline,
      'musical-notes-outline': musicalNotesOutline
    });
  }

  ngOnInit() {
    this.loadSlokas();
  }

  loadSlokas() {
    
    this.bhagavadGitaService.getBgSlokas().subscribe({
      next: (data) => {
        
        if (data && data.length > 0) {
          // Transform the first 42 slokas to Anuloma format
          this.slokas = data.slice(0, 42).map(sloka => this.transformToAnulomaSloka(sloka));
        } else {
          console.warn('AnulomaPage: No data received from service');
        }
      },
      error: (error) => {
        console.error('AnulomaPage: Error loading slokas:', error);
      }
    });
  }

  transformToAnulomaSloka(originalSloka: any): AnulomaSloka {
    
    return {
      id: originalSloka._id || originalSloka.orderNo || Math.random(), // Use _id or orderNo as fallback
      title: 'Gītā ' + (originalSloka.slokaNo || 'Unknown'),
      subtitle: originalSloka.slokaText ? originalSloka.slokaText.split(' ').slice(0, 3).join(' ') : 'श्रीमद्भगवद्गीता',
      description: originalSloka.slokaMeaning || 'A verse from the Bhagavad Gita',
      difficulty: this.getDifficultyLevel(originalSloka.orderNo || 1),
      lines: [
        {
          devanagari: originalSloka.slokaText || '',
          roman: originalSloka.slokaNo || '',
          meaning: originalSloka.slokaMeaning || '',
          practiced: 0,
          mastered: false
        }
      ]
    };
  }

  getDifficultyLevel(id: number): string {
    if (id <= 14) return 'Beginner';
    if (id <= 28) return 'Intermediate';
    return 'Advanced';
  }

  selectSloka(slokaId: any) {
    this.router.navigate(['/anuloma/training', slokaId]);
  }

  getDifficultyStars(difficulty: string): number[] {
    const starCount = difficulty === 'Beginner' ? 1 :
                     difficulty === 'Intermediate' ? 2 :
                     difficulty === 'Advanced' ? 3 : 2;
    return Array(starCount).fill(0).map((_, i) => i);
  }
}
