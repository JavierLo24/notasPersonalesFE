import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Etiqueta } from '../interfaces/etiqueta';

@Injectable({
  providedIn: 'root'
})
export class EtiquetasService {

  constructor(private http: HttpClient) { }

  getEtiquetas() {
    return this.http.get<Etiqueta[]>('http://localhost:8080/etiqueta');
  }
}
