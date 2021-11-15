export interface ISelectData {
  id: number | string;
  value: number | string;
}
export const PHONE_DIGITS_NUMBER = 11;
export const ERRORS = [
  {error: 'required', message: 'Обязательное поле'},
  {error: 'minlength', message: 'Не менее, чем'},
  {error: 'maxlength', message: 'Не более, чем'},
  {error: 'pattern', message: `Количество цифр: ${PHONE_DIGITS_NUMBER}`},
  {error: 'isValidDate', message: 'Дата не валидна'},
  {error: 'type', message: 'допустимые типы файлов'},
  {error: 'maxSize', message: 'превышение максимального размера'},
  {error: 'max', message: 'Значение не должно превышать'},
  {error: 'min', message: 'Значение не должно быть нише'},
];

export const MAX_DATE = new Date();
export const MIN_DATE = new Date('1850-11-12');
export const MAX_LENGTH = 100;
export const MIN_LENGTH = 1;

export class RegistrationData {
  firstName = null;
  lastName = null;
  secondName = null;
  phone = null;
  birthday = null;
  customerGroup = [];
  gender =  [];
  coordinator = [];
  sms = null;
  zipCode = null;
  country =[];
  region  = null;
  city = [];
  street = null;
  building = null;
  documentType = [];
  series = null;
  documentNumber = null;
  documentOrigin = null;
 documentReleaseDate = null;
 fileName = null;
}


