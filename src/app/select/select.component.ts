import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  title = "select";
  @Output() onSelect:EventEmitter<string>;
  @Input() selectedValue:string;
  @Input() leng;
  opened:boolean;
  constructor() 
  { 
    this.opened=false;
    this.onSelect=new EventEmitter();
  }

  ngOnInit() {
   
  }

  selectValue(l:string):void{
    this.selectedValue = l;
    this.onSelect.emit(this.selectedValue);
  }
  toggleSelect():void {
    this.opened= !this.opened;
  }
}
