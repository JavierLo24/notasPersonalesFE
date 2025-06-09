import { Component, OnInit } from '@angular/core';
import { NotasListComponent } from '../components/notas-list/notas-list.component';
import { AddUpNotasComponent } from '../components/add-up-notas/add-up-notas.component';
import { NotasPService } from '../service/notas-p.service';
import { NotasP } from '../interfaces/notas-p';
import { EtiquetasService } from '../../etiquetas/service/etiquetas.service';
import { Etiqueta } from '../../etiquetas/interfaces/etiqueta';

@Component({
  selector: 'app-notas',
  imports: [NotasListComponent, AddUpNotasComponent],
  template: `
    @if(!addModalOpen){
    <app-notas-list
      [notasPList]="notasPList"
      (editModal)="toggleAddModal($event.id)"
    ></app-notas-list>
    <div>
      <button (click)="toggleAddModal(0)">Add Notas</button>
    </div>
    } @if(addModalOpen){
    <button (click)="toggleAddModal(0)">Close</button>
    <app-add-up-notas
      [etiquetaList]="etiquetasList"
      [notasPDetalle]="notasDetalle"
      (saveNotas)="saveNotas($event)"
      (closeModal)="toggleAddModal(0)"
    ></app-add-up-notas>
    }
  `,
  styles: ``,
})
export class NotasComponent implements OnInit {
  addModalOpen: boolean = false;
  notasPList: NotasP[] = [];
  etiquetasList: Etiqueta[] = [];
  notasDetalle: NotasP | null = null;

  constructor(
    private notasPService: NotasPService,
    private etiquetaService: EtiquetasService
  ) {}

  ngOnInit(): void {
    this.getNotasPList();
    this.getEtiquetasList();
  }

  toggleAddModal(id: number) {
    if (id) {
      this.getNotasPDetalle(id);
    } else {
      this.notasDetalle = null;
    }

  }

  getNotasPList() {
    this.notasPService.getNotasP().subscribe({
      next: (data) => {
        this.notasPList = data;
      },
      error: (error) => {
        console.error('Error al obtener las notas personales:', error);
      },
    });
  }

  getNotasPDetalle(id: number) {
    this.notasPService.getNotasPDetalle(id).subscribe({
      next: (data) => {
        this.notasDetalle = data;
        this.addModalOpen = !this.addModalOpen;
      },
      error: (error) => {
        console.error('Error al obtener la nota personal:', error);
      },
    });
  }

  getEtiquetasList() {
    this.etiquetaService.getEtiquetas().subscribe({
      next: (data) => {
        this.etiquetasList = data;
      },
      error: (error) => {
        console.error('Error al obtener las etiquetas:', error);
      },
    });
  }

  saveNotas(nota: NotasP) {
    this.notasPService.saveNotasP(nota).subscribe({
      next: (data) => {
        console.log('Nota guardada:', data);
      },
      error: (error) => {
        console.error('Error al guardar la nota:', error);
      },
    });
  }
}
