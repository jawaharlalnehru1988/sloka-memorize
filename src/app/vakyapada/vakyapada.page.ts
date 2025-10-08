import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { VakyaPadaSloka, Vakyapda } from './vakyapda';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";
import { SeoService } from '../shared/services/seo.service';

interface Badge {
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

@Component({
  selector: 'app-vakyapada',
  templateUrl: './vakyapada.page.html',
  styleUrls: ['./vakyapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class VakyapadaPage implements OnInit {
  private seoService = inject(SeoService);

  streakDays: number = 7;
  totalPoints: number = 450;
  completedSlokas: number = 3;
  practiceMinutes: number = 125;

  earnedBadges: Badge[] = [
    { name: 'First Steps', icon: 'footsteps-outline', color: 'primary', unlocked: true },
    { name: 'Line Master', icon: 'checkmark-circle-outline', color: 'success', unlocked: true },
    { name: 'Flow Expert', icon: 'water-outline', color: 'tertiary', unlocked: true }
  ];

  lockedBadges: Badge[] = [
    { name: 'Perfect Rhythm', icon: 'musical-notes-outline', color: 'warning', unlocked: false },
    { name: 'Sloka Sage', icon: 'library-outline', color: 'secondary', unlocked: false },
    { name: 'Daily Devotee', icon: 'calendar-outline', color: 'danger', unlocked: false }
  ];
  
  vakyaPadaSlokas: VakyaPadaSloka[] = [];

  constructor(private vakyapda: Vakyapda, private router: Router) { }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Vākyapāṭha - Sentence-by-Sentence Vedic Recitation',
      description: 'Master Vākyapāṭha (वाक्यपाठ), the Vedic technique of sentence-by-sentence recitation. Learn to recite Bhagavad Gita verses in complete meaningful phrases with proper rhythm and flow. Tamil transliteration, audio guidance, and gamified learning with badges and streaks.',
      keywords: 'Vakyapada, Vakyapatha, sentence recitation, phrase learning, Vedic sentence method, Sanskrit phrases, meaningful segments, Bhagavad Gita sentences, intermediate Sanskrit, rhythm and flow',
      author: 'Hare Krishna Sloka'
    });

    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Vākyapāṭha - Sentence-by-Sentence Recitation",
      "description": "Learn to recite complete sentences with meaning and rhythm",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka"
      },
      "educationalLevel": "Intermediate",
      "inLanguage": ["en", "ta", "sa"]
    });

    this.seoService.addBreadcrumb([
      { name: 'Home', url: '/home' },
      { name: 'Vākyapāṭha', url: '/vakyapada' }
    ]);

    this.vakyaPadaSlokas = this.vakyapda.vakyaPadaSlokas;
  }

  startTraining(slokaId: number) {
    this.router.navigate(['/vakyapada/training', slokaId]);
  }
}
