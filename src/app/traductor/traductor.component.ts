import { Component, OnInit, Input, ViewChild } from '@angular/core';
import 'codemirror/mode/xml/xml';
import { CodemirrorComponent } from 'ng2-codemirror/lib/codemirror.component';
import { Punto } from '../model/impl/Punto.model';
import { Track } from '../model/impl/Track.model';
import { GPXprocessing } from '../model/impl/processing/GPXprocessing.model';
import { KMLprocessing } from '../model/impl/processing/KMLprocessing.model';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { Observable } from 'rxjs/Observable';

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
  private _from: string;
  private _to: string;
  message: "Selecciona un formato de entrada y otro de salida";
  mensaje: string;
  salida: string;
  successMessage: boolean = false;
  @ViewChild(NotificacionComponent) notificacion: NotificacionComponent;
  title = "traductor";


  get from(): string {
    return this._from;
  }

  @Input()
  set from(from: string) {
    this._from = from;
    this.importCode();
  }

  get to(): string {
    return this._to
  }

  @Input()
  set to(to: string) {
    this._to = to;
    this.importCode();
  }

  constructor() {
    this.config = { lineNumbers: true, mode: 'text/xml', theme: "base16-light" };
    this.configSalida = { lineNumbers: true, mode: 'text/xml', theme: "base16-light", readOnly: true };
    this.content =
      `    Selecciona un formato de entrada, uno de salida y luego pega aquí la entrada 
      o arrastra y suelta el fichero.
      
    Select an input format, an output format,and then paste the entry here
     or drag and drop the file.`
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
      if (track.nombre != "-1") {
        this.salida = toProcessor.to(track);
        this.notificacion.openModal();
      } else {
        this.salida = toProcessor.to(track);
        this.notificacion.closeModal();
      }
    }
  }
  onDrop(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("onDrop",event.dataTransfer.files[0]);
    var myReader:FileReader = new FileReader();
    myReader.readAsText(event.dataTransfer.files[0]);
    
    myReader.onloadend = (e)=>{
      this.content =myReader.result;
      this.importCode();
    }
  }
  onDragOver(event){
    event.preventDefault();
    event.stopPropagation();
    console.log("onDragOver", event);
  }

}
