import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { SideBarComponent } from './layouts/side-bar/side-bar.component';
import { TaskComponent } from './tasks/task/task.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjetComponent } from './projets/projet/projet.component';
import {FooterComponent} from "./layouts/footer/footer.component";
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { AjouterProjetComponent } from './projets/ajouter-projet/ajouter-projet.component';
import {ReactiveFormsModule} from "@angular/forms";
import { AjouterComponent } from './tasks/ajouter/ajouter.component';
import {HttpClientModule} from "@angular/common/http";
import { DetailProjetComponent } from './projets/detail-projet/detail-projet.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SideBarComponent,
    TaskComponent,
    ProjetComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AjouterProjetComponent,
    AjouterComponent,
    DetailProjetComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
