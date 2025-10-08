import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { PadapadaService, Sloka } from './padapada.service';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";
import { SeoService } from '../shared/services/seo.service';



@Component({
  selector: 'app-padapada',
  templateUrl: './padapada.page.html',
  styleUrls: ['./padapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class PadapadaPage implements OnInit {
  private seoService = inject(SeoService);
  slokas: Sloka[];

  constructor(
    private padapadaService: PadapadaService,
    private router: Router
  ) {
    // Load slokas from the service
    this.slokas = this.padapadaService.slokas;
  }

  ngOnInit() {
    this.seoService.updateSEO({
      title: 'Padapāṭha - Word-by-Word Vedic Recitation Training',
      description: 'Master Padapāṭha (पदपाठ), the foundational Vedic technique of word-by-word recitation. Learn Bhagavad Gita slokas by breaking verses into individual words with Tamil pronunciation, meanings, and audio guidance. Perfect for beginners starting their Sanskrit journey.',
      keywords: 'Padapada, Padapatha, word by word recitation, Vedic learning method, Sanskrit word breakdown, individual word practice, Bhagavad Gita words, beginner Sanskrit, Tamil pronunciation, Vedic basics',
      author: 'Hare Krishna Sloka'
    });

    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Padapāṭha - Word-by-Word Recitation",
      "description": "Learn slokas word-by-word with clear pronunciation and meaning",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka"
      },
      "educationalLevel": "Beginner",
      "inLanguage": ["en", "ta", "sa"]
    });

    this.seoService.addBreadcrumb([
      { name: 'Home', url: '/home' },
      { name: 'Padapāṭha', url: '/padapada' }
    ]);
  }

  startTraining(slokaId: number) {
    // Navigate to the training component with sloka ID
    this.router.navigate(['/padapada/training', slokaId]);
  }
}
