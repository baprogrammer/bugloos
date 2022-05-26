import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayOperationService } from 'src/app/services/general/array-operation.service';
import { PermissionService } from 'src/app/services/permission/permission.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private permissionService : PermissionService , private route : ActivatedRoute , 
    private arrayService : ArrayOperationService , private router : Router) { }

  form : any = { } ;
  user : any = {} ;
  formList : any = [] ;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')   ; 
    this.formList = JSON.parse(localStorage.getItem('forms') || '{}')   ; 

    this.route.paramMap.subscribe(
      params => {
        let id = params.get("id");
        if(id != null){
          let foundedForm = this.arrayService.find(this.formList , id);
          if(foundedForm.length > 0){
            this.form = foundedForm[0];
            this.user = this.permissionService.checkPermission(this.form , this.user);
            if(this.user.hasPrevilage){

            }
            else{
              this.router.navigate(['/user/forms']);    
            }
          }
          else{
            this.router.navigate(['/user/forms']);  
          }
        }
        else{
          this.router.navigate(['/user/forms']);
        }
        
      });

  }

  

}
