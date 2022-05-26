import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar : MatSnackBar) { }

  success(message : string , duration = 0){
    this.openSnackBar(message , "" , 'green-snackbar' , duration);
  }
  
  error(message : string , duration = 0){
    this.openSnackBar(message , "" , 'red-snackbar' , duration);
  }
  
  warning(message : string , duration = 0){
    this.openSnackBar(message , "" , 'orange-snackbar' , duration);
  }

  openSnackBar(message: string, action: string , type : string , duration : number = 0 ) {
    this.snackbar.open(message, action, {
      duration: duration ,
      direction : 'rtl',
      verticalPosition : 'bottom',
      horizontalPosition: 'left',
      panelClass: [type]
    });
  }

}
