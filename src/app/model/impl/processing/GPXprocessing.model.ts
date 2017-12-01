import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";
import { WayPoint } from "../WayPoint.model";

export class GPXprocessing implements TrackProcessing {


    from(text: string): Track {
        let puntos: Punto[] = [];
        let wayPoints: WayPoint[] = [];
        let autor = "Anonimo";
        let xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let wpt = xml.getElementsByTagName("wpt");
        let puntosXMl = xml.getElementsByTagName("trkpt");
        let name = xml.getElementsByTagName("trk")[0].getElementsByTagName("name")[0];
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
            const lat = wpt[i].attributes["lat"].nodeValue;
            const lon = wpt[i].attributes["lon"].nodeValue;
            let ele = "0";
            let nombre = "Waypoint";
            let desc = "Waypoint description";
            let time = "noTime";
            let cmt = "Waypoint coment";
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

    }
    to(track: Track): string {
        console.log(track);
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
    }
    generatePointsXml(points: Punto[]) {
        return points.map((p) =>
            `                   <trkpt lat="${p.latitud}" lon="${p.longitud}">
                        <ele>${p.elevacion}</ele>
                        ${this.generateTime(p.time)}
                   </trkpt>\n`).join('');
    }
    generateWayPointsXml(points: WayPoint[]) {
        return points.map((p) =>
            `                   <wpt lat="${p.latitud}" lon="${p.longitud}">
                        <ele>${p.elevacion}</ele>
                        ${this.generateTime(p.time)}
                        <name>${p.nombre}</name>
                        <cmt>${p.cmt}</cmt>
                        <desc>${p.descripcion}</desc>
                   </wpt>\n`).join('');
    }
    generateTime(time) {
       return time !== 'noTime' ? `<time>${time}</time>` : '';
    }
}