export class WayPoint{
    cmt:string;
    descripcion:string;
    elevacion:number;
    latitud:number;
    longitud:number;
    nombre:string;
    time:string;
    constructor(nombre,latitud,longitud,elevacion,descripcion,time,cmt){
        this.cmt = cmt;
        this.descripcion = descripcion;
        this.elevacion = elevacion;
        this.latitud = latitud;
        this.longitud = longitud;
        this.nombre = nombre;
        this.time = time;
    }
}