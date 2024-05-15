import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITask} from "../../tasks/task.model";
import {Observable} from "rxjs";
import {IUser} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected resourceUrl=  'http://localhost:8090/admin/users'
  constructor(protected http: HttpClient) { }

  create(user :IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user);
  }

  getAll():Observable<IUser[]>{
    return  this.http.get<IUser[]>(this.resourceUrl)  ;
  }
}
