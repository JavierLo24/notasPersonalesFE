import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotasP } from '../../interfaces/notas-p';

@Component({
  selector: 'app-notas-list',
  imports: [],
  template: `
    @if(notasPList.length === 0){
    <div class="title-container">
      <h3 class="nota-title">No hay notas disponibles</h3>
      <p class="nota-title">Crea una nueva nota para comenzar.</p>
    </div>
    } @else {@for (nota of notasPList; track nota.id) {
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
          <button (click)="onEditNota(nota.id)" class="btn-edit">
            Editar
          </button>
          <button (click)="onDeleteNota(nota.id)" class="btn-del">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    }}
  `,
  styles: `
    .title-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 20px;
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
      width: 35px;
      height: 35px;
      color: white;
      text-align: center;
      align-content: center;
      border-radius: 50%;
      align-self: center;
    }

    .nota-title {
      font-size: 30px;
      margin-top: 10px;
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
    .btn-edit {
      padding: 5px 10px;
      width: 100px;
      height: 30px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
    }
    .btn-edit:hover {
      background-color: #0056b3;
      cursor: pointer;
    }

    .btn-del {
      padding: 5px 10px;
      width: 100px;
      height: 30px;
      font-size: 16px;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 5px;
    }
    .btn-del:hover {
      background-color:rgb(141, 23, 35);
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
