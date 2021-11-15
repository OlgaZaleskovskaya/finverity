import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, debounce, debounceTime, delay, finalize, tap} from 'rxjs/operators';
import {ISelectData, RegistrationData} from '../model/form-inputs.model';
import {MatDialog} from '@angular/material/dialog';
import {ModalComponent} from '../components/modal/modal.component';
import {Router} from '@angular/router';

const COUNTRIES = [
  {id: '1', value: 'США'},
  {id: '2', value: 'Чехия'},
  {id: '3', value: 'Великобритания'},
  {id: '4', value: 'Израиль'},
];
const CITIES = [
  {parentId: '1', cities: [{id: 11, value: 'Флорида'}, {id: 11, value: 'Хъюстон'}]},
  {parentId: '2', cities: [{id: 21, value: 'Прага'}, {id: 21, value: 'Брно'}]},
  {parentId: '3', cities: [{id: 22, value: 'Лондон'}, {id: 11, value: 'Ливерпуль'}]},
  {parentId: '4', cities: [{id: 23, value: 'Рамла'}, {id: 11, value: 'Хедера'}]},

];
const URL = 'someUrl';

const GROUPS = [
  {id: '1', value: 'VIP'},
  {id: '2', value: 'Постоянные клиенты'},
  {id: '3', value: 'Новый клиент'},
];

const COORDINATORS = [
  {id: '1', value: 'Иванов'},
  {id: '2', value: 'Захаров'},
  {id: '3', value: 'Чернышов'},
];
const GENDER = [
  {id: '1', value: 'Мужской'},
  {id: '2', value: 'Женский'},
  {id: '3', value: 'Инопланетянин'},
];

const SMS_RESPONSE = [
  {id: '1', value: ''},
];

const DOCUMENT_TYPE = [
  {id: '1', value: 'паспорт'},
  {id: '2', value: 'свидетельство о рождении'},
  {id: '3', value: 'водительское удостоверение'},
  {id: '4', value: 'уши-лапы-и-хвост'},
];


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  registrationForm = new FormData();

  constructor(private router: Router, public dialog: MatDialog) {
  }

  private _cities$: BehaviorSubject<any> = new BehaviorSubject<any>([{id: 0, value: ''}]);
  cities$: Observable<any> = this._cities$.asObservable();
  isValidClientForm = false;
  isValidAddressForm = false;
  isRegistered = false;
  isRegistration = false;
  registrationFormData = new RegistrationData();

  getCountries(): Observable<any> {
    return of(COUNTRIES);
  }

  getCities(countryId: string[]): void {
    const cities = CITIES.filter(item => item.parentId === countryId[0])[0].cities;
    this._cities$.next(cities);
  }

  getCustomerGroup(): Observable<Array<ISelectData>> {
    return of(GROUPS);
  }

  getCoordinators(): Observable<Array<ISelectData>> {
    return of(COORDINATORS);
  }

  getGender(): Observable<Array<ISelectData>> {
    return of(GENDER);
  }

  getSMSResponse(): Observable<Array<ISelectData>> {
    return of(SMS_RESPONSE);
  }

  getDocumentTypes(): Observable<Array<ISelectData>> {
    return of(DOCUMENT_TYPE);
  }

  uploadFile(file: File, name: string): void {
    this.registrationFormData = {...this.registrationFormData, fileName: name};
    if (!this.registrationForm.has('file')) {
      this.registrationForm.append('file', file, name);
    } else {
      this.registrationForm.set('file', file, name);
    }
  }

  submitRegistrationForm(data: any): Observable<any> {
    this.submitFormData(data);
    return this._saveFormData();
  }

  openDialog(message: string, type: 'success' | 'error'): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      closeOnNavigation: true,
      height: '200px',
      width: '300px',
      data: {
        message,
        type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (type === 'success') {
        this.router.navigate(['/created-client']);
      }
    });
  }

  submitFormData(data: any): void {
    const formData = Object.assign({}, data);
    delete formData.file;
    this.registrationFormData = {...this.registrationFormData, ...formData};
  }

  private _saveFormData(): Observable<any> {
    this._fillInRegistrationForm();
    // this.http.post('someUrl', this.registrationForm.subscribe()
    return of('response').pipe(delay(3000));
  }

  private _fillInRegistrationForm(): void {
    for (const [key, value] of Object.entries(this.registrationFormData)) {
      if (key !== 'fileName') {
        this.registrationForm.append(key, value ? JSON.stringify(value) : null);
      }
    }
  }


}
