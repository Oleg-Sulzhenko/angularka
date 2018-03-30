import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RoutingModule } from './core/app.routing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// SERVICES
import { ApiService } from './services/async/api/api.service';
import { HttpService } from './services/async/http/http.service';
import { AuthFireService } from './services/auth.service';
import { AuthGuardService } from './services/auth.guard.service';

// AngularFire
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// My Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/containers/home/home.page.component';
import { LoginComponent } from './components/containers/login/login.component';
import { UserAccountComponent } from './components/containers/user-account-component/user-account-component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    RoutingModule,

    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    ApiService,
    HttpService,
    AuthFireService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
