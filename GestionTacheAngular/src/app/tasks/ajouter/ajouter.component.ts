import {Component, OnInit} from '@angular/core';
import {TaskService} from "../service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ITask, Task} from "../task.model";
import {ProjetService} from "../../projets/service/projet.service";
import {EtatTask} from "../EtatTask";
import {IUser} from "../../users/user.model";
import {UserService} from "../../users/service/user.service";

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.css']
})
export class AjouterComponent implements  OnInit{


  id:any
  data:any
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



  constructor(private taskService : TaskService,
              protected projetService:ProjetService,
              protected activatedRoute: ActivatedRoute,
              protected userService :UserService,
              protected fb: FormBuilder,
              protected router :Router
  ) {
  }

  handlerSearchProjet() {
    this.projetService.finda(this.id).subscribe(value => {
        this.data = value;
        this.editForm.patchValue({
          projet: this.data,

        });
      })

    this.userService.getAll().subscribe(value =>{
      this.userSharedCollections=value
    })
  } ;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(value => {
      this.id = value.get('id');
      this.handlerSearchProjet();

    })

  }


 save(): void {
    const task = this.createFromForm();
    this.taskService.create(task).subscribe({

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

