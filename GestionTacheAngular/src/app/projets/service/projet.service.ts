import { Injectable } from '@angular/core';
import {ITask} from "../../tasks/task.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {IProjet} from "../projet.model";

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  protected resourceUrl=  'http://localhost:8090/api/projet'
  constructor(protected http: HttpClient) { }

  create(projet :IProjet): Observable<IProjet> {
    return this.http.post<IProjet>(this.resourceUrl, projet);
  }

  getAll():Observable<IProjet[]>{
    return  this.http.get<IProjet[]>(this.resourceUrl)  ;
  }

  finda(id: number): Observable<IProjet> {
    return this.http
      .get<IProjet>(`${this.resourceUrl}/${id}`)
      ;
  }


}
