import {Component, OnInit} from '@angular/core';
import {ITask, Task} from "../task.model";
import {TaskService} from "../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {EtatTask} from "../EtatTask";
import {IUser} from "../../users/user.model";
import {UserService} from "../../users/service/user.service";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{

     task : any
      id :any

  etatTaskOptions = Object.values(EtatTask);
  userSharedCollections :IUser[]=[]

  editForm = this.fb.group({
    id: [],
    name:  [],
    description: [],
    dateCreated:  [],
    dateFin:  [],
    etatTask: [],
    projet: [],
    username: [],
  });
  constructor(
    protected taskService : TaskService,
    protected router : Router,
    protected fb: FormBuilder,
    protected activatedRoute: ActivatedRoute,
    protected userService :UserService,
  ) {
  }
  handlerSearchTask() {
    this.taskService.finda(this.id).subscribe(value => {
        this.task = value;
        this.editForm.patchValue({
          id: this.task.id,
          name :this.task.name,
          description: this.task.description,
          dateCreated:  this.task.dateCreated,
          dateFin:  this.task.dateFin,
          etatTask:this.task.etatTask,
          projet:this.task.projet,
          username: this.task.username,
        });
      }
    )
  } ;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(value => {
      this.id = value.get('id');
      this.handlerSearchTask();

    })
    this.userService.getAll().subscribe(value =>{
      this.userSharedCollections=value
    })
  }

  save(): void {
    const task = this.createFromForm();
    this.taskService.update(task).subscribe({

      next:()=>window.history.back(),
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
      etatTask: this.editForm.get(['etatTask'])!.value,
      projet: this.editForm.get(['projet'])!.value,
      username:this.editForm.get(['username'])!.value , // Stocker seulement l'identifiant de l'utilisateur
    };
  }

}
