import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from 'src/app/models/product-update.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnChanges {
  @Input() product : Product;
  @Input() productInCart: CartItem[];
  @Output() addToCart = new EventEmitter<CartItem>();
  @Output() updateCart = new EventEmitter<{cartItem: CartItem, isIncrement: boolean}>
  quantity: number = 0;
  constructor(){}
  ngOnInit(){
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes.productInCart){
        this.quantity = this.getQuantityInCart();
      }
  }
  onAddToCart(){
    let cartItem: CartItem = {_id:this.product._id, name: this.product.name,price:this.product.price,quantity: this.quantity, image: this.product.image}
    this.addToCart.emit(cartItem);
  }

  onUpdateCart(isIncrement:boolean){
    let cartItem: CartItem = {_id:this.product._id, image: this.product.image,name: this.product.name,price:this.product.price,quantity: this.quantity};
    this.updateCart.emit({cartItem: cartItem,isIncrement:isIncrement})
  }

  isProductInCart(){
    return this.productInCart.some(p=>p._id===this.product._id)
  }

  getQuantityInCart(){
    const product =  this.productInCart.find(p=>p._id===this.product._id)
    return product ? product.quantity : 0;
  }
}
