import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {

  routes : any = [ {"title": "فرم ها" , "link": '/forms' } ];
  formList : any = [] ;

  constructor() { }

  ngOnInit(): void {
    this.formList = JSON.parse(localStorage.getItem('forms') || '[]')   ; 
  }

}
