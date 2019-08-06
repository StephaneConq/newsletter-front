import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {AuthentificationService} from '../services/authentification.service';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-panel-home',
  templateUrl: './panel-home.component.html',
  styleUrls: ['./panel-home.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
})
export class PanelHomeComponent implements OnInit {
  currentUser: User;
  // users = [];

  constructor(
    private authentificationService: AuthentificationService
  ) {}


  ngOnInit() {
    this.authentificationService.currentUserSubject.subscribe(user => {
      if (user) {
        this.currentUser = user;
      }
    });
  }

}
