import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../task.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  protected resourceUrl=  'http://localhost:8080/api/task'
  constructor(protected http: HttpClient) { }

  create(task :ITask): Observable<ITask> {
    return this.http.post<ITask>(this.resourceUrl, task);
  }


}
