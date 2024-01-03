import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { ConfirmCartRoutingModule } from './confirm-cart-routing.module';
import { ConfirmCartComponent } from './confirm-cart/confirm-cart.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ConfirmCartComponent
  ],
  imports: [
    CommonModule,
    ConfirmCartRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ConfirmCartModule { }
