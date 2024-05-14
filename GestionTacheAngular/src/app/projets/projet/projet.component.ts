import {Component, OnInit} from '@angular/core';
import {ITask} from "../../tasks/task.model";
import {TaskService} from "../../tasks/service/task.service";
import {Router} from "@angular/router";
import {IProjet} from "../projet.model";
import {ProjetService} from "../service/projet.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit{


  projetSharedCollection :IProjet[] =[]

  constructor(protected projetService : ProjetService,
              protected router : Router) {
  }
  ngOnInit(): void {
    console.log("tesing ng ")
    this.projetService.getAll().subscribe(value => {
      this.projetSharedCollection=value
      console.log(" this.projetSharedCollection=value " +this.projetSharedCollection)
    })
  }

}
