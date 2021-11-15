import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterEvent, RoutesRecognized} from '@angular/router';
import {RegistrationService} from '../shared/services/registration.service';
import {Event} from '@angular/router';
import {filter} from 'rxjs/operators';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})

export class ClientFormComponent implements OnInit {
  isHidden = false;

  constructor(private router: Router, private cd: ChangeDetectorRef, private route: ActivatedRoute, private registrationSrv: RegistrationService) {
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RoutesRecognized)
    ).subscribe((e: RouterEvent) => {
      console.log('router event', e);
    });
   // this.isHidden = this.registrationSrv.isRegistration;
  }

  ngOnInit(): void {

  }
  // tslint:disable-next-line:typedef
  startRegistration() {
    this.router.navigate(['client'], {relativeTo: this.route});
    this.isHidden = true;
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }


}
