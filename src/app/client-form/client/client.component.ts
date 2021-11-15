import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ERRORS, ISelectData, MAX_DATE, MAX_LENGTH, MIN_DATE, MIN_LENGTH} from '../../shared/model/form-inputs.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {RegistrationService} from '../../shared/services/registration.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit {
  registrationForm: FormGroup;
  coordinators$: Observable<ISelectData[]>;
  customerGroup$: Observable<ISelectData[]>;
  gender$: Observable<ISelectData[]>;
  smsResponse$: Observable<ISelectData[]>;
  gender: Array<ISelectData>;
  coordinators: Array<ISelectData>;
  errors: Array<{ error: string, message: string }> = ERRORS;
  maxBirthday = MAX_DATE;
  minBirthday = MIN_DATE;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private registrationSrv: RegistrationService) {
  }

  ngOnInit(): void {
    this.coordinators$ = this.registrationSrv.getCoordinators().pipe(tap(res => this.coordinators = res));
    this.customerGroup$ = this.registrationSrv.getCustomerGroup();
    this.gender$ = this.registrationSrv.getGender();
    this.smsResponse$ = this.registrationSrv.getSMSResponse();
    this._generateForm();
  }

  public hasValidator(control: any, validator: string): boolean {
    if (this.registrationForm.get(control)?.validator) {
      return !!this.registrationForm.controls[control].validator(control)?.hasOwnProperty(validator);
    }
    return false;
  }

  onSubmit(): void {
    this.registrationSrv.isValidClientForm = true;
    console.log('form',this.registrationForm.value);
    this.registrationSrv.submitFormData(this.registrationForm.value);
    this.router.navigate(['../address'], {relativeTo: this.route});
  }

  onCancel(): void {
    this.registrationSrv.isRegistration = false;
    this.router.navigate(['/']);
  }

  onClear(): void {
    this.registrationSrv.resetClientForm();
    this._generateForm();
    this.registrationForm.markAsUntouched();
    this.registrationForm.markAsPristine();
    this.registrationForm.updateValueAndValidity();
  }

  private _generateForm(): void {
    this.registrationForm = this.fb.group({
      lastName: [this.registrationSrv.registrationFormData.lastName, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)],
      }],
      firstName: [this.registrationSrv.registrationFormData.firstName, [Validators.required, Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      secondName: [this.registrationSrv.registrationFormData.secondName, [Validators.minLength(MIN_LENGTH), Validators.maxLength(MAX_LENGTH)]],
      phone: [this.registrationSrv.registrationFormData.phone, [Validators.pattern(/^\d{11}$/)]],
      coordinator: [this.registrationSrv.registrationFormData.coordinator],
      birthday: [this.registrationSrv.registrationFormData.birthday, [Validators.required]],
      gender: [this.registrationSrv.registrationFormData.gender],
      customerGroup: [this.registrationSrv.registrationFormData.customerGroup, [Validators.required]],
      sms: [this.registrationSrv.registrationFormData.sms],
    });
  }

}
