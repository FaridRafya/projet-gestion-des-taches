import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthServiceService} from "../../service/auth-service.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/admin/dashboared', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
  { path: '/admin/projet', title: 'projets',  icon:'ni-planet text-blue', class: '' },
  { path: '/admin/task', title: 'tasks',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/admin/users', title: 'users',  icon:'ni-pin-3 text-orange', class: '' },
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
//  { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
  { path: '/admin/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent  implements OnInit {


  scope:any
  public menuItems: any[]=[];
  public isCollapsed = true;

  constructor(private router: Router,
              protected authservice :AuthServiceService) { }

  ngOnInit() {
    this.scope= this.authservice.userProfile?.scope;

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
  logout(){
    this.authservice.logout();
  }
}
