import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-kiramenekoi',
  templateUrl: './kiramenekoi.component.html',
  styleUrls: ['./kiramenekoi.component.css']
})
export class KiramenekoiComponent implements OnInit {
  user: User;

  constructor(public userService: UserService) { }

  ngOnInit() {
    //get the logged user
    this.user = this.userService.getLoggedUser();
    this.userService.getUser(firebase.auth().currentUser.uid).then(
      (user: User) => {
        this.user = user;
      }
    );
  }

}
