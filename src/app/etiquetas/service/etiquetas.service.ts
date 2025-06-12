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

  getEtiquetaDetalle(id: number) {
    return this.http.get<Etiqueta>('http://localhost:8080/etiqueta/' + id);
  }

  saveEtiqueta(etiqueta: Etiqueta) {
    return this.http.post<Etiqueta>('http://localhost:8080/etiqueta/crear', etiqueta);
  }

  updateEtiqueta(etiqueta: Etiqueta, etiquetaId: number) {
    return this.http.put<Etiqueta>(
      'http://localhost:8080/etiqueta/editar/' + etiquetaId,
      etiqueta
    );
  }

  deleteEtiqueta(etiquetaId: number) {
    return this.http.delete('http://localhost:8080/etiqueta/eliminar/' + etiquetaId);
  }
}
