/**
 * Date: 25 August 2021
 * Author: Fred Marble
 * Modified:
 * Description:Creation of a task
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: ['./create-task-dialog.component.css']
})
export class CreateTaskDialogComponent implements OnInit {

  taskForm: FormGroup;

  constructor(private dialogRef:MatDialogRef<CreateTaskDialogComponent>, private fb: FormBuilder) {
    this.taskForm= this.fb.group({
      text: [null, Validators.compose([Validators.required])]
    })
   }

  ngOnInit(): void {
  }
  /**
   * Create a task function.
   */
  createTask(){
    this.dialogRef.close(this.taskForm.value);
  }
  /**
   * Cancel creating a task.
   */
  cancel(){
    this.dialogRef.close();
  }
}
