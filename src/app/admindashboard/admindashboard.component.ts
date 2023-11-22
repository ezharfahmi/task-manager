import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddtaskComponent } from '../addtask/addtask.component';
import { deletetask, gettask, loadtask, openpopup } from 'src/app/Store/Task/Task.Action';
import { MatTableDataSource } from '@angular/material/table';
import { Task, TaskModel } from '../Store/Model/Task.model';
import { MatSort } from '@angular/material/sort';
import { gettasklist } from '../Store/Task/Task.Selector';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {

  constructor(private dialog: MatDialog, private store: Store) {
  }

  TaskList!: Task[];
  filteredTask!: Task[];
  datasource: any;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["id", "title", "description", "duedate", "priority", "category", "action"]

  visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    priorityCategory = [
      {
        level: 'Low'
      },
      {
        level: 'Medium'
      },
      {
        level: 'High'
      }
    ]

    ngOnInit(): void {
      this.store.dispatch(loadtask());
      this.store.select(gettasklist).subscribe(item => {
        this.TaskList = item;
        this.datasource = new MatTableDataSource<Task>(this.TaskList);
        this.datasource.sort = this.sort;
        this.filteredTask = item;
      });
    }

    filterTasks(priority: string | null): void {
      if (priority) {
        this.filteredTask = this.TaskList.filter(task => task.priority === priority);
        this.datasource = this.TaskList.filter(task => task.priority === priority);
      } else if (priority == null) {
        this.filteredTask = this.TaskList;
        this.datasource = this.TaskList;
      }
    }

    FunctionEdit(code:number){
      this.OpenPopup(code, 'Update Task');
      this.store.dispatch(gettask({id:code}))
    }

    FunctionDelete(code:number){
      if(confirm('Do you want to remove?')){
        this.store.dispatch(deletetask({code:code}));
      }
    }

    FunctionAdd() {
      this.OpenPopup(0, 'Create Task');
    }

    OpenPopup(id: number, title: string) {
      this.store.dispatch(openpopup());
      this.dialog.open(AddtaskComponent, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          id: id,
          title: title
        }
      })
  
    }
}
