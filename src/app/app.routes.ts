import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'padapada',
    loadComponent: () => import('./padapada/padapada.page').then( m => m.PadapadaPage)
  },
  {
    path: 'padapada/training/:id',
    loadComponent: () => import('./padapada/padapada-training/padapada-training.page').then( m => m.PadapadaTrainingPage)
  },
  {
    path: 'vakyapada',
    loadComponent: () => import('./vakyapada/vakyapada.page').then( m => m.VakyapadaPage)
  },
  {
    path: 'anuloma',
    loadComponent: () => import('./anuloma/anuloma.page').then( m => m.AnulomaPage)
  },
  {
    path: 'pratiloma',
    loadComponent: () => import('./pratiloma/pratiloma.page').then( m => m.PratilomaPage)
  },
  {
    path: 'kramapada',
    loadComponent: () => import('./kramapada/kramapada.page').then( m => m.KramapadaPage)
  },
  {
    path: 'kramapada/training/:id',
    loadComponent: () => import('./kramapada/kramapada-training/kramapada-training.page').then( m => m.KramapadaTrainingPage)
  },
  {
    path: 'jatapada',
    loadComponent: () => import('./jatapada/jatapada.page').then( m => m.JatapadaPage)
  },
  {
    path: 'ghanapada',
    loadComponent: () => import('./ghanapada/ghanapada.page').then( m => m.GhanapadaPage)
  },
  {
    path: 'uchcharana',
    loadComponent: () => import('./uchcharana/uchcharana.page').then( m => m.UchcharanaPage)
  },
  {
    path: 'likhitapada',
    loadComponent: () => import('./likhitapada/likhitapada.page').then( m => m.LikhitapadaPage)
  },
  {
    path: 'smarana',
    loadComponent: () => import('./smarana/smarana.page').then( m => m.SmaranaPage)
  },
  {
    path: 'bhagavad-gita',
    loadComponent: () => import('./bhagavad-gita/bhagavad-gita.page').then( m => m.BhagavadGitaPage)
  },
  {
    path: '35-slokas',
    loadComponent: () => import('./sloka-renderer/sloka-renderer.component').then( m => m.SlokaRendererComponent)
  },
  {
    path: 'srimad-bhagavatam',
    loadComponent: () => import('./srimad-bhagavatam/srimad-bhagavatam.page').then( m => m.SrimadBhagavatamPage)
  },
  {
    path: 'upadeshamritam',
    loadComponent: () => import('./upadeshamritam/upadeshamritam.page').then( m => m.UpadeshamritamPage)
  },
  {
    path: 'ishopanishad',
    loadComponent: () => import('./ishopanishad/ishopanishad.page').then( m => m.IshopanishadPage)
  },
  {
    path: 'brahma-samhita',
    loadComponent: () => import('./brahma-samhita/brahma-samhita.page').then( m => m.BrahmaSamhitaPage)
  },
  {
    path: 'bhagavad-gita-chapter/:chapterNumber',
    loadComponent: () => import('./bhagavad-gita-chapter/bhagavad-gita-chapter.page').then( m => m.BhagavadGitaChapterPage)
  },
  {
    path: 'sloka-renderer',
    loadComponent: () => import('./sloka-renderer/sloka-renderer.component').then( m => m.SlokaRendererComponent)
  },
  {
    path: 'sloka-renderer/:id',
    loadComponent: () => import('./sloka-renderer/sloka-renderer.component').then( m => m.SlokaRendererComponent)
  },
  {
    path: 'vakyapada/training/:id',
    loadComponent: () => import('./vakyapada/vakyapada-training/vakyapada-training.page').then( m => m.VakyapadaTrainingPage)
  },
  {
    path: 'anuloma/training/:id',
    loadComponent: () => import('./anuloma/anuloma-training/anuloma-training.page').then( m => m.AnulomaTrainingPage)
  },
];
