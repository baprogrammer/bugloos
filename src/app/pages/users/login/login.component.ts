import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/general/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user : any = { } ;
  constructor(private router : Router , private snackbarService : SnackbarService ) { }
  userList : any = [];

  isValid : boolean = true ;

  ngOnInit(): void {
    this.userList = JSON.parse(localStorage.getItem('users') || '[]')   ; 
  }

  login(){
    let i = 0 ;
    for(let user of this.userList){
      if(user.name == this.user.name){
        if(user.password == this.user.password){
          localStorage.setItem('loggedInUser',  JSON.stringify(user));
          this.snackbarService.success("شما وارد سیستم شدید" , 4000);
          this.router.navigate(['/user/forms']);
          i ++ ;
        }
      }
    }
    if(i==0){
      console.log("not logged In");
    }
  }

}
