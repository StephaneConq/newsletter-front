import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {AuthentificationService} from '../services/authentification.service';
import {UserService} from '../services/user.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-panel-home',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss']
})
export class PanelHomeComponent implements OnInit {
  currentUser: User;
  // users = [];

  constructor(
    private authentificationService: AuthentificationService,
    // private userService: UserService
  ) {
    this.currentUser = this.authentificationService.currentUserValue;
  }

  ngOnInit() {
    //this.loadAllUsers();
  }

  // deleteUser(id: number) {
  //   this.userService.delete(id)
  //     .pipe(first())
  //     .subscribe(() => this.loadAllUsers());
  // }
  //
  // private loadAllUsers() {
  //   this.userService.getAll()
  //     .pipe(first())
  //     .subscribe(users => this.users = users);
  // }

}
