import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EtiquetasListComponent } from "../components/etiquetas-list/etiquetas-list.component";
import { AddUpEtiquetaComponent } from "../components/add-up-etiqueta/add-up-etiqueta.component";
import { EtiquetasService } from '../service/etiquetas.service';
import { Etiqueta } from '../interfaces/etiqueta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etiqueta',
  imports: [EtiquetasListComponent, AddUpEtiquetaComponent],
  template: `
    <div>
      <h1 class="main-title">Etiquetas</h1>
      <h2 class="sub-title">Lista de etiquetas</h2>
    </div>
    @if(!addModalOpen){
    <div class="btn-container">
      <button class="btn" (click)="toggleAddModal(0)">Añadir Etiqueta</button>
      <button class="btn" (click)="toggleNotasP()">
        Administrar Notas Personales
      </button>
    </div>
    <app-etiquetas-list
      [etiquetasList]="etiquetas"
      (editModal)="toggleAddModal($event.id)"
      (deleteModal)="deleteEtiqueta($event.id)"
    ></app-etiquetas-list>
    } @if(addModalOpen){
    <button class="btn" (click)="closeAddModal()">Cerrar</button>
    <app-add-up-etiqueta
      [etiquetaDetalle]="etiquetaDetalle"
      (saveEtiqueta)="etiquetaSave($event)"
      (closeModal)="closeAddModal()"
    ></app-add-up-etiqueta>
    }
  `,
  styles: `
    .main-title {
      font-size: 33px;
      text-align: center;
      margin-top: 20px;
    }
    .sub-title {
      font-size: 26px;
      text-align: center;
    }

    .btn-container {
      display: flex;
    }

    .btn {
      width: 200px;
      height: 50px;
      padding: 5px 10px;
      margin: 10px;
      font-size: 16px;
      background-color: rgb(42, 95, 7);
      color: white;
      border: solid 1px #ccc;
      border-radius: 5px;
    }
    .btn:hover {
      background-color: rgb(34, 136, 6);
      cursor: pointer;
    }
  `,
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
    private cdr: ChangeDetectorRef,
    private router: Router
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

  toggleNotasP() {
    this.router.navigate(['/']);
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
        alert('ERROR: ' + error.error.message);
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
        alert('ERROR: ' + error.error.message);
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
        alert('ERROR: ' + error.error.message);
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
        alert('ERROR: ' + error.error.message);
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
        alert('ERROR: ' + error.error.message);
      },
    });
  }
}
