import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {PanelHomeComponent} from './panel-home/panel-home.component';
import {LoginComponent} from './login/login.component';
import {NewsletterComponent} from './newsletter/newsletter.component';

const routes: Routes = [
  { path: '', component: PanelHomeComponent, canActivate: [AuthGuard] },
  { path: 'newsletter', component: NewsletterComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
