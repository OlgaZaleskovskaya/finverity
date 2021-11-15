import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ERRORS, MAX_DATE, MAX_LENGTH, MIN_DATE, MIN_LENGTH} from '../../shared/model/form-inputs.model';
import {Observable, Subject} from 'rxjs';
import {RegistrationService} from '../../shared/services/registration.service';
import {takeUntil} from 'rxjs/operators';



@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.scss']
})

export class IdentityComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  documents$: Observable<any[]> = null;
  maxDate = MAX_DATE;
  minDate = MIN_DATE;
  errors: Array<{ error: string, message: string }> = ERRORS;
  fileTypes = ['image/png', 'image/jpeg'];
  maxFileSize = 4000000;
  isLoading = false;
  private _onDestroy = new Subject<void>();

  constructor(private fb: FormBuilder, private registrationSrv: RegistrationService) {
  }

  ngOnInit(): void {
    this.documents$ = this.registrationSrv.getDocumentTypes();
   this._generateForm();
  }

  public hasValidator(control: any, validator: string): boolean {
    if (this.registrationForm.get(control)?.validator) {
      return !!this.registrationForm.controls[control].validator(control)?.hasOwnProperty(validator);
    }
    return false;
  }

  onSubmit(): void {
    this.isLoading = true;
    this.registrationSrv.submitRegistrationForm(this.registrationForm.value).pipe(takeUntil(this._onDestroy)).subscribe(response => {
      this.registrationSrv.openDialog('Ура! Регистрация прошла успешно.', 'success');
      this.isLoading = false;
      this.registrationSrv.isRegistered = true;
    }, error => {
      this.registrationSrv.openDialog('Увы! Что-то пошло не так.', 'error');
      this.isLoading = false;
    });
  }

  onClear(): void {
    this.registrationSrv.resetClientForm();
    this._generateForm();
    this.registrationForm.markAsUntouched();
    this.registrationForm.markAsPristine();
    this.registrationForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private _generateForm() {
    this.registrationForm = this.fb.group({
      documentType: [''],
      documentNumber: ['', [Validators.required]],
      series: ['', [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      documentOrigin: ['', [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      documentReleaseDate: ['', [Validators.required]],
      file: [null, ]
    });


  }
}
