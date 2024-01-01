import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/product-update.model';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent {
  cartItems: CartItem[] = [];
  totalPrice: number = 0.00;
  
  constructor(private userService: UserService, private cartService: CartService){}
  ngOnInit(){
    this.userService.getCart().subscribe(carts => {
      this.totalPrice = 0.00;
      this.cartItems = carts.map(cart => ({
        name:cart.product.name,
        image: cart.product.image,
        price: cart.product.price,
        quantity: cart.quantity,
        _id: cart.product._id
      }));
      for(let cart of carts){
        this.totalPrice+= cart.product.price * cart.quantity;
      }
    });
    this.cartService.totalPrice.subscribe(price=>{
      this.totalPrice+=price;
    })
  }

  handleUpdateToCart(updatedCartItem: {cartItem: CartItem, isIncrement: boolean}) {
    let updatedProduct:CartItem;
    this.cartItems = this.cartItems.map(cartItem => {
      if (updatedCartItem.cartItem._id === cartItem._id) {
        updatedProduct = updatedCartItem.isIncrement
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : { ...cartItem, quantity: cartItem.quantity - 1 };
        this.cartService.incrementQuantity({cartItem: updatedProduct,isIncrement: updatedCartItem.isIncrement})
        return updatedProduct;
      }
      return cartItem;
    }
    );
  }
}
