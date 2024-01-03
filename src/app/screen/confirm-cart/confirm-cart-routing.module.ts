import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmCartComponent } from './confirm-cart/confirm-cart.component';

const routes: Routes = [
  { path: '', component: ConfirmCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfirmCartRoutingModule { }
