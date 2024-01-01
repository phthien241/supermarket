import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/models/product-update.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-cart-card',
  templateUrl: './product-cart-card.component.html',
  styleUrls: ['./product-cart-card.component.scss']
})
export class ProductCartCardComponent {
  @Input() product: CartItem;
  @Input() productInCart: CartItem[];
  @Output() updateCart = new EventEmitter<{ cartItem: CartItem, isIncrement: boolean }>
  quantity: number = 0;
  price: number = 0;
  constructor() { }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product) {
      this.quantity = this.product.quantity;
      this.price = this.quantity * this.product.price;
    }
  }

  onUpdateCart(isIncrement: boolean) {
    let cartItem: CartItem = { _id: this.product._id, image: this.product.image, name: this.product.name, price: this.product.price, quantity: this.quantity };
    this.updateCart.emit({ cartItem: cartItem, isIncrement: isIncrement })
  }

  isProductInCart() {
    return this.productInCart.some(p => p._id === this.product._id)
  }

  getQuantityInCart() {
    const product = this.productInCart.find(p => p._id === this.product._id)
    return product ? product.quantity : 0;
  }
}
