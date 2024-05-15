import {Component, OnInit} from '@angular/core';
import {ITask} from "../task.model";
import {TaskService} from "../service/task.service";
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{


  scope : any
  taskSharedCollection :ITask[] =[]

  constructor(protected taskService : TaskService,
              protected authservice : AuthServiceService,
              protected router : Router) {
  }
  ngOnInit(): void {
    this.taskService.getAll().subscribe(value => {
      this.taskSharedCollection=value
      console.log("taskCOllection" + this.taskSharedCollection )
    })

    this.scope= this.authservice.userProfile?.scope;

    console.log("scope" +this.scope)
  }

  logout(){
    this.authservice.logout();
  }
}
