import {Component} from '@angular/core';
import {ActivatedRoute, Event, Router, RouterEvent, RoutesRecognized} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  template: `
    <div class="main">
      <button mat-raised-button color='primary' *ngIf="!isRegistration" (click)="startRegistration()">Начать
        регистрацию
      </button>
    </div>`,
  styles: [
    `div.main { width: 100%; height: 100%; position: relative}
    button {display: block;width: 15rem;margin: auto;position: relative;top: 30%;}
  `]
})


export class HomeComponent {
  isRegistration = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RoutesRecognized)
    ).subscribe((e: RouterEvent) => {
      this.isRegistration = (e.url !== '/');
    });
  }

  startRegistration(): void {
    this.router.navigate(['client-form'], {relativeTo: this.route});
  }

}
