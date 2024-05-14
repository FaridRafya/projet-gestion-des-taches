import {Component, OnInit} from '@angular/core';
import {ITask} from "../task.model";
import {TaskService} from "../service/task.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit{


  taskSharedCollection :ITask[] =[]

  constructor(protected taskService : TaskService,
              protected router : Router) {
  }
  ngOnInit(): void {
    this.taskService.getAll().subscribe(value => {
      this.taskSharedCollection=value
      console.log("taskCOllection" + this.taskSharedCollection )
    })
  }

}
