import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authentificationService: AuthentificationService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authentificationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.authentificationService.currentUserSubject.subscribe(user => {
      if (user) {
        this.router.navigate([this.returnUrl]);
      }
    },
    error => {
      this.alertService.error(error);
      this.loading = false;
    });

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onFormSubmit(event) {
    event.preventDefault();
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.alertService.error('At least one field is empty');
      return;
    }

    this.loading = true;
    this.authentificationService.login(this.f.username.value, this.f.password.value).then((success) => {}, (error) => {
      this.loading = false;
      this.submitted = false;
    });
  }
}
