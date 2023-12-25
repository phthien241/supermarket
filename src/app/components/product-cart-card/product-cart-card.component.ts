import { Component } from '@angular/core';

@Component({
  selector: 'app-product-cart-card',
  templateUrl: './product-cart-card.component.html',
  styleUrls: ['./product-cart-card.component.scss']
})
export class ProductCartCardComponent {
  quantity: number = 0;
  incrementQuantity(){
    this.quantity++;
  }
  decrementQuantity(){
    this.quantity--;
  }
}
