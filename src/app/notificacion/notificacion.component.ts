import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
 @Input() public isShown:boolean;
 @Input() mensaje:string;
 iconClass:string="fa-exclamation";
  constructor() {
    this.isShown=true;
  }

  ngOnInit() {

  }

  closeModal(){
    this.isShown=false;
    this.iconClass="fa-exclamation";
  }

  openModal(){
    this.isShown=true;
    this.iconClass="fa-check";
  }

}
