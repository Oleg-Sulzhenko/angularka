import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from '../components/containers/home/home.page.component';
import { LoginComponent } from '../components/containers/login/login.component';
import { UserAccountComponent } from '../components/containers/user-account-component/user-account-component';
import { AuthFireService } from '../services/auth.service';

import { AuthGuardService } from '../services/auth.guard.service';

const APP_ROUTES: Routes = [
  // Public
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: UserAccountComponent, canActivate: [AuthGuardService] },

  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule {
}
