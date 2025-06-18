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
      <div class="nota-container" [style.background]="nota.color">
        <div class="nota-id">
          {{ nota.id }}
        </div>
        <div class="title-container">
          <h3 class="nota-title">{{ nota.titulo }}</h3>
          <p class="nota-content">{{ nota.contenido }}</p>
        </div>
        <div class="nota-actions">
          <button (click)="onEditNota(nota.id)" class="btn-nota-action">
            Editar
          </button>
          <button (click)="onDeleteNota(nota.id)" class="btn-nota-action">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    }
  `,
  styles: `
    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
    }
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
      width: 350px;
      height: 400px;
      border: 1px solid #ccc;
      padding: 10px;
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }

    .nota-id {
      background-color:rgb(92, 88, 88);
      color: white;
      border-radius: 5px;
      /*width: min-content*/
      padding: .2rem
      text-align: center;
    }
    .nota-title {
      font-size: 30px;
    }
    .nota-content {
      font-size: 16px;
      text-align: justify;
      margin: 10px;
      overflow: auto;
      width: 100%;
      height: 200px;
    }
    .nota-actions {
      display: flex;
      justify-content: space-between;
      position: relative;
      top: max-content;
    }
    .btn-nota-action {
      padding: 5px 10px;
      width: 100px;
      height: 30px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
    }
    .btn-nota-action:hover {
      background-color: #0056b3;
      cursor: pointer;
    }
  `,
})
export class NotasListComponent {
  @Input() notasPList: NotasP[] = [];
  @Output() editModal = new EventEmitter<{ id: number }>();
  @Output() deleteModal = new EventEmitter<{ id: number }>();

  constructor() {}

  onEditNota(idNota: number) {
    this.editModal.emit({ id: idNota });
  }

  onDeleteNota(idNota: number) {
    this.deleteModal.emit({ id: idNota });
  }
}
