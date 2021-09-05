/**
 * Date: 11 August 2021
 * Author: Richard Krasso
 * Modified: Fred Marble
 * Description:
 */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { TaskService } from '../../shared/services/task.service';
import { Employee } from '../../shared/models/employee.interface';
import { Item } from '../../shared/models/item.interface';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employee: Employee;
  todo:Item[];
  done: Item[];
  empId: number;
  constructor(private taskService: TaskService, private cookieService:CookieService, private dialog: MatDialog) {
    this.empId= parseInt(this.cookieService.get('session_user'), 10);

    /**Make a call to our taskServcie function findAllTasks */
    this.taskService.findAllTasks(this.empId).subscribe(res => {
      console.log('--Server Response form findAllTasks API--');
      console.log(res);

      this.employee = res;

      console.log('--Employee Object--');
      console.log(this.employee);
    }, err =>{
      console.log('--Server Error---');
      console.log(err);
    }, ()=>{
      console.log('--onComplete of the findAllTasks Service Call--')
      this.todo=this.employee.todo;
      this.done= this.employee.done;

      console.log('--Todo Tasks--');
      console.log(this.todo);

      console.log('--Done Tasks--');
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  openCreateTaskDialog(){
    const dialogRef = this.dialog.open(CreateTaskDialogComponent,{
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.taskService.createTask(this.empId, data.text).subscribe(res=>{
          this.employee= res;
        }, err=>{
          console.log('--onError of the createTask service call--');
          console.log(err);
        },() => {
          this.todo=this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  drop(event: CdkDragDrop<[]>)
  {
    if(event.previousContainer=== event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Reordered the existing list of task items.');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
    else{
      //transferring items in the two arrays.
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      console.log('Moved Task Item into the other container');

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  deleteTask(taskId: string): void{
    if (confirm('Are you sure you want to delete this task?')){
      if(taskId){
        console.log(`Task Item: ${taskId} was deleted`);

        this.taskService.deleteTask(this.empId, taskId).subscribe(res=> {
          this.employee= res.data;
        },
        err =>{
          console.log(err);
        },
        ()=>{
          this.todo = this.employee.todo;
          this.done= this.employee.done;
        })
      }
    }
  }
  /**
   *
   * @param empId
   * @param todo
   * @param done
   */
  private updateTaskList(empId: number, todo: Item[], done: Item[]): void{
    this.taskService.updateTask(this.empId, this.todo, this.done).subscribe(res => {
      this.employee = res.data;
    }, err =>{
      console.log(err);
    }, () =>{
    this.todo = this.employee.todo;
    this.done = this.employee.done;
  })
  }
}
