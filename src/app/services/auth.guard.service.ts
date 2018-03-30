import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthFireService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authFireService: AuthFireService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('mae buty TRUE - ', this.authFireService.isLoggedIn() );

    if ( this.authFireService.isLoggedIn() ) {
      return true;
    } else {
      console.log('Not Authorized - Redirecting to Login...');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
