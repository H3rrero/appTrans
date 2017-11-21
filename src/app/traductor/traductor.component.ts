import { Component, OnInit } from '@angular/core';
import 'codemirror/mode/xml/xml';
@Component({
  selector: 'app-traductor',
  templateUrl: './traductor.component.html',
  styleUrls: ['./traductor.component.css']
})
export class TraductorComponent implements OnInit {
  title = "traductor";
  config;
  content;
  constructor() {
    this.config = { lineNumbers: true, mode: 'text/xml', theme:"base16-light" };
    this.content = `// ... some code !
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

}
