import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etiqueta } from '../../../etiquetas/interfaces/etiqueta';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NotasP } from '../../interfaces/notas-p';

@Component({
  selector: 'app-add-up-notas',
  imports: [ReactiveFormsModule],
  template: `
    <div class="add-up-notas">
      <div class="header">
        <h2>Agregar/Editar Notas</h2>
        <p>Agrega o edita tus notas personales.</p>
      </div>
      <div class="form-container">
        <form action="" [formGroup]="notasForm" (ngSubmit)="submitNota()">
          <label for="notas" class="title-label">Título de la Nota</label>
          <input
            type="text"
            id="notas"
            name="notas"
            placeholder="Notas"
            class="title-input"
            formControlName="title"
            required
          />
          <br />
          <label for="content" class="content-label"
            >Contenido de la Nota</label
          >
          <textarea
            id="content"
            name="content"
            placeholder="Contenido de la nota"
            class="content-input"
            formControlName="content"
            required
          ></textarea>
          <br />
          <label for="etiqueta" class="etiqueta-label">Etiqueta</label>
          <select
            name="etiqueta"
            id="etiqueta"
            required
            class="etiqueta-select"
            formControlName="etiqueta"
          >
            <option value="" disabled selected>Seleccione una etiqueta</option>
            @for (etiqueta of etiquetaList; track etiqueta.id) {
            <option value="{{ etiqueta.etiqueta }}">{{ etiqueta.etiqueta }}</option>
            }
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
export class AddUpNotasComponent implements OnInit {
  @Input() etiquetaList: Etiqueta[] = [];
  @Input() notasPDetalle: any | null = null
  @Output() closeModal: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  @Output() saveNotas: EventEmitter<any> = new EventEmitter<any>();

  notasForm: any;

  constructor(private fb: FormBuilder) {
    this.notasForm = this.fb.group({
      title: [''],
      content: [''],
      etiqueta: [''],
    });
  }

  ngOnInit(): void {
    this.notasForm
    console.log('Notas Form Initialized:', this.notasPDetalle);
    if(this.notasPDetalle) {
      this.notasForm.patchValue({
        title: this.notasPDetalle.titulo,
        content: this.notasPDetalle.contenido,
        etiqueta: this.etiquetaList.find(
          (et) =>
            et.id === this.notasPDetalle?.etiquetas[0].id || {
              id: 0,
              etiqueta: '',
            }
        ),
      });
    }
  }

  submitNota() {
    const notaData: any = {
      title: this.notasForm.value.title,
      content: this.notasForm.value.content,
      etiquetasIds: [this.notasForm.value.etiqueta.id],
    };
    this.saveNotas.emit(notaData);
  }

  onCloseModal() {
    this.closeModal.emit(true);
  }
}
