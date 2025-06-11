import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotasP } from '../interfaces/notas-p';

@Injectable({
  providedIn: 'root'
})
export class NotasPService {

  constructor(private http: HttpClient) { }

  getNotasP() {
    return this.http.get<NotasP[]>('http://localhost:8080/notas');
  }

  getNotasPDetalle(id: number) {
    return this.http.get<NotasP>('http://localhost:8080/notas/' + id);
  }

  saveNotasP(nota: NotasP) {
    return this.http.post<NotasP>('http://localhost:8080/notas/crear', nota);
  }

  updateNotasP(nota: NotasP, notaId: number) {
    return this.http.put<NotasP>(
      'http://localhost:8080/notas/editar/' + notaId,
      nota
    );
  }

  deleteNotasP(notaId: number) {
    return this.http.delete('http://localhost:8080/notas/eliminar/' + notaId);
  }
}
