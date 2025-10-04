
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, 
  archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
  bookmarkOutline, bookmarkSharp, home, homeOutline, homeSharp, text, textOutline, textSharp,
  documentText, documentTextOutline, documentTextSharp, arrowForward, arrowForwardOutline, arrowForwardSharp,
  arrowBack, arrowBackOutline, arrowBackSharp, swapHorizontal, swapHorizontalOutline, swapHorizontalSharp,
  gitBranch, gitBranchOutline, gitBranchSharp, layers, layersOutline, layersSharp, 
  volumeHigh, volumeHighOutline, volumeHighSharp, create, createOutline, createSharp,
  bulb, bulbOutline, bulbSharp, bookmarks, bookmarksOutline, bookmarksSharp,
  library, libraryOutline, librarySharp, flower, flowerOutline, flowerSharp,
  infinite, infiniteOutline, infiniteSharp, planet, planetOutline, planetSharp
} from 'ionicons/icons';

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
    { title: 'Srimad Bhagavad Gītā', url: '/bhagavad-gita', icon: 'bookmarks', image: '/assets/Bhagavadgita.png' },
    { title: '35 important SB slokas', url: '/35-slokas', icon: 'bookmarks', image: '/assets/Bhagavadgita.png' },
    // { title: 'Śrīmad Bhāgavatam', url: '/srimad-bhagavatam', icon: 'library' },
    // { title: 'Upadeshamrtam', url: '/upadeshamritam', icon: 'flower' },
    // { title: 'Ishopanishad', url: '/ishopanishad', icon: 'infinite' },
    // { title: 'Brahma-samhita', url: '/brahma-samhita', icon: 'planet' }
  ];
  constructor() {
    addIcons({ 
      mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, 
      archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, 
      bookmarkOutline, bookmarkSharp, home, homeOutline, homeSharp, text, textOutline, textSharp,
      documentText, documentTextOutline, documentTextSharp, arrowForward, arrowForwardOutline, arrowForwardSharp,
      arrowBack, arrowBackOutline, arrowBackSharp, swapHorizontal, swapHorizontalOutline, swapHorizontalSharp,
      gitBranch, gitBranchOutline, gitBranchSharp, layers, layersOutline, layersSharp, 
      volumeHigh, volumeHighOutline, volumeHighSharp, create, createOutline, createSharp,
      bulb, bulbOutline, bulbSharp, bookmarks, bookmarksOutline, bookmarksSharp,
      library, libraryOutline, librarySharp, flower, flowerOutline, flowerSharp,
      infinite, infiniteOutline, infiniteSharp, planet, planetOutline, planetSharp
    });
  }
}
