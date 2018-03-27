import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from '../../components/containers/home/home.page.component';
import { LoginComponent } from '../../components/containers/login/login.component';

const APP_ROUTES: Routes = [
  // Public
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent },

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
