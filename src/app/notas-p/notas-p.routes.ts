import { Routes } from "@angular/router";
import { NotasListComponent } from "./components/notas-list/notas-list.component";
import { NotasComponent } from "./pages/notas/notas.component";


export const notasPRoutes: Routes = [
  {
    path: "",
    component: NotasComponent,
  },
];
