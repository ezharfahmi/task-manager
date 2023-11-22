import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Task } from '../Store/Model/Task.model';
import { MatSort } from '@angular/material/sort';
import { loadtask } from '../Store/Task/Task.Action';
import { gettasklist } from '../Store/Task/Task.Selector';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashbooard',
  templateUrl: './dashbooard.component.html',
  styleUrls: ['./dashbooard.component.css']
})
export class DashbooardComponent {

  constructor(private dialog: MatDialog, private store: Store) {
  }

  TaskList!: Task[];
  filteredTask!: Task[];
  datasource: any;
  @ViewChild(MatSort) sort!: MatSort;

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

  displayedColums: string[] = ["id", "title", "description", "duedate", "priority", "category"]

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

}
