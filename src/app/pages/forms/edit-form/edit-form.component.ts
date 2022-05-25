import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { ComponentModel } from 'src/app/models/componentModel.model';

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
      size: 'full'
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
    ,
    {
      type: 'dateTime',
      name: 'dateTime',
      label: 'dateTime',
      size: 'full'
    }
    


  ];

  currentComponent : any = { } ;  //======== current selected component

  index: number = 0  ;  // ============ primary index - auto increment for preventing similar names

  components: Array<ComponentModel> = []; //======== All the components that dragged to form area

  constructor() { }

  ngOnInit(): void {
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
      
      console.log(this.components);
      this.index += 1;

    }
  }


  componentClick(component: ComponentModel) {
    this.currentComponent = component ;
  }
  



}
