import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayOperationService {

  constructor() { }

  
  find(myArray : any , id : string){
    let result =  myArray.filter( (x:any) => x.id == id);
    console.log(result);
    return result ;
    
  }
  
  findKey(myArray : any , myObject : any){
    return  myArray.findIndex( (x:any) => x.id == myObject.id );
  }

  removeFromArray(myArray : any , myObject : any){
    let index = this.findKey(myArray , myObject);
    if (index > -1) {
      myArray.splice(index, 1);
    }
    return myArray ;
  }

  updateArray(myArray : any , myObject : any ){
    let index = this.findKey(myArray , myObject);
    if (index > -1) {
      myArray[index] = myObject ;
    }
    return myArray ;
  }
  
  
}
