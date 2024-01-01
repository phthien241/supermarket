import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { UserService } from '../../services/user.service';
import { CartItem } from 'src/app/models/product-update.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateX(-50%)' })),
      transition(':enter, :leave', [animate('300ms ease-out')]),
    ]),
  ]
})
export class NavBarComponent {
  firstName: string;
  carts: CartItem[];
  totalPrice: number = 0.00;
  constructor(private router: Router, private userService: UserService, private cartService: CartService) { }

  ngOnInit(): void {
    this.userService.checkAuthenticated();
    this.userService.firstName.subscribe({
      next: (name) => {
        this.firstName = name;
      }
    })
    this.userService.getCart().subscribe({
      next: (carts) => {
        this.totalPrice = 0.00;
        this.carts = carts.map(cart => ({
          name: cart.product.name,
          image: cart.product.image,
          price: cart.product.price,
          quantity: cart.quantity,
          _id: cart.product._id
        }));
        for (let cart of this.carts) {
          this.totalPrice += cart.price * cart.quantity;
        }
      }
    })
    this.cartService.totalPrice.subscribe(price=>{
      this.totalPrice+=price;
    })
  }
  login() {
    this.userService.login()
  }
  logout() {
    this.userService.logout();
  }

  navigateToCart() {
    this.router.navigate(["/cart"]);
  }
  navigateToHome() {
    this.router.navigate([""]);
  }
  @HostBinding('@fadeInOut') fadeInOut = true;
  showBrowseProduct: boolean = false;
  showSpecialOffer: boolean = false;
  showChristmas: boolean = false;
  showBetterTomorrow: boolean = false;
  showAccountDropdown: boolean = false;
  toggleBrowseProduct() {
    this.showBrowseProduct = true;
    this.showChristmas = false;
    this.showSpecialOffer = false;
    this.showBetterTomorrow = false;
  }
  closeBrowseProduct() {
    this.showBrowseProduct = false;
  }
  toggleSpecialOffer() {
    this.showSpecialOffer = !this.showSpecialOffer;
    this.showChristmas = false;
    this.showBetterTomorrow = false;
  }
  toggleChristmas() {
    this.showChristmas = !this.showChristmas;
    this.showSpecialOffer = false;
    this.showBetterTomorrow = false;
  }
  toggleBetterTomorrow() {
    this.showBetterTomorrow = !this.showBetterTomorrow;
    this.showChristmas = false;
    this.showSpecialOffer = false;
  }
  toggleAccountDropdown() {
    this.showAccountDropdown = !this.showAccountDropdown
  }
}
