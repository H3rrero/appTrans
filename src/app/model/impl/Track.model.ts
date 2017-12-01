import { Punto } from "./Punto.model";
import { WayPoint } from "./WayPoint.model";

export class Track {
    autor: string;
    puntos: Punto[];
    nombre: string;
    waypoints:WayPoint[];
    constructor(puntos, autor, nombre, waypoints) {
        this.puntos = puntos;
        this.autor = autor;
        this.nombre = nombre;
        this.waypoints = waypoints;
    }
}
