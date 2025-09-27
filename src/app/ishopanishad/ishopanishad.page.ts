import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

@Component({
  selector: 'app-ishopanishad',
  templateUrl: './ishopanishad.page.html',
  styleUrls: ['./ishopanishad.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class IshopanishadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
