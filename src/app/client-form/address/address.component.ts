import { Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ERRORS,  MAX_LENGTH, MIN_LENGTH} from '../../shared/model/form-inputs.model';
import {Observable, Subject} from 'rxjs';
import {RegistrationService} from '../../shared/services/registration.service';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})

export class AddressComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  cities$: Observable<any[]> = null;
  countries$: Observable<any[]>;
  errors: Array<{ error: string, message: string }> = ERRORS;
  isEdit = false;
  private _onDestroy = new Subject<void>();

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private registrationSrv: RegistrationService) {
  }

  ngOnInit(): void {
    if (this.registrationSrv.isValidAddressForm) {
      this.isEdit = true;
    }
    this.cities$ = this.registrationSrv.cities$;
    this.countries$ = this.registrationSrv.getCountries();
    this._generateForm();

    this.registrationForm.get('city').disable();
    this.registrationForm.get('country').valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(res => {
      if (res) {
        this.registrationSrv.getCities(res[0].id);
        this.registrationForm.get('city').enable();
      }
    });
  }

  public hasValidator(control: any, validator: string): boolean {
    if (this.registrationForm.get(control)?.validator) {
      return !!this.registrationForm.controls[control].validator(control)?.hasOwnProperty(validator);
    }
    return false;
  }

  onSubmit(): void {
    this.registrationSrv.isValidAddressForm = true;
    this.registrationSrv.submitFormData(this.registrationForm.value);
    this.router.navigate(['../identity'], {relativeTo: this.route});
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onClear(): void {
    this.registrationSrv.resetAddressForm();
    this._generateForm();
    this.registrationForm.markAsUntouched();
    this.registrationForm.markAsPristine();
    this.registrationForm.updateValueAndValidity();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private _generateForm(): void {
    this.registrationForm = this.fb.group({
      zipCode: [this.registrationSrv.registrationFormData.zipCode, [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      country: [this.registrationSrv.registrationFormData.country, [Validators.required]],
      region: ['', [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      city: [this.registrationSrv.registrationFormData.city, [Validators.required]],
      street: ['', [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      building: ['', [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
    });
  }

}
