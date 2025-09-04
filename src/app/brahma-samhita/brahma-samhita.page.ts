import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-brahma-samhita',
  templateUrl: './brahma-samhita.page.html',
  styleUrls: ['./brahma-samhita.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class BrahmaSamhitaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
