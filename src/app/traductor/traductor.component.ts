import { Component, OnInit,Input } from '@angular/core';
import 'codemirror/mode/xml/xml';
import { ViewChild } from '@angular/core/src/metadata/di';
import { CodemirrorComponent } from 'ng2-codemirror/lib/codemirror.component';
import { Punto } from '../model/impl/Punto.model';
import { Track } from '../model/impl/Track.model';
import { GPXprocessing } from '../model/impl/processing/GPXprocessing.model';
@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.css']
})
export class TraductorComponent implements OnInit {
  title = "traductor";
  config:object;
  content:string;
  salida:string;
  constructor() {
    this.config = { lineNumbers: true, mode: 'text/xml', theme: "base16-light" };
    this.content = `// ... some code !
package main

import "fmt"

// Send the sequence 2, 3, 4, ... to channel 'ch'.
func generate(ch chan<- int) {
	for i := 2; ; i++ {
		ch <- i  // Send 'i' to channel 'ch'
	}
}`
this.salida = `// ... some code !
package main

import "fmt"

// Send the sequence 2, 3, 4, ... to channel 'ch'.
func generate(ch chan<- int) {
	for i := 2; ; i++ {
		ch <- i  // Send 'i' to channel 'ch'
	}
}`
  }

  ngOnInit() {
  }

  importCode() {
     let gpx = new GPXprocessing();
     let track =gpx.from(this.content);
     this.salida = gpx.to(track);
 
  }
}
