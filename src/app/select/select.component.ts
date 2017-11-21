import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  title = "select";
  @Input() selectedValue:string;
  @Input() leng;
  opened:boolean;
  constructor() 
  { 
    this.opened=false;
  }

  ngOnInit() {
   
  }

  selectValue(l:string):void{
    this.selectedValue = l;
  }
  toggleSelect():void {
    this.opened= !this.opened;
  }
}
