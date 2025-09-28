import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton } from '@ionic/angular/standalone';
import { VakyaPadaSloka, Vakyapda } from './vakyapda';
import { TechniqueHeaderComponent } from "../shared/components/technique-header/technique-header.component";

interface Badge {
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
}

@Component({
  selector: 'app-vakyapada',
  templateUrl: './vakyapada.page.html',
  styleUrls: ['./vakyapada.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, CommonModule, FormsModule, TechniqueHeaderComponent]
})
export class VakyapadaPage implements OnInit {

  streakDays: number = 7;
  totalPoints: number = 450;
  completedSlokas: number = 3;
  practiceMinutes: number = 125;

  earnedBadges: Badge[] = [
    { name: 'First Steps', icon: 'footsteps-outline', color: 'primary', unlocked: true },
    { name: 'Line Master', icon: 'checkmark-circle-outline', color: 'success', unlocked: true },
    { name: 'Flow Expert', icon: 'water-outline', color: 'tertiary', unlocked: true }
  ];

  lockedBadges: Badge[] = [
    { name: 'Perfect Rhythm', icon: 'musical-notes-outline', color: 'warning', unlocked: false },
    { name: 'Sloka Sage', icon: 'library-outline', color: 'secondary', unlocked: false },
    { name: 'Daily Devotee', icon: 'calendar-outline', color: 'danger', unlocked: false }
  ];
  
  vakyaPadaSlokas: VakyaPadaSloka[] = [];

  constructor(private vakyapda: Vakyapda, private router: Router) { }

  ngOnInit() {
    this.vakyaPadaSlokas = this.vakyapda.vakyaPadaSlokas;
  }

  startTraining(slokaId: number) {
    this.router.navigate(['/vakyapada/training', slokaId]);
  }
}
