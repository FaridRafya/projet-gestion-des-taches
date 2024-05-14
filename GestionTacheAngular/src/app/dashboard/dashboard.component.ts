import {Component, OnInit} from '@angular/core';
import {TaskService} from "../tasks/service/task.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements  OnInit{

  constructor(protected taskService: TaskService) {

  }

  ngOnInit(): void {
    //this.taskService

  }



}
