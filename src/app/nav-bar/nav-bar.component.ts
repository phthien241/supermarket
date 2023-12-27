import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { UserService } from '../services/user.service';
import { Cart } from '../models/cart.model';

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
  carts: Cart[];
  totalPrice: number = 0.00;
  constructor(private router: Router, private userService: UserService, private broadcastService: MsalBroadcastService) { }

  ngOnInit(): void {
    this.userService.checkAuthenticated();
    this.userService.firstName.subscribe({
      next: (name) => {
        this.firstName = name;
      }
    })
    this.userService.getCart().subscribe({
      next: (cart) => {
        this.carts = cart;
        for (let cart of this.carts) {
          this.totalPrice += cart.product.price * cart.quantity;

        }
      }
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
