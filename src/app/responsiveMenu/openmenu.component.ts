import { Component, OnInit, Input } from '@angular/core';




@Component({
  selector: 'app-openmenu',
  templateUrl: './openmenu.component.html',
  styleUrls: ['./openmenu.component.css']
})
export class OpenMenuComponent implements OnInit {
 @Input() public isShown:boolean;
 iconClass:string="fa-exclamation";
 leftClass:string="leftDesk";
 arrowclass:string="fa-arrow-circle-right";
  constructor() {
    this.isShown=true;
  }

  ngOnInit() {

  }

  closeModal(){
    this.isShown=false;
    this.leftClass="leftOut";
    this.arrowclass="fa-arrow-circle-right";
    document.getElementsByClassName("sidenav")[0].classList.remove("visible");
    document.getElementsByClassName("sidenav")[0].classList.add("oculta");
  }

  openModal(){
    this.isShown=true;
    this.leftClass="leftIn";
    this.arrowclass="fa-arrow-circle-left";
    if( document.getElementsByClassName("sidenav")[0].classList[1]=="desk")
      document.getElementsByClassName("sidenav")[0].classList.remove("desk");
    document.getElementsByClassName("sidenav")[0].classList.remove("oculta");
    document.getElementsByClassName("sidenav")[0].classList.add("visible");
  }

  showMenu(){
    if(this.isShown)
      this.closeModal();
    else 
      this.openModal();
  }
}
