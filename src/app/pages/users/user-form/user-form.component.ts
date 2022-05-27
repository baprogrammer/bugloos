import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayOperationService } from 'src/app/services/general/array-operation.service';
import { SnackbarService } from 'src/app/services/general/snackbar.service';
import { PermissionService } from 'src/app/services/permission/permission.service';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  constructor(private permissionService : PermissionService , private route : ActivatedRoute , 
    private arrayService : ArrayOperationService , private router : Router ,private snackbarService : SnackbarService) { }

  form : any = { } ;
  user : any = {} ;
  formList : any = [] ;

  // public Editor = ClassicEditor;


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
              for(let component of this.form.components){
                this.user = this.permissionService.checkComponentPermission(this.user , component) ;
                if(this.user.hasPrevilage){
                  component.hasPrevilage = true ;
                }
                this.user.hasPrevilage = false ;
              }
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

  sendForm(){
    if(this.validateForm(this.form)){
      this.snackbarService.success("شما با موفقیت فرم رو ارسال کردید" , 5000);
    }
    else{
      this.snackbarService.error("خطایی در ورودی های شما وجود دارد" , 5000);
    }
  }


  //============== this is simple validation for just test - we can use validator libraries like joi and ...
  validateForm(form : any){ // ============= validation just for text input Yet :)
    let components = form.components ;
    form.isValid = true ;
    for(let component of components){
      if(component.type == 'text'){
        if(component.regex != "" ){
          let regex  ;
          if(component.regex == 'number' ){
            regex =/^\d+$/ ;
          }
          if(component.regex == 'text' ){
            regex = /^[a-zA-Z ]*$/ ;
          }
          if(component.regex == 'all' ){
            regex = /^[a-zA-Z0-9_.-]*$/ ;
          }
          if(component.regex == 'phone' ){
            regex =/^0(9|4)\d{9}$/ ;
          }
          if(regex != undefined){
            let result = regex.test(component.value);
            if(!result){
              form.isValid = false ;
              component.isNotValid = true ;
            }
            else{
              component.isNotValid = false ;
            }
          }
        }
      }
    }
    return form.isValid ;
  }

}
