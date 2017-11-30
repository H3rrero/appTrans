import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";

export class KMLprocessing implements TrackProcessing {

    from(text: string): Track {
        let puntos: Punto[] = [];
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        console.log(xml)
        let puntosXMl = xml.getElementsByTagName("MultiGeometry")[0].getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].textContent;
        let tuplas = puntosXMl.split(" ");
        let name = xml.getElementsByTagName("name")[0].textContent;
        let descripcion = xml.getElementsByTagName("description")[0].textContent;
        let autor = "anonimo";
        console.log(puntosXMl)
        for (let i = 0; i < tuplas.length; i++) {
            const puntoXML =tuplas[i].split(",");
            const lat = puntoXML[1];
            const lon = puntoXML[0];
            const ele = puntoXML[2];
            puntos.push(new Punto(ele, lat, lon));
        }
        return new Track(puntos, autor, name);
    }
    to(track: Track): string { return ""; }
}