import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Etiqueta } from '../../../etiquetas/interfaces/etiqueta';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotasP } from '../../interfaces/notas-p';

@Component({
  selector: 'app-add-up-notas',
  imports: [ReactiveFormsModule],
  template: `
    <div class="add-up-notas">
      <div class="header">
        <h2>{{ notasPDetalle != null ? 'Editar Nota' : 'Agregar Nota' }}</h2>
        <p>
          {{
            notasPDetalle != null
              ? 'Editando nota número ' + notasPDetalle.id
              : 'Agregando nota'
          }}
        </p>
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
          <fieldset>
            <legend>Etiquetas</legend>
            @for (etiqueta of etiquetaList; track etiqueta.id) {
            <label>
              <input
                type="checkbox"
                [value]="etiqueta.id"
                [checked]="
                  notasForm.get('etiqueta').value.includes(etiqueta.id)
                "
                (change)="onCheckboxChange($event)"
              />
              {{ etiqueta.etiqueta }}
            </label>
            }
          </fieldset>
          <br />
          <button
            type="submit"
            class="btn btn-primary"
            (click)="onCloseModal()"
          >
            {{ notasPDetalle != null ? 'Actualizar Nota' : 'Guardar Nota' }}
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
  @Input() notasPDetalle: NotasP | null = null;
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() saveNotas: EventEmitter<any> = new EventEmitter<any>();

  notasForm: any;

  constructor(private fb: FormBuilder) {
    this.notasForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      etiqueta: this.fb.array([], Validators.required),
    });
  }

  ngOnInit(): void {
    this.notasForm;
    if (this.notasPDetalle) {
      this.notasForm.patchValue({
        title: this.notasPDetalle.titulo,
        content: this.notasPDetalle.contenido,
      });
      this.setCheckboxes();
    }
  }

  setCheckboxes() {
    const etiquetaArray = this.notasForm.get('etiqueta') as FormArray;
    this.notasPDetalle?.etiquetas.forEach((id) => {
      etiquetaArray.push(this.fb.control(id));
    });
  }

  onCheckboxChange(event: any) {
    const etiquetaArray: FormArray = this.notasForm.get(
      'etiqueta'
    ) as FormArray;
    const idSelected = Number(event.target.value);
    if (event.target.checked) {
      etiquetaArray.push(this.fb.control(idSelected));
    } else {
      const index = etiquetaArray.controls.findIndex(
        (x: { value: number }) => x.value === idSelected
      );
      if (index !== -1) {
        etiquetaArray.removeAt(index);
      }
    }
  }

  submitNota() {
    const notaData: any = {
      id: this.notasPDetalle ? this.notasPDetalle.id : null,
      title: this.notasForm.value.title,
      content: this.notasForm.value.content,
      etiquetasIds: this.notasForm.value.etiqueta,
    };
    console.log('Nota Data:', notaData);
    this.saveNotas.emit(notaData);
  }

  onCloseModal() {
    this.closeModal.emit();
  }
}
