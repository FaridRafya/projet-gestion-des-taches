import {Component, OnInit} from '@angular/core';
import {ProjetService} from "../service/projet.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../../tasks/service/task.service";

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {


  id:any
  data:any

  editForm = this.fb.group({
    id: [],
    name:  [],
    description: [],
    tasks: [],
  });


  constructor(protected projetService: ProjetService,
              protected taskService : TaskService,
              protected activatedRoute: ActivatedRoute,
              protected fb: FormBuilder
  ) {
  }

  handlerSearchProjet() {
    this.projetService.finda(this.id).subscribe(value => {
        this.data = value;
        this.editForm.patchValue({
          id: this.data.id,
          name :this.data.name,
          description: this.data.description,
          tasks: this.data.tasks,
        });
      }
    )
  } ;


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(value => {
      this.id = value.get('id');
    this.handlerSearchProjet();
    //  this.taskService.getByProjet(this.id).subscribe()

    })

  }

}
