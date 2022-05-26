import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission/permission.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  user : any = {} ;
  formList : any = [] ;
  constructor(private router : Router , private permissionService : PermissionService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')   ; 
    if(this.user.id == null){
      this.router.navigate(['/login']);
    }
    this.formList = JSON.parse(localStorage.getItem('forms') || '[]')   ; 
    this.checkPermission();
  }


  checkPermission(){
    
    for(let form of this.formList){
      this.user = this.permissionService.checkPermission(form , this.user);
      if(this.user.hasPrevilage){
        form.hasPrevilage = true ;
      }
    }
  }


}
