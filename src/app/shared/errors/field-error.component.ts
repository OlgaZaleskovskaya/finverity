import {OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-field-error',
  templateUrl: './field-error.component.html',
  styleUrls: ['./field-error.component.scss'],
})
export class FieldErrorComponent implements OnInit, OnChanges {
  @Input('formField') formFieldCtrl: FormControl;
  @Input() public errors: Array<{ error: string, message: string }>;

  ngOnInit(): void {
    console.log('errors', this.errors);
    console.log(this.formFieldCtrl);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.formFieldCtrl);
  }
}
