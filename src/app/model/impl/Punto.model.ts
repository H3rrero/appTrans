export class Punto {
    elevacion: number;
    latitud: number;
    longitud: number;
    time:string;
    constructor(elevacion, latitud, longitud, time) {
        this.elevacion = elevacion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.time = time;
    }
}