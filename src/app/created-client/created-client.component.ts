import {Component, OnDestroy, OnInit} from '@angular/core';
import {RegistrationService} from '../shared/services/registration.service';
import {ISelectData, RegistrationData} from '../shared/model/form-inputs.model';


@Component({
  selector: 'app-created-client',
  templateUrl: './created-client.component.html',
  styleUrls: ['./created-client.component.scss']
})

export class CreatedClientComponent implements OnInit {
  currentUser: any;
  message = 'нет данных';

  constructor(private registrationSrv: RegistrationService) {
  }


  ngOnInit(): void {
    this._transformUserData();
  }


  // tslint:disable-next-line:typedef
  private _transformUserData() {

    const groups = this.registrationSrv.registrationFormData.customerGroup.length > 1 ?
      this.registrationSrv.registrationFormData.customerGroup.map(item => item.value).join() : `${this.message}`;
    console.log('dhdh', this.registrationSrv.registrationFormData.customerGroup.map(item => item.value).join());
    this.currentUser = {
      ...this.registrationSrv.registrationFormData,
      city: this._transformArrayValue(this.registrationSrv.registrationFormData.city),
      country: this._transformArrayValue(this.registrationSrv.registrationFormData.country),
      coordinator: this._transformArrayValue(this.registrationSrv.registrationFormData.coordinator),
      documentType: this._transformArrayValue(this.registrationSrv.registrationFormData.documentType),
      sms: this.registrationSrv.registrationFormData.sms?  'нет, не отправлять ' : 'да, отправлять',
      customerGroup: this._transformArrayValue(this.registrationSrv.registrationFormData.customerGroup),
    };

  }

  private _transformArrayValue(data: ISelectData[]): string {
    let result = '';
    if (data.length > 0) {
      result = data.map(item => item.value).join(', ');
    }
    return result;
  }
}
