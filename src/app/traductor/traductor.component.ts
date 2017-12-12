import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'codemirror/mode/xml/xml';
import { CodemirrorComponent } from 'ng2-codemirror/lib/codemirror.component';
import { Punto } from '../model/impl/Punto.model';
import { Track } from '../model/impl/Track.model';
import { GPXprocessing } from '../model/impl/processing/GPXprocessing.model';
import { KMLprocessing } from '../model/impl/processing/KMLprocessing.model';
import { NotificacionComponent } from '../notificacion/notificacion.component';

const processors = {
  "GPX": new GPXprocessing(),
  "KML": new KMLprocessing()
}

@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.css']
})
export class TraductorComponent implements OnInit {

  config: object;
  configSalida: object;
  content: string;
  @Input() from: string;
  @Input() to: string;
  message: "Selecciona un formato de entrada y otro de salida";
  mensaje: string;
  salida: string;
  successMessage: boolean = false;
  @ViewChild(NotificacionComponent) notificacion:NotificacionComponent;
  title = "traductor";
  constructor() {
    this.config = { lineNumbers: true, mode: 'text/xml', theme: "base16-light" };
    this.configSalida = { lineNumbers: true, mode: 'text/xml', theme: "base16-light", readOnly: true };
    this.content =
      `    Selecciona un formato de entrada, uno de salida y luego pega aquí la entrada.
    Select an input format, an output format, and then paste the entry here.`
    this.salida =
      `    Aquí veras la salida.
    Here you will see the result.`
  }

  ngOnInit() {

  }

  importCode() {
    if (this.to == undefined || this.from == undefined)
      this.successMessage = true;
    else {
      this.successMessage = false;
      const toProcessor = processors[this.to];
      const fromProcessor = processors[this.from];
      let track: Track = fromProcessor.from(this.content);
      if(track.nombre!="-1"){
        this.salida = toProcessor.to(track);
        this.notificacion.openModal();
      }else{
        this.salida = toProcessor.to(track);
        this.notificacion.closeModal();
      }
    }
  }

}
