import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @Input() label: string = "";

  @Input() type : string = "";

  @Input() size : string = "";

  @Input() id : number = 0;

  @Input() name : string = "";


  constructor() { }

  ngOnInit(): void {
  }

}
