import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-radio-component',
  templateUrl: './radio-component.component.html',
  styleUrls: ['./radio-component.component.css']
})
export class RadioComponentComponent implements OnInit {

  @Input() options : any = [] ;
  @Input() stringOptions : string = "" ;
  @Input() name : string = "" ;

  constructor() { }

  ngOnInit(): void {
    let i = 0 ;
    if(this.stringOptions != ""){
      let stringOptionsArray = this.stringOptions.split(',');
      this.options = [];
      for(let str of stringOptionsArray){
        i++;
        let strObject :any = { } ;
        strObject.title = str ;
        strObject.value = i ;
        this.options.push(strObject);
      }
    }
  }

}
