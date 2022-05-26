import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArrayOperationService } from 'src/app/services/general/array-operation.service';

import { SwalService } from 'src/app/services/messaging/sweetalert/swal.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private route : ActivatedRoute , private router : Router , private swalService : SwalService , 
              private arrayService : ArrayOperationService ) { }

  routes : any = [
    {"title": "کاربران" , "link": '/users' } ,
    {"title": "افزودن کاربر" , "link": '/edit-user' } 
  ];

  user : any = {"id": null , "name" : "" , "password":"" , "role": "" } ;
  userList : any = [];
  
  

  ngOnInit(): void {
    this.userList = JSON.parse(localStorage.getItem('users') || '[]')   ; 
    this.route.paramMap.subscribe(
      params => {
        let id = params.get("id");
        if(id != null){
          let currentUser = this.arrayService.find(this.userList , id) ;
          
          
          if(currentUser.length > 0 ){
            this.user = currentUser[0] ; //======== set user equal to founded result
          }
          else{
            this.router.navigate(['/user/edit']);
          }
        }
        
      });
  }

  saveUser(){
    if(this.user.id == null){ 
      //=========== find last index and assign to the new user
      let insertionIndex = JSON.parse(localStorage.getItem('id') || '{}') || {}  ;
      if(insertionIndex.userId == null){
        insertionIndex.userId = 0 ;
      }
      insertionIndex.userId = insertionIndex.userId + 1 ;
      localStorage.setItem('id',  JSON.stringify(insertionIndex));  // update userId index
      //===============================================
      this.user.id = insertionIndex.userId ;
      this.userList.push(this.user);
      localStorage.setItem('users',  JSON.stringify(this.userList));
      this.router.navigate(['/user/edit/'+this.user.id]);
    }
    else{
      this.updateUser();
    }
    this.swalService.success("اطلاعات کاربر با موفقیت ذخیره شد " , "")
  }

  updateUser(){
    this.arrayService.updateArray(this.userList , this.user) ;
    localStorage.setItem('users',  JSON.stringify(this.userList));
  }

  async deleteUser(){
    let title = "آیا از حذف کردن این کاربر اطمینان دارید؟";
    let text = "شما دیگر قادر به بازگرداندن این فایل نخواهید بود!" ;
    let confirm = "حذف کن";
    let cancel = "انصراف";
    let result = await this.swalService.warning(title , text , cancel , confirm ) ;
    if(result){
      this.arrayService.removeFromArray(this.userList , this.user) ;
      localStorage.setItem('users',  JSON.stringify(this.userList));
      let showSuccessMsg = await this.swalService.success("کاربر با موفقیت حذف شد" , "");
      if(showSuccessMsg){
        this.router.navigate(['/user/edit']);
      }
      
    }
  }



}
