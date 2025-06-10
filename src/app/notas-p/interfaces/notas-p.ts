import { Etiqueta } from "../../etiquetas/interfaces/etiqueta";

export interface NotasP {
  id: number;
  titulo: string;
  contenido: string;
  etiquetas: Etiqueta[];
  fechaCreacion: Date | null;
}
