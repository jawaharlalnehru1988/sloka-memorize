import { Component, OnInit, inject } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";
import { SeoService } from '../shared/services/seo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonIcon, FormsModule, TechniqueHeaderComponent]
})
export class HomePage implements OnInit {
  private seoService = inject(SeoService);

  constructor(private router: Router) { }

  ngOnInit() {
    // Update SEO for home page
    this.seoService.updateSEO({
      title: 'Learn Bhagavad Gita & Vedic Slokas with 11 Traditional Techniques',
      description: 'Master Sanskrit slokas from Bhagavad Gita using 11 ancient Vedic recitation techniques: Padapāṭha, Kramapāṭha, Jatāpāṭha, Ghanapāṭha, and more. Learn with Tamil transliteration, audio pronunciation, and step-by-step guidance. Perfect for spiritual seekers and students.',
      keywords: 'Bhagavad Gita, Sanskrit slokas, Vedic recitation, 11 Vedic techniques, Tamil pronunciation, sloka learning, Krishna consciousness, spiritual education, mantra memorization, Padapada, Kramapada, Jatapada, Ghanapada',
      author: 'Hare Krishna Sloka'
    });

    // Add structured data for the website
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Hare Krishna Sloka",
      "description": "Learn and memorize Vedic slokas from Bhagavad Gita with traditional recitation techniques",
      "url": "https://askharekrishna.com",
      "inLanguage": ["en", "ta", "sa"],
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://askharekrishna.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    });
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
