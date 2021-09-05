import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item.interface';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  /**
   *
   * @param empId
   * @returns
   */
  findAllTasks(empId: number):Observable<any>{
    return this.http.get('/api/employees/'+empId+'/tasks')

  }
  /**
   *
   * @param empId
   * @param task
   * @returns
   */
  createTask(empId: number, task:string):Observable<any>{
    return this.http.post('/api/employees/'+empId+'/tasks', {
      text:task
    })
  }

  /**
   *
   * @param empId
   * @param todo
   * @param done
   * @returns
   */
  updateTask(empId: number, todo: Item[], done: Item[]): Observable<any>{
    return this.http.put('/api/employees/' + empId + '/tasks', {
      todo,
      done
    })
  }

  /**
   *
   * @param empId
   * @param taskId
   * @returns
   */
  deleteTask(empId: number, taskId: string): Observable<any>{
    return this.http.delete('/api/employees/'+ empId + '/tasks/'+ taskId);
  }
}
