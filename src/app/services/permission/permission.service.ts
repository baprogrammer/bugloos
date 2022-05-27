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


  checkComponentPermission(user : any , component : any ){
    user.hasPrevilage = false ;
    for(let permission of component.permissions){
      for(let role of user.roles){
        if(role.id == permission.id){
          user.hasPrevilage = true ;
          break;
        }
      }
    }
    return user ;
  }
  



}
