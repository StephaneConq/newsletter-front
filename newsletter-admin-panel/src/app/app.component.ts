import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {User} from './models/user';
import {Router} from '@angular/router';
import {AuthentificationService} from './services/authentification.service';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'newsletter-admin-panel';
  currentUser: User;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private router: Router,
    private authentificationService: AuthentificationService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.authentificationService.currentUser.subscribe(x => this.currentUser = x);
    this.mobileQuery = media.matchMedia('(max-width: 599px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  logout() {
    this.authentificationService.logout();
    this.router.navigate(['/login']);
  }

  newsletter() {
    this.router.navigate(['/newsletter']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
