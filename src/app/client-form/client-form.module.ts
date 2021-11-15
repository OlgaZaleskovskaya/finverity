import {NgModule} from '@angular/core';
import {ClientFormComponent} from './client-form.component';
import {CommonModule} from '@angular/common';
import {ClientFormRoutingModule} from './client-form-routing.module';
import {ClientComponent} from './client/client.component';
import {SharedModule} from '../shared/shared.module';
import {AddressComponent} from './address/address.component';
import {IdentityComponent} from './identity/identity.component';


@NgModule({
  imports: [
    CommonModule,
    ClientFormRoutingModule,
    SharedModule
  ],
  declarations: [
    ClientFormComponent,
    ClientComponent,
    AddressComponent,
    IdentityComponent
  ],
})
export class ClientFormModule {
}
