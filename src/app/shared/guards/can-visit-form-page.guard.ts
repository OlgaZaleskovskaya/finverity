import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {RegistrationService} from '../services/registration.service';


@Injectable()
export class CanVisitFormPageGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(private router: Router, private regSrv: RegistrationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (state.url.includes('identity')) {
      if (this.regSrv.isValidAddressForm) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }

    if (state.url.includes('address')) {
      if (this.regSrv.isValidClientForm) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
