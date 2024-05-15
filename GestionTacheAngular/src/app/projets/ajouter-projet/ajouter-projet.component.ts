import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../tasks/service/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ITask, Task} from "../../tasks/task.model";
import {IProjet, Projet} from "../projet.model";
import {ProjetService} from "../service/projet.service";

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrls: ['./ajouter-projet.component.css']
})
export class AjouterProjetComponent implements  OnInit{



  editForm = this.fb.group({
    id: [],
    name:  [],
    description: [],
    tasks: [],
  });



  constructor(private projetService : ProjetService,
              protected activatedRoute: ActivatedRoute,
              protected fb: FormBuilder,
              protected router :Router
  ) {
  }
  ngOnInit(): void {
  }


  save(): void {
    const projet = this.createFromForm();
    this.projetService.create(projet).subscribe({

      next:()=>this.router.navigateByUrl("/admin/projet"),
      error:()=> console.log("error")
    });

  }

  protected createFromForm(): IProjet {
    return {
      ...new Projet(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,

    };
  }

}

