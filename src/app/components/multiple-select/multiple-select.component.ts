import { Component, ElementRef, Input, OnInit,Output , EventEmitter , ViewChild } from '@angular/core';
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

  @Output() getSelectedItemsEvent = new EventEmitter<string>();

  addNewItem(value: any) {
    this.getSelectedItemsEvent.emit(value);
  }

  //========== this will find dropdown input
  @ViewChild('dropdownclose', { static: false }) dropDownInput: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(private arrayService : ArrayOperationService) {}


  ngOnInit(): void {
    for(let option of this.options){
      for(let opt of this.selectedOptions){
        if(option.id == opt.id){
          option.checked = true ;
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
