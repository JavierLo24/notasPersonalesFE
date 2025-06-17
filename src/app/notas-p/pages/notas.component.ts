import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotasListComponent } from '../components/notas-list/notas-list.component';
import { AddUpNotasComponent } from '../components/add-up-notas/add-up-notas.component';
import { NotasPService } from '../service/notas-p.service';
import { NotasP, NotasPForm } from '../interfaces/notas-p';
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
      (deleteModal)="deleteNotas($event.id)"
    ></app-notas-list>
    <div>
      <button (click)="toggleAddModal(0)">Crear Nota Personal</button>
    </div>
    } @if(addModalOpen){
    <button (click)="closeAddModal()">Cerrar</button>
    <app-add-up-notas
      [etiquetaList]="etiquetasList"
      [notasPDetalle]="notasDetalle"
      (saveNotas)="saveOrUpdateNotas($event)"
      (closeModal)="closeAddModal()"
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
    private cdr: ChangeDetectorRef,
    private notasPService: NotasPService,
    private etiquetaService: EtiquetasService
  ) {}

  ngOnInit(): void {
    this.getNotasPList();
    this.getEtiquetasList();
  }

  toggleAddModal(id: number) {
    if (id != 0) {
      this.getNotasPDetalle(id);
      this.cdr.detectChanges();
    } else {
      this.notasDetalle = null;
      this.addModalOpen = true;
    }
  }

  closeAddModal() {
    this.getNotasPList();
    this.addModalOpen = false;
  }

  getNotasPList() {
    this.notasPService.getNotasP().subscribe({
      next: (data) => {
        this.notasPList = data;
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  getNotasPDetalle(id: number) {
    this.notasPService.getNotasPDetalle(id).subscribe({
      next: (data) => {
        this.notasDetalle = data;
        this.cdr.detectChanges(); // Asegura que los cambios se reflejen en la vista
        this.addModalOpen = true;
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  getEtiquetasList() {
    this.etiquetaService.getEtiquetas().subscribe({
      next: (data) => {
        this.etiquetasList = data;
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  saveOrUpdateNotas(nota: NotasPForm) {
    if (nota.id != null) {
      this.updateNotas(nota, nota.id);
    } else {
      this.saveNotas(nota);
    }
    this.closeAddModal();
  }

  saveNotas(nota: NotasPForm) {
    this.notasPService.saveNotasP(nota).subscribe({
      next: (data) => {
        this.getNotasPList();
        alert('Nota guardada correctamente');
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  updateNotas(nota: NotasPForm, notaId: number) {
    this.notasPService.updateNotasP(nota, notaId).subscribe({
      next: (data) => {
        this.getNotasPList();
        alert('Nota actualizada correctamente');
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  deleteNotas(notaId: number) {
    this.notasPService.deleteNotasP(notaId).subscribe({
      next: (data) => {
        this.getNotasPList();
        alert('Nota eliminada correctamente');
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }
}
