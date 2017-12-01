import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";
import { WayPoint } from "../WayPoint.model";

export class KMLprocessing implements TrackProcessing {

    from(text: string): Track {
        let puntos: Punto[] = [];
        let wayPoints: WayPoint[] = [];
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let wpt = xml.getElementsByTagName("Point");
        let puntosXMl = xml.getElementsByTagName("MultiGeometry")[0].getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].textContent;
        let tuplas = puntosXMl.split(" ");
        let name = xml.getElementsByTagName("name")[0].textContent;
        let descripcion = xml.getElementsByTagName("description")[0].textContent;
        let autor = "anonimo";
        for (let i = 0; i < wpt.length; i++) {
            let datos:string[] = wpt[i].getElementsByTagName("coordinates")[0].textContent.split(",");
            const lat = datos[1];
            const lon = datos[0];
            let ele = datos[2];
            let nombre = "Waypoint";
            let desc = "Waypoint description";
            let time = "noTime";
            let cmt = "Waypoint coment";
            wayPoints.push(new WayPoint(nombre, lat, lon, ele, desc, time, cmt));
        }
        for (let i = 0; i < tuplas.length; i++) {
            const puntoXML = tuplas[i].split(",");
            const lat = puntoXML[1];
            const lon = puntoXML[0];
            const ele = puntoXML[2];
            let time = "noTime";
            puntos.push(new Punto(ele, lat, lon,time));
        }
        return new Track(puntos, autor, name, wayPoints);
    }
    to(track: Track): string { return ""; }
}