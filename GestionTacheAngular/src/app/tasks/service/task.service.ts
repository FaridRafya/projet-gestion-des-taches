import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ITask} from "../task.model";
import {IProjet} from "../../projets/projet.model";

@Injectable({
  providedIn: 'root'
})
export class TaskService {


  protected resourceUrl=  'http://localhost:8090/api/task'
  constructor(protected http: HttpClient) { }

  create(task :ITask): Observable<ITask> {
    return this.http.post<ITask>(this.resourceUrl, task);
  }

  getAll():Observable<ITask[]>{
    return  this.http.get<ITask[]>(this.resourceUrl)  ;
  }


  getAllByEtat(etat : string):Observable<ITask[]>{
    return  this.http.get<ITask[]>(`${this.resourceUrl}/${etat}`);
  }

  getByProjet(id: number): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.resourceUrl}/projet/${id}`);
  }


  finda(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.resourceUrl}/${id}`);
  }
  findByUser(username: any): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.resourceUrl}/etat/${username}`);
  }

}
