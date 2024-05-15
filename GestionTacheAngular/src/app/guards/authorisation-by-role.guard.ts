import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthServiceService} from "../service/auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorisationByRoleGuard implements CanActivateChild {
  constructor(private authService:AuthServiceService, private router : Router) {
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isAuthenticated()){
      this.router.navigateByUrl("/login");
      return false;
    } else {
      let routeRoles=route.data['roles'];
      if(routeRoles=="*") return true;
      let authorized:boolean=false;
      for (let role of routeRoles){
        let hasRole:boolean=this.authService.hasRole(role);
        if(hasRole){
          authorized=true;
          break;
        }
      }
      if(authorized==false) alert("Not Authorized");
      return authorized;
    }
  }

}
