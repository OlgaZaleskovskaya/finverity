import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {RegistrationService} from '../services/registration.service';



@Injectable()
export class RegistrationGuard implements CanActivate {
  constructor(
  private registrationSrv: RegistrationService,
  ) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.registrationSrv.isRegistered;
  }

}
