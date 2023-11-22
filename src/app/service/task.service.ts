import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../Store/Model/Task.model';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList: Task[] = [
    { id: 1, title: 'Task 1', description: 'Pickup parcel', duedate: '22 Dec 2023', category: 'TEST', priority: 'high'},
    { id: 2, title: 'Task 2', description: 'Pickup food', duedate: '23 Dec 2023', category: 'TEST', priority: 'low'},
    { id: 3, title: 'Task 3', description: 'Pickup parcel', duedate: '24 Dec 2023', category: 'TEST', priority: 'medium'},
  ];

  Create(data: Task): Observable<Task> {
    this.taskList = [
        ...this.taskList,
        data
    ];      
    return of(data);
  }

  GetAll(): Observable<Task[]> {
    return of(this.taskList);
  }


  getTaskById(id: number): Observable<Task> {
    const foundTask = this.taskList.find(task => task.id === id);
    if (foundTask) {
      return of(foundTask);
    } else {
      // Handle the case when no task is found
      return throwError('Task not found');
    }
  }

  Update(updateTask: Task): Observable<Task> {
      this.taskList.map(task => task.id === updateTask.id ? updateTask : task);
      
      return of(updateTask);
  }

  Delete(id: number): Observable<number> {
      this.taskList = this.taskList.filter(b => b.id !== id);
      return of(id);
  }
}