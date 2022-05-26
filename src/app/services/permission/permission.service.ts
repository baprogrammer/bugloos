import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor() { }

  checkPermission(form : any , user : any){
    user.hasPrevilage = false ;
      for(let role of user.roles){
        for(let permission of form.permissions){
          if(permission.id == role.id){
              user.hasPrevilage = true ;
              break ;
          }
        }
      }
      return user ;
  }
  



}
