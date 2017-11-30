import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  from:string;
  to:string;

  onSelectFrom(from) {
    this.from=from;
  }
  onSelectTo(to){
    this.to=to;
  }
}
