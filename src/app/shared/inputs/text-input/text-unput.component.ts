import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';


@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  animations: [
    trigger('focus', [
      state(
        'focusOn',
        style({
          position: 'relative',
          top: '0rem',
        })
      ),
      state(
        'focusOut',
        style({
          position: 'relative',
          top: '1.8rem',
        })
      ),
      transition('* <=> *', [animate('0.5s')]),
    ])

  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent
  implements OnInit, ControlValueAccessor {
  isOnFocus = false;
  isMouseOn = false;
  isError = false;
  formControlName: string;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  value: string;
  isDisabled: boolean;
  @Input() isRequired: boolean;
  @Input() label: string;
  @Input() errors: Array<{ error: string; message: string }>;
  @Input() message;
  title: string;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public fieldName: string;

  constructor() {
  }

  onChanged = (value: string) => {
  }

  onTouched = () => {
  }

  ngOnInit() {
    this.title = this.label;
    if (this.isRequired) {
      this.title = `${this.label}*`;
    }
  }

  writeValue(value: string): void {

    if (value) {
      this.value = value;
      this.isOnFocus = true;
    } else {
      this.value = '';
      this.isOnFocus = false;
    }

  }

  registerOnChange(onChange: any): void {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouched = onTouch;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChange(event: Event): void {
    const value: string = (event.target as HTMLInputElement).value;
    this.onChanged(value);
  }

  public onFocusEvent(): void {
    this.isOnFocus = true;
  }

  public onFocusOutEvent(event): void {
    this.isOnFocus = this.formField.dirty;
  }

}
