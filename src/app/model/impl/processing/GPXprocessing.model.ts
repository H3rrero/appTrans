import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";

export class GPXprocessing implements TrackProcessing {


    from(text: string): Track {
        let puntos: Punto[] = [];
        let autor = "Anonimo";
        let xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let puntosXMl = xml.getElementsByTagName("trkpt");
        let name = xml.getElementsByTagName("trk")[0].getElementsByTagName("name")[0];
        if(xml.getElementsByTagName("author")[0] != undefined)
         autor = xml.getElementsByTagName("author")[0].getElementsByTagName("name")[0].textContent;
        for (let i = 0; i < puntosXMl.length; i++) {
            const lat = puntosXMl[i].attributes["lat"].nodeValue;
            const lon = puntosXMl[i].attributes["lon"].nodeValue;
            const ele = puntosXMl[i].getElementsByTagName("ele")[0].textContent;
            puntos.push(new Punto(ele, lat, lon));
        }
        return new Track(puntos, autor, name.textContent);

    }
    to(track: Track): string {
        //Cabecera del gpx
        let xml: string =
            `<?xml version="1.0" encoding="UTF-8"?>
            <gpx creator="Anonimo" version="1.1" xmlns="http://www.topografix.com/GPX/1/1" 
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="
            http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
            <metadata>
                <name>${track.nombre}</name>
                <author>
                    <name>${track.autor}</name>
                    <link href="http://herrero.ninja/TFG/index.html">
                        <text>${track.nombre}</text>
                    </link>
                </author>
                <link href="https://h3rrero.github.io/TFG-GPS/">
                    <text>${track.nombre}</text>
                </link>
            </metadata>
            <trk>
                <name> ${track.nombre} </name>
                <trkseg>
${this.generatePointsXml(track.puntos)}
                </trkseg>
            </trk>
        </gpx>`
        return xml;
    }
    generatePointsXml(points: Punto[]) {
        return points.map((p) =>
            `                   <trkpt lat="${p.latitud}" lon="${p.longitud}">
                        <ele>${p.elevacion}</ele>
                   </trkpt>\n`).join('');
    }
}