import { Etiqueta } from './../../etiquetas/interfaces/etiqueta';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NotasListComponent } from '../components/notas-list/notas-list.component';
import { AddUpNotasComponent } from '../components/add-up-notas/add-up-notas.component';
import { NotasPService } from '../service/notas-p.service';
import { NotasP, NotasPForm } from '../interfaces/notas-p';
import { EtiquetasService } from '../../etiquetas/service/etiquetas.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas',
  imports: [NotasListComponent, AddUpNotasComponent],
  template: `
    <div>
      <h1 class="main-title">Notas personales</h1>
      <h2 class="sub-title">Lista de notas</h2>
    </div>
    @if(!addModalOpen){
    <div>
      <button class="btn" (click)="toggleAddModal(0)">
        Crear Nota Personal
      </button>
      <button class="btn" (click)="toggleEtiqueta()">
        Administrar Etiquetas
      </button>
    </div>
    <app-notas-list
      [notasPList]="notasPLista"
      (editModal)="toggleAddModal($event.id)"
      (deleteModal)="deleteNotas($event.id)"
    ></app-notas-list>
    } @if(addModalOpen){
    <button class="btn" (click)="closeAddModal()">Cerrar</button>
    <app-add-up-notas
      [etiquetaList]="etiquetasList"
      [notasPDetalle]="notasDetalle"
      (saveNotas)="saveOrUpdateNotas($event)"
      (closeModal)="closeAddModal()"
    ></app-add-up-notas>
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
    .btn {
      width: 200px;
      height: 50px;
      padding: 5px 10px;
      margin: 10px;
      font-size: 16px;
      background-color:rgb(42, 95, 7);
      color: white;
      border: solid 1px #ccc;
      border-radius: 5px;
    }
    .btn:hover {
      background-color:rgb(34, 136, 6);
      cursor: pointer;
    }
  `,
})
export class NotasComponent implements OnInit {
  addModalOpen: boolean = false;
  notasPLista: NotasP[] = [];
  etiquetasList: Etiqueta[] = [];
  notasDetalle: NotasP | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private notasPService: NotasPService,
    private etiquetaService: EtiquetasService,
    private router: Router
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

  toggleEtiqueta() {
    this.router.navigate(['/etiquetas']);
  }

  closeAddModal() {
    this.getNotasPList();
    this.addModalOpen = false;
  }

  getNotasPList() {
    this.notasPService.getNotasP().subscribe({
      next: (data) => {
        this.notasPLista = data;
        this.notasPLista.forEach((nota) => {
          nota.color = this.getRandomColor();
        });
      },
      error: (error) => {
        alert('ERROR: ' + error.error.message);
      },
    });
  }

  getRandomColor(): string {
    const colors = [
      '#FFCDD2',
      '#F8BBD0',
      '#E1BEE7',
      '#BBDEFB',
      '#C8E6C9',
      '#FFF9C4',
      '#FFE0B2',
      '#D7CCC8',
      '#CFD8DC',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
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
