import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TaskComponent} from "./tasks/task/task.component";
import {ProjetComponent} from "./projets/projet/projet.component";
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {AjouterComponent} from "./tasks/ajouter/ajouter.component";
import {AjouterProjetComponent} from "./projets/ajouter-projet/ajouter-projet.component";
import {DetailProjetComponent} from "./projets/detail-projet/detail-projet.component";
import {DashboardComponent} from "./dashboard/dashboard.component";


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboared', component: DashboardComponent },
  { path: 'task', component: TaskComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'task/add/:id', component: AjouterComponent  },
  { path: 'projet/add', component: AjouterProjetComponent  },
  { path: 'projet/:id', component: DetailProjetComponent  },
  { path: 'projet', component: ProjetComponent },
  /*{ path: '', redirectTo: '/component1', pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
