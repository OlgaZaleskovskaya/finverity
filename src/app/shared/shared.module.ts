import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './matelial.module';
import {TextInputComponent} from './inputs/text-input/text-unput.component';
import {FieldErrorComponent} from './errors/field-error.component';
import {SelectInputComponent} from './inputs/select-input/select-input.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {CheckboxInputComponent} from './inputs/checkbox-input/checkbox-input.component';
import {DateInputComponent} from './inputs/date-input/date-input.component';
import {FileUploadComponent} from './inputs/file-upload/file-upload.component';
import {FormWrapperComponent} from './components/form-wrapper/form-wrapper.component';
import {CapitalFirstLetterPipe} from './pipes/capitalFirstLetter.pipe';
import {ModalComponent} from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MaterialModule,

  ],
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    DateInputComponent,
    FileUploadComponent,
    FieldErrorComponent,
    FormWrapperComponent,
    CapitalFirstLetterPipe,
    ModalComponent

  ],
  exports: [
    ReactiveFormsModule,
    MaterialModule,
    TextInputComponent,
    SelectInputComponent,
    DateInputComponent,
    CheckboxInputComponent,
    FileUploadComponent,
    FieldErrorComponent,
    FormWrapperComponent,
    ModalComponent
  ],
  providers: [],
  entryComponents: []
})

export class SharedModule {
}
