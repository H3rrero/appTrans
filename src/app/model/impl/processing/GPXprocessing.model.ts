import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";
import { WayPoint } from "../WayPoint.model";

export class GPXprocessing implements TrackProcessing {


    from(text: string): Track {
        let autor = "Anonimo";
        let puntos: Punto[] = [];
        let xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let wayPoints: WayPoint[] = [];
        if (this.checkErrors(xml)["respuesta"]) {
            let name = xml.getElementsByTagName("trk")[0].getElementsByTagName("name")[0];
            let puntosXMl = xml.getElementsByTagName("trkpt");
            let wpt = xml.getElementsByTagName("wpt");
            if (xml.getElementsByTagName("author")[0] != undefined)
                autor = xml.getElementsByTagName("author")[0].getElementsByTagName("name")[0].textContent;
            for (let i = 0; i < puntosXMl.length; i++) {
                const lat = puntosXMl[i].attributes["lat"].nodeValue;
                const lon = puntosXMl[i].attributes["lon"].nodeValue;
                let ele = "0";
                let time = "noTime";
                if (puntosXMl[i].getElementsByTagName("ele")[0] != undefined)
                    ele = puntosXMl[i].getElementsByTagName("ele")[0].textContent;
                if (puntosXMl[i].getElementsByTagName("time")[0] != undefined)
                    time = puntosXMl[i].getElementsByTagName("time")[0].textContent;
                puntos.push(new Punto(ele, lat, lon, time));
            }
            for (let i = 0; i < wpt.length; i++) {
                let cmt = "Waypoint coment";
                let desc = "Waypoint description";
                let ele = "0";
                const lat = wpt[i].attributes["lat"].nodeValue;
                const lon = wpt[i].attributes["lon"].nodeValue;
                let nombre = "Waypoint";
                let time = "noTime";
                if (wpt[i].getElementsByTagName("ele")[0] != undefined)
                    ele = wpt[i].getElementsByTagName("ele")[0].textContent;
                if (wpt[i].getElementsByTagName("name")[0] != undefined)
                    nombre = wpt[i].getElementsByTagName("name")[0].textContent;
                if (wpt[i].getElementsByTagName("desc")[0] != undefined)
                    desc = wpt[i].getElementsByTagName("desc")[0].textContent;
                if (wpt[i].getElementsByTagName("time")[0] != undefined)
                    time = wpt[i].getElementsByTagName("time")[0].textContent;
                if (wpt[i].getElementsByTagName("cmt")[0] != undefined)
                    cmt = wpt[i].getElementsByTagName("cmt")[0].textContent;
                wayPoints.push(new WayPoint(nombre, lat, lon, ele, desc, time, cmt));

            }
            return new Track(puntos, autor, name.textContent, wayPoints);
        } else {
            return new Track(puntos, this.checkErrors(xml)["error"], "-1", wayPoints);
        }


    }
    to(track: Track): string {
        if (track.nombre != "-1") {
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
${this.generateWayPointsXml(track.waypoints)}
            <trk>
                <name> ${track.nombre} </name>
                <trkseg>
${this.generatePointsXml(track.puntos)}
                </trkseg>
            </trk>
        </gpx>`
            return xml;
        } else {
            return track.autor;
        }
    }
    generatePointsXml(points: Punto[]): string {
        console.log("Puntos gpx");
        console.log(points);
        return points.map((p) => {
            if (p.latitud != undefined)
                return `                   <trkpt lat="${p.latitud}" lon="${p.longitud}">
            <ele>${p.elevacion}</ele>
            ${this.generateTime(p.time)}
       </trkpt>\n`;
        }).join('');
    }
    generateWayPointsXml(points: WayPoint[]): string {
        return points.map((p) =>
            `                   <wpt lat="${p.latitud}" lon="${p.longitud}">
                        <ele>${p.elevacion}</ele>
                        ${this.generateTime(p.time)}
                        <name>${p.nombre}</name>
                        <cmt>${p.cmt}</cmt>
                        <desc>${p.descripcion}</desc>
                   </wpt>\n`).join('');
    }
    generateTime(time): string {
        return time !== 'noTime' ? `<time>${time}</time>` : '';
    }

    checkErrors(xml): object {
        if (xml.childNodes[0].textContent != null) {
            if (xml.childNodes[0].textContent.indexOf("error") == -1) {
                if (xml.childNodes[0]["tagName"] == "gpx") {
                    return { respuesta: true, mensaje: "GPX bien formado", error: "ninguno" };
                } else {
                    return { respuesta: false, mensaje: "La entrada tiene que estar en formato GPX", error: "La entrada tiene que estar en formato GPX" };
                }
            } else {
                return { respuesta: false, mensaje: "Documento no válido", error: xml.childNodes[0].textContent };
            }
        } else {
            return { respuesta: false, mensaje: "Documento no válido", error: xml.childNodes[0].textContent };
        }
    }

}