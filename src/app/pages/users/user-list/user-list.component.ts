import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  routes : any = [ {"title": "کاربران" , "link": '/users' } ];
  userList : any = [] ;
  
  constructor() { }
 
  ngOnInit(): void {
    this.userList = JSON.parse(localStorage.getItem('users') || '[]')   ; 
  }

}
