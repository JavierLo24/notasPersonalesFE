import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Etiqueta } from '../../interfaces/etiqueta';

@Component({
  selector: 'app-etiquetas-list',
  standalone: true,
  imports: [],
  template: `
    <div>
      <h1 class="main-title">Etiquetas</h1>
      <h2 class="sub-title">Lista de etiquetas</h2>
    </div>
    <div class="etiqueta-table">
      <table>
        <tr>
          <th>Etiqueta</th>
          <th>Acciones</th>
        </tr>
        @for (etiqueta of etiquetasList; track etiqueta.id) {
        <tr>
          <td>{{ etiqueta.etiqueta }}</td>
          <td>
            <button (click)="toggleAddModal()">Editar</button>
            <button>Eliminar</button>
          </td>
          }
      </table>
    </div>
  `,
  styles: `
    .main-title {
      font-size: 24px;
      text-align: center;
      margin-top: 20px; }

    .sub-title {
      font-size: 20px;
      text-align: center;
    }

    .etiqueta-table {
      align-items: center;
      padding: 10px;
      margin: 10px;
    }

    table, th, td {
      border: 1px solid black;
    }
  `,
})
export class EtiquetasListComponent {
  @Input() etiquetasList: Etiqueta[] = [];
  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  toggleAddModal() {
    this.closeModal.emit(true);
  }
}
