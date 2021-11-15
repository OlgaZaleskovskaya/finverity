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


import {Observable, Subscription} from 'rxjs';
import {ISelectData} from '../../model/form-inputs.model';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent
  implements OnInit, ControlValueAccessor {

  constructor() {
  }

  isOnFocus = false;
  isMouseOn = false;
  isError = false;
  formControlName: string;
  defaultOption: any;
  value: any;
  isDisabled: boolean;
  title: string;
  selected: any;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  @Input() isRequired: boolean; // for concating with*
  @Input() label: string;
  @Input() errors: Array<{ error: string; message: string }>;
  @Input() message;
  @Input() editMode = false;
  @Input() options: Array<{ id: string | string, value: string | number }> | Observable<any>;
  @Input() isClearable: boolean;
  @Input() multiple = false;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public fieldName: string;


  onChanged = (value: any[]) => {
  }

  onTouched = () => {
  }

  ngOnInit() {
    this.selected = [].push(this.options[0]);
    this.title = this.label;
    if (this.isRequired) {
      this.title = `${this.label}*`;
    }
  }

  writeValue(value: any[]): void {
    const opt = [];
    if (!this.multiple) {
      this.defaultOption = value.length > 0 ? value[0] : null;
    } else {
      this.defaultOption = value;
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

  public onChange(event: ISelectData[] | ISelectData): void {
    let result = [];
    if (Array.isArray(event)) {
      result = event;
    } else {
      result.push(event);
    }
    this.onChanged(result);
  }

  onFocusEvent(): void {
    if (this.isDisabled) {
      return;
    }
    this.isOnFocus = true; // input styling
  }

  onFocusOutEvent(event): void {
    if (this.isDisabled) {
      return;
    }
    this.isOnFocus = false; // input styling
  }

  onMouseOn(b: boolean): void {
    if (this.isDisabled) { return; }
    this.isMouseOn = b;
  }
}
