import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonSpinner,
  IonItem,
  IonAccordionGroup,
  IonAccordion,
  IonLabel
} from '@ionic/angular/standalone';
import { BhagavadGitaService, BhagavadGitaSloka } from './bhagavad-gita.service';
import { book, close, chevronDown, play, bookmark, image } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-bhagavad-gita',
  templateUrl: './bhagavad-gita.page.html',
  styleUrls: ['./bhagavad-gita.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonText,
    IonSpinner,
    IonAccordionGroup,
    IonAccordion,
    IonLabel,
    CommonModule, 
    FormsModule
  ]
})
export class BhagavadGitaPage implements OnInit {
  @ViewChild('slokasSection', { read: ElementRef }) slokasSection!: ElementRef;
  
  slokas: BhagavadGitaSloka[] = [];
  showSlokas: boolean = false;
  selectedSectionTitle: string = '';
  selectedSection: string = '';
  
  cardContents = [
  {
    title: 'Bhagavad Gītā 35 Slokas',
    content: 'A collection of 35 key slokas from the Bhagavad Gita.',
    image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
    buttonText: 'Start Learning',
    sectionToRedirect: 'bhagavad-gita-35'
  },
  // {
  //   title: 'Bhagavad Gītā 54 Slokas',
  //   content: 'A collection of 54 key slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-54'
  // },
  // {
  //   title: 'Bhagavad Gītā 108 Slokas',
  //   content: 'A collection of 108 key slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-108'
  // },
  // {
  //   title: 'Bhagavad Gītā 1st chapter Slokas',
  //   content: 'A collection of 1st chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-1'
  // },
  // {
  //   title: 'Bhagavad Gītā 2nd chapter Slokas',
  //   content: 'A collection of 2nd chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-2'
  // },
  // {
  //   title: 'Bhagavad Gītā 3rd chapter Slokas',
  //   content: 'A collection of 3rd chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-3'
  // },
  // {
  //   title: 'Bhagavad Gītā 4th chapter Slokas',
  //   content: 'A collection of 4th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-4'
  // },
  // {
  //   title: 'Bhagavad Gītā 5th chapter Slokas',
  //   content: 'A collection of 5th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-5'
  // },
  // {
  //   title: 'Bhagavad Gītā 6th chapter Slokas',
  //   content: 'A collection of 6th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-6'
  // },
  // {
  //   title: 'Bhagavad Gītā 7th chapter Slokas',
  //   content: 'A collection of 7th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-7'
  // },
  // {
  //   title: 'Bhagavad Gītā 8th chapter Slokas',
  //   content: 'A collection of 8th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-8'
  // },
  // {
  //   title: 'Bhagavad Gītā 9th chapter Slokas',
  //   content: 'A collection of 9th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-9'
  // },
  // {
  //   title: 'Bhagavad Gītā 10th chapter Slokas',
  //   content: 'A collection of 10th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-10'
  // },
  // {
  //   title: 'Bhagavad Gītā 11th chapter Slokas',
  //   content: 'A collection of 11th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-11'
  // },
  // {
  //   title: 'Bhagavad Gītā 12th chapter Slokas',
  //   content: 'A collection of 12th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-12'
  // },
  // {
  //   title: 'Bhagavad Gītā 13th chapter Slokas',
  //   content: 'A collection of 13th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-13'
  // },
  // {
  //   title: 'Bhagavad Gītā 14th chapter Slokas',
  //   content: 'A collection of 14th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-14'
  // },
  // {
  //   title: 'Bhagavad Gītā 15th chapter Slokas',
  //   content: 'A collection of 15th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-15'
  // },
  // {
  //   title: 'Bhagavad Gītā 16th chapter Slokas',
  //   content: 'A collection of 16th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-16'
  // },
  // { 
  //   title: 'Bhagavad Gītā 17th chapter Slokas',
  //   content: 'A collection of 17th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-17'
  // },
  // {
  //   title: 'Bhagavad Gītā 18th chapter Slokas',
  //   content: 'A collection of 18th chapter slokas from the Bhagavad Gita.',
  //   image: "https://res.cloudinary.com/dbmkctsda/image/upload/v1755826489/6c5b5f34493a22073fec89464565a7a2_nzjsqr.jpg",
  //   buttonText: 'Start Learning',
  //   sectionToRedirect: 'bhagavad-gita-18'
  // }
];
  constructor(
    private bhagavadGitaService: BhagavadGitaService,
    private router: Router
  ) {
    addIcons({book,close,chevronDown,play,bookmark});
  }

  ngOnInit() {
    this.loadSlokas();
  }

  navigateToSection(section: string): void {
    console.log(`Navigating to section: ${section}`);
    // For now, just log the navigation. Later you can implement actual routing
    // this.router.navigate([`/${section}`]);
  }

  scrollToSlokas(section: string): void {
    console.log(`Scrolling to slokas for section: ${section}`);
    
    // Set the selected section and title
    this.selectedSection = section;
    this.selectedSectionTitle = this.getSectionTitle(section);
    this.showSlokas = true;

    // Wait for the DOM to update, then scroll
    setTimeout(() => {
      if (this.slokasSection) {
        this.slokasSection.nativeElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100);
  }

  hideSlokas(): void {
    this.showSlokas = false;
    this.selectedSection = '';
    this.selectedSectionTitle = '';
  }

  getSectionTitle(section: string): string {
    const cardContent = this.cardContents.find(card => card.sectionToRedirect === section);
    return cardContent ? cardContent.title : 'Bhagavad Gītā Slokas';
  }

  playAudio(audioUrl: string): void {
    console.log(`Playing audio: ${audioUrl}`);
    // Create audio element and play
    const audio = new Audio(audioUrl);
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  private loadSlokas(): void {
    console.log('Loading Bhagavad Gita slokas...');
    
    this.bhagavadGitaService.getBgSlokas().subscribe({
      next: (slokas) => {
        this.slokas = slokas;
        console.log('=== BHAGAVAD GITA SLOKAS ===');
        console.log(`Total slokas received: ${slokas.length}`);
        console.table(slokas); // Nice table format in console
        
        // Also log detailed information
        slokas.forEach((sloka, index) => {
          console.log(`\n🕉️ Sloka ${index + 1} (${sloka.slokaNo})`);
          console.log(`📖 Text: ${sloka.slokaText}`);
          console.log(`🎵 Voice: ${sloka.SlokaVoice}`);
          console.log(`💭 Meaning: ${sloka.slokaMeaning}`);
          console.log(`📋 Order: ${sloka.orderNo}, ID: ${sloka._id}`);
        });
      },
      error: (error) => {
        console.error('❌ Error fetching Bhagavad Gita slokas:', error);
        console.error('🔗 API URL:', `${this.bhagavadGitaService['baseUrl']}/bg-sloka`);
      },
      complete: () => {
        console.log('✅ Bhagavad Gita slokas loading completed');
      }
    });
  }

}
