import { Component } from '@angular/core';

@Component({
  selector: 'app-add-up-etiqueta',
  imports: [],
  template: `
    <div class="container">
      <div class="header">
        <h1 class="main-title">Agregar/Editar Etiqueta</h1>
        <p>Agrega o edita tus etiquetas.</p>
      </div>
      <div class="form-container">
        <form action="">
          <label for="etiqueta" class="etiqueta-label">Etiqueta</label>
          <input
            type="text"
            id="etiqueta"
            name="etiqueta"
            placeholder="Etiqueta"
            required
          />
          <br />
          <button type="submit" class="btn btn-primary">
            Agregar Etiqueta
          </button>
        </form>
      </div>
    </div>
  `,
  styles: `
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .main-title {
      font-size: 24px;
      text-align: center;
      margin-top: 20px;
    }
    .form-container {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .etiqueta-label {
      font-size: 20px;
    }
    `,
})
export class AddUpEtiquetaComponent {}
