import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./tasks/task/task.component";
import {ProjetComponent} from "./projets/projet/projet.component";
import {LoginComponent} from "./public/login/login.component";
import {AjouterTaskComponent} from "./tasks/ajouter-task/ajouter-task.component";
import {RegisterComponent} from "./public/register/register.component";



const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'task', component: TaskComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task/ajouter', component: AjouterTaskComponent },

  { path: 'projet', component: ProjetComponent },
  /*{ path: '', redirectTo: '/component1', pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
