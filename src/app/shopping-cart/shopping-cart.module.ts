import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductCartCardComponent } from '../components/product-cart-card/product-cart-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingCartComponent,
    ProductCartCardComponent 
  ],
  imports: [
    CommonModule,
    ShoppingCartRoutingModule,
    SharedModule,
  ]
})
export class ShoppingCartModule { }
