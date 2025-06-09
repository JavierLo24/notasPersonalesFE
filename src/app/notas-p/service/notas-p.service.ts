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

  saveNotasP(nota: NotasP) {
    return this.http.post<NotasP>('http://localhost:8080/notas/crear', nota);
  }
}
