import { TrackProcessing } from "../../TrackProcessing.interface";
import { Track } from "../Track.model";
import { Punto } from "../Punto.model";
import { WayPoint } from "../WayPoint.model";

export class KMLprocessing implements TrackProcessing {

    from(text: string): Track {
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        if (xml.getElementsByTagName("gx:coord")[0] != undefined) {
            return this.fromFormatNew(text);
        } else {
            return this.fromFormatOld(text);
        }
    }
    to(track: Track): string {
        if (track.nombre != "-1") {
            let xml: string =
                `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2" xmlns:gx="http://www.google.com/kml/ext/2.2" xmlns:kml="http://www.opengis.net/kml/2.2" xmlns:atom="http://www.w3.org/2005/Atom">
        <Folder>
            <name>Lugares temporales</name>
            <open>1</open>
            <Folder>
                <name>Lugares temporales</name>
                <open>1</open>
            </Folder>
            <Document>
                <name>GPS device</name>
                <snippet>Created ${Date()}</snippet>
                <LookAt>
                    <gx:TimeSpan>
                        <begin>${track.puntos[0].time}</begin>
                        <end>${track.puntos[track.puntos.length - 1].time}</end>
                    </gx:TimeSpan>
                    <longitude>${track.puntos[0].longitud}</longitude>
                    <latitude>${track.puntos[0].latitud}</latitude>
                    <altitude>0</altitude>
                    <heading>0</heading>
                    <tilt>0</tilt>
                    <range>4372.51637</range>
                </LookAt>
                <StyleMap id="multiTrack">
                    <Pair>
                        <key>normal</key>
                        <styleUrl>#multiTrack_n</styleUrl>
                    </Pair>
                    <Pair>
                        <key>highlight</key>
                        <styleUrl>#multiTrack_h</styleUrl>
                    </Pair>
                </StyleMap>
                <StyleMap id="waypoint">
                    <Pair>
                        <key>normal</key>
                        <styleUrl>#waypoint_n</styleUrl>
                    </Pair>
                    <Pair>
                        <key>highlight</key>
                        <styleUrl>#waypoint_h</styleUrl>
                    </Pair>
                </StyleMap>
                <Style id="multiTrack_n">
                    <IconStyle>
                        <Icon>
                            <href>http://earth.google.com/images/kml-icons/track-directional/track-0.png</href>
                        </Icon>
                    </IconStyle>
                    <LineStyle>
                        <color>99ffac59</color>
                        <width>6</width>
                    </LineStyle>
                </Style>
                <Style id="multiTrack_h">
                    <IconStyle>
                        <scale>1.2</scale>
                        <Icon>
                            <href>http://earth.google.com/images/kml-icons/track-directional/track-0.png</href>
                        </Icon>
                    </IconStyle>
                    <LineStyle>
                        <color>99ffac59</color>
                        <width>8</width>
                    </LineStyle>
                </Style>
                <Style id="waypoint_h">
                    <IconStyle>
                        <scale>1.2</scale>
                        <Icon>
                            <href>http://maps.google.com/mapfiles/kml/pal4/icon61.png</href>
                        </Icon>
                    </IconStyle>
                </Style>
                <Style id="waypoint_n">
                    <IconStyle>
                        <Icon>
                            <href>http://maps.google.com/mapfiles/kml/pal4/icon61.png</href>
                        </Icon>
                    </IconStyle>
                </Style>
                <Folder>
                    <name>Waypoints</name>
                    ${this.generateWaypoints(track.waypoints)}
                </Folder>
                <Folder>
                    <name>Tracks</name>
                    <Placemark>
                        <name>${track.nombre}</name>
                        <styleUrl>#multiTrack</styleUrl>
                        <gx:Track>
                            ${this.generateTimes(track.puntos)}
                            ${this.generateCoordinates(track.puntos)}
                        </gx:Track>
                    </Placemark>
                </Folder>
            </Document>
        </Folder>
        </kml>`;
            return xml;
        } else {
            return track.autor;
        }
    }

    generateCoordinates(pts: Punto[]): string {
        return pts.map((p) =>
            `<gx:coord>${p.longitud},${p.latitud},${p.elevacion}</gx:coord>
            `).join('');
    }
    generateTimes(pts: Punto[]): string {
        return pts.map((p) =>
            `<when>${p.time}</when>
            `).join('');
    }
    generateWaypoints(pts: WayPoint[]): string {
        return pts.map((p) =>
            `<Placemark>
                <TimeStamp><when>${p.time}</when>
                </TimeStamp>
                <name>${p.nombre}</name>
                <description>${p.descripcion}</description>
                <styleUrl>#waypointStyle</styleUrl>
                <Point>
                    <coordinates>${p.longitud},${p.latitud},${p.elevacion}</coordinates>
                </Point>
            </Placemark>`).join('');
    }

    checkErrors(xml): object {
        if (xml.childNodes[0].textContent != null) {
            if (xml.childNodes[0].textContent.indexOf("error") == -1) {
                if (xml.childNodes[0]["tagName"] == "kml") {
                    return { respuesta: true, mensaje: "KML bien formado", error: "ninguno" };
                } else {
                    return { respuesta: false, mensaje: "La entrada tiene que estar en formato KML", error: "La entrada tiene que estar en formato KML" };
                }
            } else {
                return { respuesta: false, mensaje: "Documento no válido", error: xml.childNodes[0].textContent };
            }
        } else {
            return { respuesta: false, mensaje: "Documento no válido", error: xml.childNodes[0].textContent };
        }
    }

    fromFormatNew(text: string) {
        let autor = "anonimo";
        let name = "track";
        let descripcion = "description";
        let puntos: Punto[] = [];
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let wayPoints: WayPoint[] = [];
        if (this.checkErrors(xml)["respuesta"]) {
            if (xml.getElementsByTagName("description")[0] != undefined)
                descripcion = xml.getElementsByTagName("description")[0].textContent;
            if (xml.getElementsByTagName("name")[0] != undefined)
                name = xml.getElementsByTagName("name")[0].textContent;
            let whenPoint = xml.getElementsByTagName("when");
            let coordPoint = xml.getElementsByTagName("gx:Track")[0].getElementsByTagName("gx:coord");
            let wpt = xml.getElementsByTagName("Point");
            for (let i = 0; i < wpt.length; i++) {
                let cmt = "Waypoint coment";
                let datos: string[] = wpt[i].getElementsByTagName("coordinates")[0].textContent.split(",");
                let desc = "Waypoint description";
                let ele = "0";
                const lat = datos[1];
                const lon = datos[0];
                let nombre = "Waypoint";
                let time = "2017-11-02T12:40:35Z";
                if (datos[2] != undefined)
                    ele = datos[2];
                wayPoints.push(new WayPoint(nombre, lat, lon, ele, desc, time, cmt));
            }
            for (let i = 0; i < coordPoint.length; i++) {
                const puntoXML = coordPoint[i].textContent.split(",");
                const lat = puntoXML[1];
                const lon = puntoXML[0];
                let ele = "0";
                let time = "2017-11-02T12:40:35Z";
                if (whenPoint[i] != undefined)
                    time = whenPoint[i].textContent;
                if (puntoXML[2] != undefined)
                    ele = puntoXML[2];
                puntos.push(new Punto(ele, lat, lon, time));
            }
            return new Track(puntos, autor, name, wayPoints);
        } else {
            return new Track(puntos, this.checkErrors(xml)["error"], "-1", wayPoints);
        }
    }

    fromFormatOld(text: string): Track {
        let autor = "anonimo";
        let puntos: Punto[] = [];
        let name = "track";
        let descripcion = "description";
        const xml = (new DOMParser()).parseFromString(text, 'application/xml');
        let wayPoints: WayPoint[] = [];
        if (this.checkErrors(xml)["respuesta"]) {
            descripcion = xml.getElementsByTagName("description")[0].textContent;
            name = xml.getElementsByTagName("name")[0].textContent;
            let puntosXMl = xml.getElementsByTagName("MultiGeometry")[0].getElementsByTagName("LineString")[0].getElementsByTagName("coordinates")[0].textContent;
            let tuplas = puntosXMl.split(" ");
            let wpt = xml.getElementsByTagName("Point");
            for (let i = 0; i < wpt.length; i++) {
                let cmt = "Waypoint coment";
                let datos: string[] = wpt[i].getElementsByTagName("coordinates")[0].textContent.split(",");
                let desc = "Waypoint description";
                let ele = "0";
                const lat = datos[1];
                const lon = datos[0];
                let nombre = "Waypoint";
                let time = "noTime";
                if (datos[2] != undefined)
                    ele = datos[2];
                wayPoints.push(new WayPoint(nombre, lat, lon, ele, desc, time, cmt));
            }
            for (let i = 0; i < tuplas.length; i++) {
                const puntoXML = tuplas[i].split(",");
                const lat = puntoXML[1];
                const lon = puntoXML[0];
                let ele = "0";
                if (puntoXML[2] != undefined)
                    ele = puntoXML[2];
                let time = "noTime";
                puntos.push(new Punto(ele, lat, lon, time));
            }
            return new Track(puntos, autor, name, wayPoints);
        } else {
            return new Track(puntos, this.checkErrors(xml)["error"], "-1", wayPoints);
        }
    }
}