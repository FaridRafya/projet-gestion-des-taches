import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {IUser} from "../user.model";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements  OnInit{

  userSharedCollections :IUser[]=[]
  constructor( protected userService: UserService) {
  }
  ngOnInit(): void {
    this.userService.getAll().subscribe(value =>{
      this.userSharedCollections=value
    })
  }

}
