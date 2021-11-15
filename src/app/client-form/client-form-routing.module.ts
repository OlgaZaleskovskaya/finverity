import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientFormComponent} from './client-form.component';
import {ClientComponent} from './client/client.component';
import {AddressComponent} from './address/address.component';
import {IdentityComponent} from './identity/identity.component';
import {CanVisitFormPageGuard} from '../shared/guards/can-visit-form-page.guard';

const routes: Routes = [
  {
    path: '',
    component: ClientFormComponent,
    children: [
   {path: '', redirectTo: 'client', pathMatch: 'full'},
      { path: 'client', component: ClientComponent },
     // { path: 'address', component: AddressComponent, canActivate: [CanVisitFormPageGuard] },
     { path: 'address', component: AddressComponent, canActivate: [CanVisitFormPageGuard] },

      { path: 'identity', component: IdentityComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanVisitFormPageGuard]
})
export class ClientFormRoutingModule { }
