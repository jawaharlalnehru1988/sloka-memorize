import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonMenuButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-technique-header',
  templateUrl: './technique-header.component.html',
  styleUrls: ['./technique-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton
  ]
})
export class TechniqueHeaderComponent {
  @Input() title: string = '';
  @Input() sanskrit: string = '';
  @Input() color: string = 'primary';
  @Input() translucent: boolean = true;
  @Input() showMenuButton: boolean = true;
  @Input() emoji: string = '🕉️';
}