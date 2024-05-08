import {Component, OnInit} from '@angular/core';
import {TaskService} from "../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ITask, Task} from "../task.model";

@Component({
  selector: 'app-ajouter-task',
  templateUrl: './ajouter-task.component.html',
  styleUrls: ['./ajouter-task.component.css']
})
export class AjouterTaskComponent implements  OnInit{



  editForm = this.fb.group({
    id: [],
    name:  [],
    description: [],
    dateCreated:  [],
    dateFin:  [],
    finished: []
  });



  constructor(private taskService : TaskService,
              protected activatedRoute: ActivatedRoute,
              protected fb: FormBuilder,
              protected router :Router
  ) {
  }
  ngOnInit(): void {
  }


  save(): void {
    const task = this.createFromForm();
    this.taskService.create(task).subscribe({

      next:()=>this.router.navigateByUrl("/task"),
      error:()=> console.log("error")
    });

  }

  protected createFromForm(): ITask {
    return {
      ...new Task(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value,
      dateFin: this.editForm.get(['dateFin'])!.value,
      finished: this.editForm.get(['finished'])!.value,
    };
  }


}
