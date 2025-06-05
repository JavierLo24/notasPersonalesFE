import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'notasp',
    loadChildren: () => import('./notas-p/notas-p.routes').then(m => m.notasPRoutes)
  },
  {
    path: 'etiquetas',
    loadChildren: () => import('./etiquetas/etiquetas.routes').then(m => m.etiquetasRoutes)
  },
];
