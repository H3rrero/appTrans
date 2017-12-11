import { Component, OnInit, Input } from '@angular/core';
import 'codemirror/mode/xml/xml';
import { ViewChild } from '@angular/core/src/metadata/di';
import { CodemirrorComponent } from 'ng2-codemirror/lib/codemirror.component';
import { Punto } from '../model/impl/Punto.model';
import { Track } from '../model/impl/Track.model';
import { GPXprocessing } from '../model/impl/processing/GPXprocessing.model';
import { KMLprocessing } from '../model/impl/processing/KMLprocessing.model';

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

  @Input() from: string;
  @Input() to: string;
  title = "traductor";
  config: object;
  configSalida: object;
  content: string;
  salida: string;
  successMessage: boolean = false;
  message: "Selecciona un formato de entrada y otro de salida"
  constructor() {
    this.config = { lineNumbers: true, mode: 'text/xml', theme: "base16-light" };
    this.configSalida = { lineNumbers: true, mode: 'text/xml', theme: "base16-light",readOnly: true };
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
      this.salida = toProcessor.to(fromProcessor.from(this.content));
    }
  }

}
