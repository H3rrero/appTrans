import { Component, ViewChild } from '@angular/core';
import { TraductorComponent } from './traductor/traductor.component';
import { timeout } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  from: string;
  to: string;
  @ViewChild(TraductorComponent) traductor: TraductorComponent;
  onSelectFrom(from) {
    this.from = from;
  }
  onSelectTo(to) {
    this.to = to;
  }

}
