import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notas-list',
  imports: [],
  template: `
    <div>
      <h1 class="main-title">Notas personales</h1>
      <h2 class="sub-title">Lista de notas</h2>
    </div>
    @for (nota of notas; track notas.id) {
    <div class="notas-container">
      <div class="nota-container">
        <h3 class="nota-title">{{ nota.title }}</h3>
        <p class="nota-content">{{ nota.content }}</p>
        <div>
          <button (click)="onCloseModal()">Editar</button>
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
  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  notas: any = [
    { id: 1, title: 'Nota 1', content: 'Contenido de la nota 1' },
    { id: 2, title: 'Nota 2', content: 'Contenido de la nota 2' },
    { id: 3, title: 'Nota 3', content: 'Contenido de la nota 3' },
    { id: 4, title: 'Nota 4', content: 'Contenido de la nota 4' },
    { id: 5, title: 'Nota 5', content: 'Contenido de la nota 5' },
    { id: 6, title: 'Nota 6', content: 'Contenido de la nota 6' },
    { id: 7, title: 'Nota 7', content: 'Contenido de la nota 7' },
    { id: 8, title: 'Nota 8', content: 'Contenido de la nota 8' },
    { id: 9, title: 'Nota 9', content: 'Contenido de la nota 9' },
    { id: 10, title: 'Nota 10', content: 'Contenido de la nota 10' },
    { id: 11, title: 'Nota 11', content: 'Contenido de la nota 11' },
    { id: 12, title: 'Nota 12', content: 'Contenido de la nota 12' },
    { id: 13, title: 'Nota 13', content: 'Contenido de la nota 13' },
    { id: 14, title: 'Nota 14', content: 'Contenido de la nota 14' },
    { id: 15, title: 'Nota 15', content: 'Contenido de la nota 15' },
    { id: 16, title: 'Nota 16', content: 'Contenido de la nota 16' },
  ];

  constructor() {}

  onCloseModal() {
    this.closeModal.emit(true);
  }
}
