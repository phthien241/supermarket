import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/product-update.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent {
  products: Product[] = [];
  carts: CartItem[] = [];
  imageUrl = "https://138100957.cdn6.editmysite.com/uploads/1/3/8/1/138100957/s537021412873084970_p421_i1_w886.png";
  name = "Devil's Lair Hidden Cave Chardonnay 750ml";
  price = 20.00;
  brands = ["Woolworths", "Coles"]
  types = ["Fruit", "Vegetables"]
  sortBy = ["A-Z", "Z-A", "Price Low to High", "Price High to Low"]
  constructor(private cartService: CartService, private productService: ProductService, private userService: UserService) { }
  ngOnInit() {
    this.productService.getProduct().subscribe(product => {
      this.products = product
    });
    this.userService.getCart().subscribe(carts => {
      this.carts = carts.map(cart => ({
        name: cart.product.name,
        price: cart.product.price,
        quantity: cart.quantity,
        image: cart.product.image,
        _id: cart.product._id
      }));
    });
  }
  handleAddToCart(product: CartItem) {
    const updatedProduct : CartItem = {_id:product._id, image: product.image,name:product.name, price:product.price,quantity: 1};
    this.carts = [...this.carts, updatedProduct];
    this.cartService.updateCart(updatedProduct);
  }
  handleUpdateToCart(updatedCartItem: {cartItem: CartItem, isIncrement: boolean}) {
    let updatedProduct:CartItem;
    this.carts = this.carts.map(cartItem => {
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
