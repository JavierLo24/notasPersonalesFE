import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EtiquetasListComponent } from "../components/etiquetas-list/etiquetas-list.component";
import { AddUpEtiquetaComponent } from "../components/add-up-etiqueta/add-up-etiqueta.component";
import { EtiquetasService } from '../service/etiquetas.service';
import { Etiqueta } from '../interfaces/etiqueta';

@Component({
  selector: 'app-etiqueta',
  imports: [EtiquetasListComponent, AddUpEtiquetaComponent],
  template: `
    @if(!addModalOpen){
    <app-etiquetas-list
      [etiquetasList]="etiquetas"
      (editModal)="toggleAddModal($event.id)"
      (deleteModal)="deleteEtiqueta($event.id)"
    ></app-etiquetas-list>
    <div>
      <button (click)="toggleAddModal(0)">Añadir Etiqueta</button>
    </div>
    } @if(addModalOpen){
    <button (click)="closeAddModal()">Cerrar</button>
    <app-add-up-etiqueta
      [etiquetaDetalle]="etiquetaDetalle"
      (saveEtiqueta)="etiquetaSave($event)"
      (closeModal)="closeAddModal()"
    ></app-add-up-etiqueta>
    }
  `,
  styles: ``,
})
export class EtiquetaComponent implements OnInit {
  addModalOpen: boolean = false;
  etiquetas: Etiqueta[] = [];
  etiquetaDetalle: Etiqueta | null = null;

  ngOnInit(): void {
    this.getEtiquetasList();
  }

  constructor(
    private etiquetasService: EtiquetasService,
    private cdr: ChangeDetectorRef
  ) {}

  toggleAddModal(id: number) {
    if (id != 0) {
      this.getEtiquetaDetalle(id);
      this.cdr.detectChanges();
    } else {
      this.etiquetaDetalle = null;
      this.addModalOpen = true;
    }
  }

  closeAddModal() {
    this.getEtiquetasList();
    this.addModalOpen = false;
  }

  getEtiquetasList() {
    this.etiquetasService.getEtiquetas().subscribe({
      next: (data) => {
        this.etiquetas = data;
      },
      error: (error) => {
        alert('Error al obtener la lista de etiquetas');
      },
    });
  }

  getEtiquetaDetalle(id: number) {
    this.etiquetasService.getEtiquetaDetalle(id).subscribe({
      next: (data) => {
        this.etiquetaDetalle = data;
        this.cdr.detectChanges(); // Asegura que los cambios se reflejen en la vista
        this.addModalOpen = true;
      },
      error: (error) => {
        alert('Error al obtener el detalle de la etiqueta');
      },
    });
  }

  etiquetaSave(etiqueta: Etiqueta) {
    if (etiqueta.id) {
      this.updateEtiqueta(etiqueta, etiqueta.id);
    } else {
      this.saveEtiqueta(etiqueta);
    }
  }

  saveEtiqueta(etiqueta: Etiqueta) {
    this.etiquetasService.saveEtiqueta(etiqueta).subscribe({
      next: (data) => {
        this.getEtiquetasList();
        alert('Etiqueta guardada correctamente');
      },
      error: (error) => {
        alert('Error al guardar la etiqueta');
      },
    });
  }

  updateEtiqueta(etiqueta: Etiqueta, etiquetaId: number) {
    this.etiquetasService.updateEtiqueta(etiqueta, etiquetaId).subscribe({
      next: (data) => {
        this.getEtiquetasList();
        alert('Etiqueta actualizada correctamente');
      },
      error: (error) => {
        alert('Error al actualizar la etiqueta');
      },
    });
  }

  deleteEtiqueta(etiquetaId: number) {
    this.etiquetasService.deleteEtiqueta(etiquetaId).subscribe({
      next: (data) => {
        this.getEtiquetasList();
        alert('Etiqueta eliminada correctamente');
      },
      error: (error) => {
        alert('Error al eliminar la etiqueta');
      },
    });
  }
}
