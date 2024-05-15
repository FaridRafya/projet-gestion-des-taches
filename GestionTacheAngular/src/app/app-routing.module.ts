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
import {AuthorisationGuard} from "./guards/authorisation.guard";
import {AuthorisationByRoleGuard} from "./guards/authorisation-by-role.guard";
import {UserlistComponent} from "./users/userlist/userlist.component";
import {MyDashboardComponent} from "./my-dashboard/my-dashboard.component";


const routes: Routes = [
  { path: '', component: LoginComponent },


  {path : "admin", component : DashboardComponent, canActivate :[AuthorisationGuard], canActivateChild:[AuthorisationByRoleGuard], children : [
      { path: 'register', component: RegisterComponent , data : {roles : ['*']}},
      { path: 'dashboared', component: MyDashboardComponent , data : {roles : ['*']}},

      {path : "projet", component : ProjetComponent , data : {roles : ['*']}},
      {path : "users", component : UserlistComponent , data : {roles : ['*']}},
      {path : "task", component : TaskComponent, data : {roles : ['*']}},
      { path: 'task/add/:id', component: AjouterComponent  , data : {roles : ['*']}},
      { path: 'projet/add', component: AjouterProjetComponent  , data : {roles : ['*']}},
      { path: 'projet/:id', component: DetailProjetComponent  , data : {roles : ['*']}},
    ]},
  /*{ path: '', redirectTo: '/component1', pathMatch: 'full' }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
