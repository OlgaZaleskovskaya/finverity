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
  NG_VALUE_ACCESSOR, Validator, AbstractControl, ValidationErrors, NG_VALIDATORS,
} from '@angular/forms';

import {RegistrationService} from '../../services/registration.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileUploadComponent),
      multi: true,
    },

  ],
})
export class FileUploadComponent
  implements OnInit, ControlValueAccessor, Validator {
  title: string;
  currentValue: any;
  fileName = '';
  fileUploadSuccess = false;
  disabled = false;
  file: File;

  constructor(private registrationSrv: RegistrationService) {
  }

  @Input()
  public parentForm: FormGroup;
  @Input()
  public fieldName: string;
  @Input() isRequired: boolean;
  @Input() requiredFileType: string[];
  @Input() maxSize: number;
  @Input() label: string;
  @Input() errors: Array<{ error: string; message: string }>;

  get formField(): FormControl {
    return this.parentForm.get(this.fieldName) as FormControl;
  }

  onChanged = (fileName: string) => {
  };
  onTouched = () => {
  };
  onValidatorChanged = () => {
    console.log('message');
  };

  ngOnInit(): void {
    this.title = this.label ? this.label : null;
    if (this.title && this.isRequired) {
      this.title = this.title.concat('*');
    }
  }

  writeValue(value: any): void {
    this.fileName = value;
  }

  registerOnChange(onChange: any): void {
    this.onChanged = onChange;
  }

  registerOnTouched(onTouch: any): void {
    this.onTouched = onTouch;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onClick(filePicker: HTMLInputElement): void {
    this.onTouched();
    filePicker.click();
  }

  onImagePicked(event: Event): void {
    const file: File = (event.target as HTMLInputElement).files[0];
    if (file) {
      this.file = file;
      this.fileName = this.file.name;
      if (!!(this.requiredFileType.find((t) => t === file.type)) && file.size < this.maxSize) {
        this.fileUploadSuccess = true;
        this.disabled = true;
        this.registrationSrv.uploadFile(this.file, this.fileName);
      }
      this.onChanged(this.fileName);
      this.onValidatorChanged();
    }
  }

  // tslint:disable-next-line:typedef
  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChanged = onValidatorChange;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.isRequired) {
      return this._validateNotRequired();
    } else {
      return this._validateIsRequired();
    }
  }

  onRemoveFile(): void {
    this.fileName = null;
    this.file = null;
    this.fileUploadSuccess = false;
    this.disabled = false;
    this.parentForm.get('file').markAsUntouched();
    this.onChanged(null);
    this.onValidatorChanged();
  }

  private _validateNotRequired(): ValidationErrors | null {
    let errors: { [key: string]: string } = {};
    if (this.parentForm.get('file').untouched || this.fileUploadSuccess) {
      return null;
    }
    if (this.file) {
      if (this.file.size > this.maxSize) {
        errors = {
          maxSize: this.maxSize.toString()
        };
      } else {
        errors.type = JSON.stringify(this.requiredFileType);
      }
      return errors;
    }
  }

  private _validateIsRequired(): ValidationErrors | null {
    let errors: { [key: string]: string } = {};
    if (this.fileUploadSuccess) {
      return null;
    }
    if (this.file) {
      if (this.file.size > this.maxSize) {
        errors = {
          maxSize: this.maxSize.toString()
        };
      } else {
        errors.type = JSON.stringify(this.requiredFileType);
      }
      return errors;
    }
  }

}
