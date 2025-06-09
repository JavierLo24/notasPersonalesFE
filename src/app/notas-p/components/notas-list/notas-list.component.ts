import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotasP } from '../../interfaces/notas-p';

@Component({
  selector: 'app-notas-list',
  imports: [],
  template: `
    <div>
      <h1 class="main-title">Notas personales</h1>
      <h2 class="sub-title">Lista de notas</h2>
    </div>
    @for (nota of notasPList; track nota.id) {
    <div class="notas-container">
      <div class="nota-container">
        <h3 class="nota-title">{{ nota.titulo }}</h3>
        <p class="nota-content">{{ nota.contenido }}</p>
        <div>
          <button (click)="onEditNota(nota.id)">Editar</button>
          <button>Eliminar</button>
        </div>
      </div>
    </div>
    }
  `,
  styles: `
    .main-title {
      font-size: 24px;
      text-align: center;
      margin-top: 20px;
    }
    .sub-title {
      font-size: 20px;
      text-align: center;
    }
    .notas-container {
      display: inline-grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      align-content: start;
      justify-content: center;
      gap: 10px;
    }
    .nota-container {
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
    }
    .nota-title {
      font-size: 20px;
    }
    .nota-content {
      font-size: 16px;
    }
  `,
})
export class NotasListComponent {
  @Input() notasPList: NotasP[] = [];
  @Output() editModal = new EventEmitter<{ id: number }>();

  constructor() {}

  onEditNota(idNota: number) {
    this.editModal.emit({ id: idNota });
  }
}
