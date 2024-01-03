import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { CartItem } from '../models/product-update.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private updateSubject = new Subject<CartItem>();
  private totalPriceObservable = new BehaviorSubject<number>(0.00);
  totalPrice = this.totalPriceObservable.asObservable();
  constructor(private userService: UserService) {
    this.setupDebounce();
  }

  setupDebounce() {
    this.updateSubject.pipe(debounceTime(500)).subscribe(product => {
      this.userService.updateCart(product);
    })
  }

  updateCart(product: CartItem) {
    this.totalPriceObservable.next(product.price)
    this.updateSubject.next(product);
  }

  incrementQuantity(product: { cartItem: CartItem, isIncrement: boolean }) {
    (product.isIncrement)
      ? this.totalPriceObservable.next(product.cartItem.price)
      : this.totalPriceObservable.next(-product.cartItem.price);
    this.updateSubject.next(product.cartItem);
  }
}
