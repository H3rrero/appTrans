import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";

export class GPXprocessing implements TrackProcessing {

    
    from(text: string): Track {
        let puntos: Punto[] = [];
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let puntosXMl = xml.getElementsByTagName("trkpt");
        let name = xml.getElementsByTagName("trk")[0].getElementsByTagName("name")[0];
        let autor = xml.getElementsByTagName("author")[0].getElementsByTagName("name")[0];
        for (let i = 0; i < puntosXMl.length; i++) {
            const lat = puntosXMl[i].attributes["lat"].nodeValue;
            const lon = puntosXMl[i].attributes["lon"].nodeValue;
            const ele = puntosXMl[i].getElementsByTagName("ele")[0].textContent;
            puntos.push(new Punto(ele,lat,lon));
        }
        return new Track(puntos, autor.textContent, name.textContent);

    }
    to(track: Track): string {
        //Cabecera del gpx
        let xml: string = 
        `       <?xml version="1.0" encoding="UTF-8" ?>
        <gpx xmlns="http://www.topografix.com/GPX/1/1" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" creator="Alejandro Fernández Herrero" 
         version="1.1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd">
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
                <trkseg>\n`;

        //Se recorren los puntos del track para crear el gpx
        for (var item in track.puntos) {
            xml = xml + 
            `                   <trkpt lat="${track.puntos[item].latitud}" lon="${track.puntos[item].longitud}">
                    <ele>${track.puntos[item].elevacion}</ele>
                </trkpt>\n`;
        }
        xml = xml +
         `              </trkseg>
            </trk>
        </gpx>`;
        return xml;
    }
}