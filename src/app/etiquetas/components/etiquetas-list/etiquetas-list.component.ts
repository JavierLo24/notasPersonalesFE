import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Etiqueta } from '../../interfaces/etiqueta';

@Component({
  selector: 'app-etiquetas-list',
  standalone: true,
  imports: [],
  template: `
    <div class="table-container">
      <div class="etiqueta-table">
        <table>
          <tr>
            <th>Etiqueta</th>
            <th>Acciones</th>
          </tr>
          @if(etiquetasList.length === 0) {
          <tr>
            <td>No hay etiquetas disponibles</td>
          </tr>
          } @else {
          @for (etiqueta of etiquetasList; track etiqueta.id) {
          <tr>
            <td>{{ etiqueta.etiqueta }}</td>
            <td class="buttons-container">
              <button class="btn-edit" (click)="onEditEtiqueta(etiqueta.id)">Editar</button>
              <button class="btn-del" (click)="onDeleteEtiqueta(etiqueta.id)">Eliminar</button>
            </td>
          </tr>
          }
        }
        </table>
      </div>
    </div>
  `,
  styles: `
    .table-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .etiqueta-table {
      align-items: center;
      padding: 10px;
      margin: 10px;
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

    .buttons-container {
      display: flex;
      justify-content: space-between;
    }

    table, th, td {
      border: 1px solid black;
      background-color: #f9f9f9;
    }
  `,
})
export class EtiquetasListComponent {
  @Input() etiquetasList: Etiqueta[] = [];
  @Output() editModal = new EventEmitter<{ id: number }>();
  @Output() deleteModal = new EventEmitter<{ id: number }>();

  constructor() {}

  onEditEtiqueta(idEtiqueta: number) {
    this.editModal.emit({ id: idEtiqueta });
  }

  onDeleteEtiqueta(idEtiqueta: number) {
    this.deleteModal.emit({ id: idEtiqueta });
  }
}
