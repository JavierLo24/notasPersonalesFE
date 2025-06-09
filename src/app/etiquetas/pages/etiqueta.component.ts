import { Component, OnInit } from '@angular/core';
import { EtiquetasListComponent } from "../components/etiquetas-list/etiquetas-list.component";
import { AddUpEtiquetaComponent } from "../components/add-up-etiqueta/add-up-etiqueta.component";
import { EtiquetasService } from '../service/etiquetas.service';
import { Etiqueta } from '../interfaces/etiqueta';

@Component({
  selector: 'app-etiqueta',
  imports: [EtiquetasListComponent, AddUpEtiquetaComponent],
  template: `
    @if(!addModalOpen){
    <app-etiquetas-list [etiquetasList]="etiquetas"></app-etiquetas-list>
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
export class EtiquetaComponent implements OnInit {


  ngOnInit(): void {
    this.getEtiquetasList();
  }


  addModalOpen: boolean = false;
  etiquetas: Etiqueta[] = [];

  constructor(private etiquetasService: EtiquetasService) { }


  toggleAddModal() {
    this.addModalOpen = !this.addModalOpen;
  }

  getEtiquetasList() {
    this.etiquetasService.getEtiquetas().subscribe({
      next: (data) => {
        console.log(data);
        this.etiquetas = data;
      },
      error: (error) => {
        console.error('Error al obtener las etiquetas:', error);
      }
    })
  }
}
