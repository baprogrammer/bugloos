import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'  ;

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  success(title : string , text : string){
    return new Promise((resolve , reject)=>{
     Swal.fire( title , text , 'success').then((result=>{
      resolve(true);
     }));
    });
  }

  error(title : string , text : string){
     Swal.fire( title , text , 'error')
  }

  info(title : string, text : string){
     Swal.fire( title , text , 'info')
  }

  warning(title : string , text:string  , cancelText="cancel" , confirmText="ok" ){
    return new Promise((resolve , reject)=>{
      Swal.fire({
        title: title ,
        text: text ,
        icon: 'warning',
        confirmButtonColor: "#ff1800" ,
        showCancelButton: true,
        confirmButtonText: confirmText ,
        cancelButtonText: cancelText
      }).then((result) => {
        if(result.value){
          resolve(true);
        }
        else{
          resolve(false);
        }
      })
    });
  }

}
