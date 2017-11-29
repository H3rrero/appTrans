import { Punto } from "./Punto.model";

export class Track {
    autor: string;
    puntos: Punto[];
    nombre: string;
    constructor(puntos, autor, nombre) {
        this.puntos = puntos;
        this.autor = autor;
        this.nombre = nombre;

    }
}
