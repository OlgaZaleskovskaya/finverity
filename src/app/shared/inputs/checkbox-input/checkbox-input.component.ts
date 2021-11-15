import {
  Component, ElementRef,
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
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxInputComponent),
      multi: true,
    },
  ],
})
export class CheckboxInputComponent
  implements OnInit, ControlValueAccessor {
  title: string;
  selected = new Set<number | string>();
  selectedItemIndex: number; // for styling
  currentValue: any;
  touched = false;
  selectedId: any;
  initialValue: any;
  @Input()
  public parentForm: FormGroup;
  @Input()
  public fieldName: string;
  @Input() isRequired: boolean;
  @Input() options: ISelectData[];
  @Input() label: string;
  @Input() multiple = false;
  @Input() errors: Array<{ error: string; message: string }>;
  @Input() disabled;
  @Input() isRound = false;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  onChanged = (val: ISelectData) => {
  };
  onTouched = () => {
  };

  ngOnInit() {
    this.title = this.label ? this.label : null;
    if (this.title && this.isRequired) {
      this.title = this.title.concat('*');
    }
  }

  writeValue(val: ISelectData): void {
    if (val) {
      this.selectedId = val.id;
    }
  }

  isSelected(id: number | string): boolean {
    return this.selected.has(id.toString());
  }

  registerOnChange(onChange: any): void {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouched = onTouch;
  }

  onSelect(event): void {
    this.touched = true;
    this.onTouched();
    const el = event.target as HTMLInputElement;
    if (!this.multiple) {
      if (this.selectedId !== el.id) {
        this.selectedId = el.id;
      } else {
        this.selectedId = null;
      }
      const result = this.options.filter(o => o.id === this.selectedId)[0];
      this.onChanged(result);
    }
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
