import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etiqueta } from '../../interfaces/etiqueta';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-up-etiqueta',
  imports: [ReactiveFormsModule],
  template: `
    <div class="container">
      <div class="header">
        <h1 class="main-title">Agregar/Editar Etiqueta</h1>
        <p>Agrega o edita tus etiquetas.</p>
      </div>
      <div class="form-container">
        <form
          action=""
          [formGroup]="etiquetaForm"
          (ngSubmit)="submitEtiqueta()"
        >
          <label for="etiqueta" class="etiqueta-label">Etiqueta</label>
          <input
            type="text"
            id="etiqueta"
            name="etiqueta"
            placeholder="Etiqueta"
            formControlName="etiqueta"
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
export class AddUpEtiquetaComponent implements OnInit {
  @Input() etiquetaDetalle: Etiqueta | null = null;
  @Output() saveEtiqueta: EventEmitter<Etiqueta> = new EventEmitter<Etiqueta>();
  @Output() closeModal = new EventEmitter();

  etiquetaForm: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.etiquetaForm = this.fb.group({
      etiqueta: ['', Validators.required],
    });
    if (this.etiquetaDetalle) {
      this.etiquetaForm.patchValue({
        etiqueta: this.etiquetaDetalle.etiqueta,
      });
    }
  }

  submitEtiqueta() {
    const etiqueta: Etiqueta = {
      id: this.etiquetaDetalle ? this.etiquetaDetalle.id : 0,
      etiqueta: this.etiquetaForm.value.etiqueta,
    };
    this.saveEtiqueta.emit(etiqueta);
    this.closeModal.emit();
  }
}
