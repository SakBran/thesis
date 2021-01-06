import { appSetting } from 'src/app/app-setting';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthComponent } from './auth.component';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthComponent, public router: Router,private appSetting:appSetting) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}