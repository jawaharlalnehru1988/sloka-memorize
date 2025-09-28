
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, home, text, documentText, arrowForward, arrowBack, swapHorizontal, gitBranch, layers, volumeHigh, create, bulb, bookmarks, library, flower, infinite, planet } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Padapāṭha', url: '/padapada', icon: 'text' },
    { title: 'Vākyapāṭha', url: '/vakyapada', icon: 'document-text' },
    { title: 'Anuloma Pāṭha', url: '/anuloma', icon: 'arrow-forward' },
    { title: 'Pratiloma Pāṭha', url: '/pratiloma', icon: 'arrow-back' },
    { title: 'Krama Pāṭha', url: '/kramapada', icon: 'swap-horizontal' },
    { title: 'Jatā Pāṭha', url: '/jatapada', icon: 'git-branch' },
    { title: 'Ghana Pāṭha', url: '/ghanapada', icon: 'layers' },
    { title: 'Ucchāraṇa', url: '/uchcharana', icon: 'volume-high' },
    { title: 'Likitha Pāṭha', url: '/likhitapada', icon: 'create' },
    { title: 'Smaraṇa', url: '/smarana', icon: 'bulb' },
  ];
  public scripturePages = [
    { title: 'Srimad Bhagavad Gītā', url: '/bhagavad-gita', icon: 'bookmarks' },
    // { title: 'Śrīmad Bhāgavatam', url: '/srimad-bhagavatam', icon: 'library' },
    // { title: 'Upadeshamrtam', url: '/upadeshamritam', icon: 'flower' },
    // { title: 'Ishopanishad', url: '/ishopanishad', icon: 'infinite' },
    // { title: 'Brahma-samhita', url: '/brahma-samhita', icon: 'planet' }
  ];
  constructor() {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, home, text, documentText, arrowForward, arrowBack, swapHorizontal, gitBranch, layers, volumeHigh, create, bulb, bookmarks, library, flower, infinite, planet });
  }
}
