import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import { ComponentModel } from 'src/app/models/componentModel.model';
import { ArrayOperationService } from 'src/app/services/general/array-operation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalService } from 'src/app/services/messaging/sweetalert/swal.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  routes : any = [
    {"title": "فرم ها" , "link": '/forms' } ,
    {"title": "ویرایش فرم" , "link": '/edit-form' } 
  ];

  //=========== list of draggable widgets - in app you can find them in the right sidebar
  widgets:  any =
  [
    {
      type: 'text',
      name: 'textbox',
      label: 'تکست باکس',
      size: 'half'

    },
    {
      type: 'number',
      name: 'number',
      label: 'شماره',
      size: 'full'
    },
    {
      type: 'image',
      name: 'image',
      label: 'عکس',
      size: 'full'
    },
    {
      type: 'textarea',
      name: 'textarea',
      label: 'متن',
      size: 'full'
    },
    {
      type: 'check',
      name: 'checkbox',
      label: 'چک باکس',
      size: 'full'
    },
    {
      type: 'radio',
      name: 'radio',
      label: 'رادیو',
      size: 'full',
      isSelect: true,
      options : ""
    },
    {
      type: 'select',
      name: 'select',
      label: 'سلکت',
      size: 'full',
      isSelect: true,
      options : ""
     
    },
    {
      type: 'editor',
      name: 'editor',
      label: 'ادیتور',
      size: 'full'
    },
    {
      type: 'audio',
      name: 'audio',
      label: 'فایل صوتی',
      size: 'full'
    },
    {
      type: 'video',
      name: 'video',
      label: 'ویدیو',
      size: 'full'
    },
    {
      type: 'file',
      name: 'File',
      label: 'فایل',
      size: 'full'
    },
    {
      type: 'jdate',
      name: 'date',
      label: 'تاریخ',
      size: 'full'
    }
    ,
    {
      type: 'color',
      name: 'color',
      label: 'رنگ',
      size: 'full'
    }

    ,
    {
      type: 'hidden',
      name: 'hidden',
      label: 'hidden',
      size: 'full'
    }
    ,
    {
      type: 'time',
      name: 'time',
      label: 'time',
      size: 'full'
    }
  ];

  currentComponent : any = { permissions : [] } ;  //======== current selected component - if user select any component this variable will be initialized

  index: number = 0  ;  // ============ primary index - auto increment for preventing similar names

  // ====================== dropdown settings and variables ==========================
  
  selectedItems : any = [] ;  //========= this array contains selected components
  
  formAccess : any = [] ; // ========= this array contain form permissions
  componentAccess : any = [] ; // ========= this array contain component permissions
  
  showAccess : boolean = true ;

  components: Array<ComponentModel> = []; //======== All the components that dragged to form area
  form : any = {id : null , permissions : [] } ; //======= this is the main object that store all the form data
  formList : any = [] ;

  constructor(private arrayService : ArrayOperationService , private router : Router ,
     private swalService : SwalService , private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.formList = JSON.parse(localStorage.getItem('forms') || '[]')   ; 
    this.route.paramMap.subscribe(
      params => {
        let id = params.get("id");
        if(id != null){
          let currentForm = this.arrayService.find(this.formList , id) ;
          if(currentForm.length > 0 ){
            this.form = currentForm[0] ; //======== set user equal to founded result
            this.components = this.form.components ;
            this.index = this.form.lastIndex ;
          }
          else{
            this.router.navigate(['/form/edit']);
          }
        }
        
      });
    
  }




  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.components,
        event.previousIndex,
        event.currentIndex);
    }
    else {
      var data = event.previousContainer.data[event.previousIndex];
      var component = new ComponentModel();
      component.id = this.index;
      component.data = data;
      component.label = component.data.label;
      component.type = component.data.type;
      component.size = component.data.size;
      component.name = component.data.name + this.index;
      component.isSelect = component.data.isSelect;
      component.value = component.data.value;
      component.options = component.data.options ;
      this.components.push(component);
      this.componentClick(component);
      
      this.index += 1;

    }
  }


  componentClick(component: ComponentModel) {
    this.currentComponent = component ;
    this.updateShowAccess();
  }

  

  deleteComponent(component : any){
    this.arrayService.removeFromArray(this.components , component);
    this.currentComponent = {};
  }
  
  updateShowAccess(){
    this.showAccess = false ;
    setTimeout(() => {
      this.showAccess = true ;
    }, 20);
  }

  addFormPermissions(newItem: []) {
    this.form.permissions = newItem ;
    this.updateShowAccess();
  }


  addComponentPermissions(newItem: string) {
    this.componentAccess = newItem;
    this.currentComponent.permissions = this.componentAccess ;
  }

  saveForm(){
    if(this.form.id == null){ 
      //=========== find last index and assign to the new user
      let insertionIndex = JSON.parse(localStorage.getItem('id') || '{}') || {}  ;
      if(insertionIndex.formId == null){
        insertionIndex.formId = 0 ;
      }
      insertionIndex.formId = insertionIndex.formId + 1 ;
      localStorage.setItem('id',  JSON.stringify(insertionIndex));  // update form index
      //===============================================
      this.form.id = insertionIndex.formId ;
      this.form.components = this.components;
      this.form.lastIndex = this.index ;
      this.formList.push(this.form);
      localStorage.setItem('forms',  JSON.stringify(this.formList));
      this.router.navigate(['/form/edit/'+this.form.id]);
    }
    else{
      this.form.components = this.components;
      this.form.lastIndex = this.index ;
      this.updateForm();
    }
    this.swalService.success("اطلاعات فرم با موفقیت ذخیره شد " , "")
  }

  updateForm(){
    this.arrayService.updateArray(this.formList , this.form) ;
    localStorage.setItem('forms',  JSON.stringify(this.formList));
  }


  async deleteForm(){
    let title = "آیا از حذف کردن این فرم اطمینان دارید؟";
    let text = "شما دیگر قادر به بازگرداندن این فایل نخواهید بود!" ;
    let confirm = "حذف کن";
    let cancel = "انصراف";
    let result = await this.swalService.warning(title , text , cancel , confirm ) ;
    if(result){
      this.arrayService.removeFromArray(this.formList , this.form) ;
      localStorage.setItem('forms',  JSON.stringify(this.formList));
      let showSuccessMsg = await this.swalService.success("فرم با موفقیت حذف شد" , "");
      if(showSuccessMsg){
        this.router.navigate(['/forms']);
      }
      
    }
  }


}
