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
  categories = [
    {
      name: 'Fruit & Vegetables',
      imageLink: '../../assets/images/fruit-veg.png'
    },
    {
      name: 'Bakery',
      imageLink: '../../assets/images/bakery.png'
    },
    {
      name: 'Poultry, Meat & Seafood',
      imageLink: '../../assets/images/meat.png'
    },
    {
      name: 'Dairy, Eggs & Fridge',
      imageLink: '../../assets/images/milk.png'
    },
    {
      name: 'Freezer',
      imageLink: '../../assets/images/freezer.png'
    },
    {
      name: 'Drinks',
      imageLink: '../../assets/images/drink.png'
    },
    {
      name: 'Beer, Wine & Spirits',
      imageLink: '../../assets/images/beer.png'
    },
    {
      name: 'Cleaning',
      imageLink: '../../assets/images/cleaning.png'
    },
    {
      name: 'Pharmacy',
      imageLink: '../../assets/images/pharmacy.png'
    },
    {
      name: 'Pet',
      imageLink: '../../assets/images/pet.png'
    },
    {
      name: 'Home & Lifestyle',
      imageLink: '../../assets/images/home.png'
    }
  ];
  firstName: string;
  carts: CartItem[];
  totalPrice: number = 0.00;

  @HostBinding('@fadeInOut') fadeInOut = true;
  showBrowseProduct: boolean = false;
  showSpecialOffer: boolean = false;
  showChristmas: boolean = false;
  showBetterTomorrow: boolean = false;
  showAccountDropdown: boolean = false;

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
    this.cartService.totalPrice.subscribe(price => {
      this.totalPrice += price;
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
  navigateToCategory(category: string) {
    this.router.navigate([`/shop/browse/${category.toLowerCase()}`])
    this.closeBrowseProduct();
  }
}
