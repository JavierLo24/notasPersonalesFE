import { Component } from '@angular/core';
import { NotasListComponent } from '../components/notas-list/notas-list.component';
import { AddUpNotasComponent } from '../components/add-up-notas/add-up-notas.component';

@Component({
  selector: 'app-notas',
  imports: [NotasListComponent, AddUpNotasComponent],
  template: `
    @if(!addModalOpen){
    <app-notas-list (closeModal)="toggleAddModal()"></app-notas-list>
    <div>
      <button (click)="toggleAddModal()">Add Notas</button>
    </div>
    }
    @if(addModalOpen){
      <button (click)="toggleAddModal()">Close</button>
    <app-add-up-notas (closeModal)="toggleAddModal()"></app-add-up-notas>
    }
  `,
  styles: ``,
})
export class NotasComponent {
  addModalOpen: boolean = false;
  toggleAddModal() {
    this.addModalOpen = !this.addModalOpen;
  }
}
