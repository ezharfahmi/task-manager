import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from '../Store/Model/Task.model';
import { addtask, updatetask } from '../Store/Task/Task.Action';
import { gettask } from '../Store/Task/Task.Selector';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent {
  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddtaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) {

  }

  title = 'Create Task';
  isedit = false;
  priority = '';
  dialogdata: any;
  todayDate:Date = new Date();

  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    this.store.select(gettask).subscribe(res => {
      this.taskform.setValue({
        id: res.id, title: res.title, description: res.description, duedate: res.duedate, priority: res.priority, category: res.category
      })
    })
  }

  ClosePopup() {
    this.ref.close();
  }
  
  taskform = this.builder.group({
    id: this.builder.control(0),
    title: this.builder.control('', Validators.required),
    description: this.builder.control('', Validators.required),
    duedate: this.builder.control('', Validators.required),
    priority: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
  })

  SaveTask() {
    if (this.taskform.valid) {
      const _obj: Task = { 
        id: this.taskform.value.id as number,
        title: this.taskform.value.title as string,
        description: this.taskform.value.description as string,
        duedate: this.taskform.value.duedate as string,
        priority: this.taskform.value.priority as string,
        category: this.taskform.value.category as string,
      }
      if (_obj.id === 0) {
        this.store.dispatch(addtask({ inputdata: _obj }))
      } else {
        this.store.dispatch(updatetask({ inputdata: _obj }))
      }
      this.ClosePopup();
    }
  }
}
