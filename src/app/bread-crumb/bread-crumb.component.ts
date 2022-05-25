import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  constructor() { }

  @Input() routes : any = [] ;

  ngOnInit(): void {
  }


}
