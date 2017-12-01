export class WayPoint{
    nombre:string;
    latitud:number;
    longitud:number;
    elevacion:number;
    descripcion:string;
    time:string;
    cmt:string;
    constructor(nombre,latitud,longitud,elevacion,descripcion,time,cmt){
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.elevacion = elevacion;
        this.descripcion = descripcion;
        this.time = time;
        this.cmt = cmt;
    }
}