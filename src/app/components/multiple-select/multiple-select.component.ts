import { SimpleChanges } from '@angular/core';
import { Component, ElementRef, Input, OnInit,Output , EventEmitter , ViewChild, SimpleChange } from '@angular/core';
import { ArrayOperationService } from 'src/app/services/general/array-operation.service';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.css']
})
export class MultipleSelectComponent implements OnInit {

  @Input() title : string = "Select" ;
  @Input() dir : string = "ltr" ;
  @Input() options : any = [
    { id : 1 , title : "Administrator" },
    { id : 2 , title : "Manager" },
    { id : 3 , title : "Staff" },
    { id : 4 , title : "Guest" }
  ] ;
  

  isOpen : boolean = false ;
  @Input() selectedOptions : any = [] ;
  @Input() relatedOptions : any = [] ;
  @Input() stringOptions : string = "" ;

  @Output() getSelectedItemsEvent = new EventEmitter<any>();

  addNewItem(value: any) {  //========= this method sends selected items to parent component
    this.getSelectedItemsEvent.emit(value);
  }

  //========== this will find dropdown input
  @ViewChild('dropdownclose', { static: false }) dropDownInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private arrayService : ArrayOperationService) {}


  ngOnInit(): void {
    if(this.stringOptions != ""){
      let stringOptionsArray = this.stringOptions.split(',');
      this.options = [];
      for(let str of stringOptionsArray){
        let strObject :any = { } ;
        strObject.title = str ;
        this.options.push(strObject);
      }
    }
    else{
      if(this.relatedOptions.length > 0 ){
        this.options = JSON.parse(JSON.stringify(this.relatedOptions)) ; // ====== such a dumb job :)
      }
      for(let option of this.options){
        option.checked = "" ;
        for(let opt of this.selectedOptions){
          if(option.id == opt.id){
            option.checked = true ;
          }
        }
      }
    }
  }



  updateSelect(event : any , option : any){
    if(event.target.checked){
      this.selectedOptions.push(option);
      option.checked = "true" ;
    }
    else{
      this.arrayService.removeFromArray(this.selectedOptions , option);
      option.checked = "" ;
    }
    this.addNewItem(this.selectedOptions);
  }


  toggleDropDown(){
    this.isOpen = !this.isOpen ;
  }

  onClick(event : any) {
    if (!this.dropDownInput.nativeElement.contains(event.target)) // this will be close dropdown
      this.isOpen = false ;
   }
 

}
