import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

@Component({
  selector: 'app-upadeshamritam',
  templateUrl: './upadeshamritam.page.html',
  styleUrls: ['./upadeshamritam.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class UpadeshamritamPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
