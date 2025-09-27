import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

@Component({
  selector: 'app-brahma-samhita',
  templateUrl: './brahma-samhita.page.html',
  styleUrls: ['./brahma-samhita.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class BrahmaSamhitaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
