import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

@Component({
  selector: 'app-srimad-bhagavatam',
  templateUrl: './srimad-bhagavatam.page.html',
  styleUrls: ['./srimad-bhagavatam.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class SrimadBhagavatamPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
