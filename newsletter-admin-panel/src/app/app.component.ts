import { Component } from '@angular/core';
import {User} from './models/user';
import {Router} from '@angular/router';
import {AuthentificationService} from './services/authentification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'newsletter-admin-panel';
  currentUser: User;

  constructor(
    private router: Router,
    private authentificationService: AuthentificationService
  ) {
    this.authentificationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }
}
