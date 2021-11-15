import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegistrationGuard} from './shared/guards/registration.guard';

import {PageNotFoundComponent} from './pageNotFound/pageNotFound.component';
import {HomeComponent} from './home/home-component.componet';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'client-form',
    loadChildren: () => import('./client-form/client-form.module').then(m => m.ClientFormModule)
  },
  {
    path: 'created-client',
    loadChildren: () => import('./created-client/created-client.module').then(m => m.CreatedClientModule),
    canActivate: [RegistrationGuard]
  },
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
