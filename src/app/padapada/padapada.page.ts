import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { PadapadaService, Sloka } from './padapada.service';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";



@Component({
  selector: 'app-padapada',
  templateUrl: './padapada.page.html',
  styleUrls: ['./padapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class PadapadaPage implements OnInit {

  slokas: Sloka[];

  constructor(
    private padapadaService: PadapadaService,
    private router: Router
  ) {
    // Load slokas from the service
    this.slokas = this.padapadaService.slokas;
  }

  ngOnInit() {
  }

  startTraining(slokaId: number) {
    // Navigate to the training component with sloka ID
    this.router.navigate(['/padapada/training', slokaId]);
  }
}
