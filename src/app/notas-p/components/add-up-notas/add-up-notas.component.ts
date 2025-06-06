import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-up-notas',
  imports: [],
  template: `
    <div class="add-up-notas">
      <div class="header">
        <h2>Agregar/Editar Notas</h2>
        <p>Agrega o edita tus notas personales.</p>
      </div>
      <div class="form-container">
        <form action="">
          <label for="notas" class="title-label">Título de la Nota</label>
          <input
            type="text"
            id="notas"
            name="notas"
            placeholder="Notas"
            class="title-input"
            required
          />
          <br />
          <label for="content" class="content-label">Contenido de la Nota</label>
          <textarea
            id="content"
            name="content"
            placeholder="Contenido de la nota"
            class="content-input"
            required
          ></textarea>
          <br />
          <label for="etiqueta" class="etiqueta-label">Etiqueta</label>
          <select name="etiqueta" id="etiqueta" required class="etiqueta-select">
            <option value="" disabled selected>Seleccione una etiqueta</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <button
            type="submit"
            class="btn btn-primary"
            (click)="onCloseModal()"
          >
            Agregar Nota
          </button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .add-up-notas {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .header {
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
      width: 100%;
      padding: 10px;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .title-label {
      font-size: 20px;
    }
    .title-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }
    .content-label {
      font-size: 20px;
    }
    .content-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }
    .etiqueta-label {
      font-size: 20px;
    }
    .etiqueta-select {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }

  `,
})
export class AddUpNotasComponent {
  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  constructor() {}

  onCloseModal() {
    this.closeModal.emit(true);
  }
}
