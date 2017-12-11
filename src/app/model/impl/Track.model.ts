import { Punto } from "./Punto.model";
import { WayPoint } from "./WayPoint.model";

export class Track {
    autor: string;
    nombre: string;
    puntos: Punto[];
    waypoints:WayPoint[];
    constructor(puntos, autor, nombre, waypoints) {
        this.autor = autor;
        this.nombre = nombre;
        this.puntos = puntos;
        this.waypoints = waypoints;
    }
}
