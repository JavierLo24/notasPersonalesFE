import { Routes } from "@angular/router";
import { EtiquetasListComponent } from "./components/etiquetas-list/etiquetas-list.component";
import { EtiquetaComponent } from "./pages/etiqueta.component";


export const etiquetasRoutes: Routes = [
  {
    path: "",
    component: EtiquetaComponent,
  },
];
