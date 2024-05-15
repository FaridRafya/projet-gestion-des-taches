import {Component, OnInit} from '@angular/core';
import {ITask} from "../../tasks/task.model";
import {TaskService} from "../../tasks/service/task.service";
import {Router} from "@angular/router";
import {IProjet} from "../projet.model";
import {ProjetService} from "../service/projet.service";
import {AuthServiceService} from "../../service/auth-service.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit{

  scope : any;

  projetSharedCollection :IProjet[] =[]

  constructor(protected projetService : ProjetService,
              protected  authservice :AuthServiceService,
              protected router : Router) {
  }
  ngOnInit(): void {

    this.scope= this.authservice.userProfile?.scope;

    console.log("tesing ng ")
    this.projetService.getAll().subscribe(value => {
      this.projetSharedCollection=value
      console.log(" this.projetSharedCollection=value " +this.projetSharedCollection)
    })
  }

}
