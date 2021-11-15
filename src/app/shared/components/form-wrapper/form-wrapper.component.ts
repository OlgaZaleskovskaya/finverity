import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
})
export class FormWrapperComponent implements OnInit {

  title: string;
  @Input() isEdit: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {
  }

  onCancel(): void {
    console.log('back', this.location); //not working yet
    this.location.back();
  }

  ngOnInit(): void {
    switch (this.route.snapshot.routeConfig.path) {
      case 'client':
        this.title = 'Клиент';
        break;
      case 'address':
        this.title = 'Адрес';
        break;
      default:
        this.title = 'Идентификация';
        break;

    }
  }


}
