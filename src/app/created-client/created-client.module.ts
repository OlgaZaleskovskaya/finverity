import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreatedClientComponent} from './created-client.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CreatedClientComponent,

  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreatedClientComponent
  ]
})
export class CreatedClientModule {
}
