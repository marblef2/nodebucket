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

}
