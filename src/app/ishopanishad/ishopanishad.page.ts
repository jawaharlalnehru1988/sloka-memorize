import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-ishopanishad',
  templateUrl: './ishopanishad.page.html',
  styleUrls: ['./ishopanishad.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IshopanishadPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
