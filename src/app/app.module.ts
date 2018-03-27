import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { RoutingModule } from './core/app.routing';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

// SERVICES
import { ApiService } from './async-services/api/api.service';
import { HttpService } from './async-services/http/http.service';
import { HttpInterceptorService } from './async-services/http-inerceptor/http-interceptor.service';
import { AuthService } from './async-services/auth/auth.service';

// AngularFire
import { AuthFireService } from './core/auth.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// My Components
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/containers/home/home.page.component';
import { LoginComponent } from './components/containers/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent
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
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    AuthFireService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
