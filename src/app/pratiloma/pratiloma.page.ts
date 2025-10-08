import { Component, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { IonContent, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from "ionicons";
import { chevronBackOutline, chevronForwardOutline, playOutline, micOutline, checkmarkCircleOutline, ellipseOutline, volumeHighOutline, recordingOutline, libraryOutline, helpOutline, eyeOffOutline, refreshOutline, checkmarkOutline, closeOutline, ribbonOutline, bulbOutline, checkmarkCircle, playCircleOutline, bowlingBallOutline } from "ionicons/icons";
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";
import { SlokaDataService, TrainingMode } from "../shared/services/sloka-data";
import { SeoService } from "../shared/services/seo.service";

interface TrainingLevel {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

@Component({
  selector: "app-pratiloma",
  templateUrl: "./pratiloma.page.html",
  styleUrls: ["./pratiloma.page.scss"],
  standalone: true,
  imports: [IonContent, IonIcon, FormsModule, TechniqueHeaderComponent]
})
export class PratilomaPage implements OnInit {
  
  private seoService = inject(SeoService);

  currentLevel: number = 0;

  trainingLevels: TrainingLevel[] = [
    {
      title: "Beginner - Guided Reading",
      description: "Read and repeat the reverse sequence with visual guides",
      completed: false,
      current: true
    },
    {
      title: "Intermediate - Audio Practice",
      description: "Listen and repeat without seeing the text",
      completed: false,
      current: false
    },
    {
      title: "Challenge - Word Arrangement",
      description: "Arrange words in correct reverse order",
      completed: false,
      current: false
    },
    {
      title: "Advanced - Memory Recall",
      description: "Recite complete śloka in reverse from memory",
      completed: false,
      current: false
    },
    {
      title: "Master - Fluent Recitation",
      description: "Fluent reverse recitation with proper rhythm",
      completed: false,
      current: false
    }
  ];

  trainingModes: TrainingMode[] = [
    {
      type: "flashcard",
      title: "Flashcard",
      description: "Learn each word position",
      icon: "card-outline",
      completed: false,
      locked: false
    },
    {
      type: "audio",
      title: "Audio Practice",
      description: "Listen and repeat",
      icon: "volume-high-outline",
      completed: false,
      locked: false
    },
    {
      type: "challenge",
      title: "Word Challenge",
      description: "Arrange words correctly",
      icon: "bonfire-outline",
      completed: false,
      locked: false
    },
    {
      type: "memory",
      title: "Memory Recall",
      description: "Recite from memory",
      icon: "bowling-ball-outline",
      completed: false,
      locked: false
    }
  ];

  get slokas() {
    return this.slokaDataService.slokas();
  }

  constructor(private router: Router, private slokaDataService: SlokaDataService) {
    addIcons({libraryOutline,playCircleOutline,chevronBackOutline,volumeHighOutline,chevronForwardOutline,playOutline,closeOutline,refreshOutline,checkmarkOutline,helpOutline,eyeOffOutline,checkmarkCircle,ribbonOutline,bulbOutline,micOutline,checkmarkCircleOutline,ellipseOutline,recordingOutline, bowlingBallOutline});
  }

  ngOnInit() {
    // Update SEO for this page
    this.seoService.updateSEO({
      title: 'Pratiloma Pāṭha - Reverse Recitation Training',
      description: 'Master Pratiloma Pāṭha (प्रतिलोम पाठ), the ancient Vedic technique of reverse recitation. Develop rock-solid memory and mental flexibility by learning Bhagavad Gita slokas in reverse word order. Traditional gurukula method with Tamil audio, meanings, and step-by-step guidance.',
      keywords: 'Pratiloma Patha, reverse recitation, Vedic memory techniques, backward sloka chanting, Sanskrit reverse learning, Bhagavad Gita memory, advanced Vedic study, gurukula training, mantra reverse recitation, Sarasvati blessings',
      author: 'Hare Krishna Sloka'
    });

    // Add structured data for educational content
    this.seoService.addStructuredData({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Pratiloma Pāṭha - Reverse Recitation Training",
      "description": "Learn the ancient art of reverse recitation to achieve rock-solid memory and invoke the blessings of Goddess Sarasvatī",
      "provider": {
        "@type": "Organization",
        "name": "Hare Krishna Sloka",
        "sameAs": "https://askharekrishna.com"
      },
      "educationalLevel": "All Levels",
      "inLanguage": ["en", "ta", "sa"],
      "teaches": "Vedic recitation technique - Pratiloma Pāṭha (reverse word order recitation)"
    });

    // Add breadcrumb
    this.seoService.addBreadcrumb([
      { name: 'Home', url: '/home' },
      { name: 'Pratiloma Pāṭha', url: '/pratiloma' }
    ]);
  }

  startTraining(slokaId: number) {
    this.slokaDataService.selectSlokaById(slokaId);
    this.router.navigate(["/pratiloma/training", slokaId]);
  }
}
