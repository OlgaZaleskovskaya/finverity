import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {ISelectData} from '../../model/form-inputs.model';


@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss'],

  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true,
    },
  ],
})
export class DateInputComponent
  implements OnInit, ControlValueAccessor {
  title: string;
  isOnFocus = false;
  isMouseOn = false;
  maxDate: string;
  minDate: string;
  @Input() max: Date;
  @Input() min: Date;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public fieldName: string;
  @Input() isRequired: boolean;
  @Input() options: ISelectData[];
  @Input() label: string;
  @Input() errors: Array<{ error: string; message: string }>;
  @Input() initialValue: any;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  onChanged = (val: any[]) => {
  };
  onTouched = () => {
  };

  ngOnInit() {
    this.maxDate = this._getDate(this.max);
    this.minDate = this._getDate(this.min);
    this.title = this.label ? this.label : null;
    if (this.title && this.isRequired) {
      this.title = this.title.concat('*');
    }
  }

  writeValue(val: number): void {
    console.log('val', val);
    if (val) {
      const b = new Date(val);
      this.initialValue = b;
    } else {
      this.initialValue = null;
    }
  }

  registerOnChange(onChange: any): void {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouched = onTouch;
  }

  onSelect(event): void {
    const d = new Date(event).getTime();
    this.onChanged(event);
  }

  touched(): void {
    this.onTouched();
  }

  private _getDate(date: Date): string {
    const month = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;
    const smth = `${date.getMonth()}-${month}-${day}`;
    return `${date.getFullYear()}-${month}-${day}`;
  }

}
