import { Component } from '@angular/core';
import { EtiquetasListComponent } from "../components/etiquetas-list/etiquetas-list.component";
import { AddUpEtiquetaComponent } from "../components/add-up-etiqueta/add-up-etiqueta.component";

@Component({
  selector: 'app-etiqueta',
  imports: [EtiquetasListComponent, AddUpEtiquetaComponent],
  template: `
    @if(!addModalOpen){
    <app-etiquetas-list></app-etiquetas-list>
    <div>
      <button (click)="toggleAddModal()">Añadir Etiqueta</button>
    </div>
    } @if(addModalOpen){
    <button (click)="toggleAddModal()">Close</button>
    <app-add-up-etiqueta></app-add-up-etiqueta>
    }
  `,
  styles: ``,
})
export class EtiquetaComponent {
  addModalOpen: boolean = false;
  toggleAddModal() {
    this.addModalOpen = !this.addModalOpen;
  }
}
