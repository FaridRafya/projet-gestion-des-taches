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
import { AjouterTaskComponent } from './tasks/ajouter-task/ajouter-task.component';
import { AjouterProjetComponent } from './projets/ajouter-projet/ajouter-projet.component';

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
    AjouterTaskComponent,
    AjouterProjetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
