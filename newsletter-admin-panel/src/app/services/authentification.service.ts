import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {AlertService} from './alert.service';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private alertService: AlertService
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      this.http.post<any>(`${environment.apiUrl}/auth`, {username, password})
        .subscribe(token => {
            localStorage.setItem('token', token.access_token);
            this.http.get<any>(`${environment.apiUrl}/api/user/get_user`)
              .subscribe(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                resolve();
              });
          }, (error) => {
            this.alertService.error('wrong username or password');
            reject();
          }
        );
    });
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
