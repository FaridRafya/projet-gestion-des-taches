import {Component, OnInit} from '@angular/core';
import {TaskService} from "../tasks/service/task.service";
import {AuthServiceService} from "../service/auth-service.service";
import {ITask} from "../tasks/task.model";

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements  OnInit{



  taskShaeredCollection : ITask[] =[]
  username? : any
  constructor(protected taskService: TaskService,
              protected authservice : AuthServiceService) {

  }

  ngOnInit(): void {
    this.username= this.authservice.userProfile?.userId;
    this.taskService.findByUser( this.username).subscribe(value =>{
       this.taskShaeredCollection =value
      console.log("value" +value)
    })
  }



}
