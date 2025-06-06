import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-etiquetas-list',
  standalone: true,
  imports: [],
  template:  `
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
          @for (etiqueta of etiquetas; track etiquetas.id) {
          <tr>
            <td>{{ etiqueta.name }}</td>
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
  `
})
export class EtiquetasListComponent {
  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  etiquetas: any = [
    { id: 1, name: 'Etiqueta 1' },
    { id: 2, name: 'Etiqueta 2' },
    { id: 3, name: 'Etiqueta 3' },
    { id: 4, name: 'Etiqueta 4' },
    { id: 5, name: 'Etiqueta 5' },
    { id: 6, name: 'Etiqueta 6' },
    { id: 7, name: 'Etiqueta 7' },
    { id: 8, name: 'Etiqueta 8' },
    { id: 9, name: 'Etiqueta 9' },
    { id: 10, name: 'Etiqueta 10' },
    { id: 11, name: 'Etiqueta 11' },
    { id: 12, name: 'Etiqueta 12' },
    { id: 13, name: 'Etiqueta 13' },
    { id: 14, name: 'Etiqueta 14' },
    { id: 15, name: 'Etiqueta 15' },
    { id: 16, name: 'Etiqueta 16' },
  ];
  toggleAddModal() {
    this.closeModal.emit(true);
  }
}
