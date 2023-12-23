import { Component, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';

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
  constructor(private router: Router) { }
  navigateToLogin() {
    this.router.navigate(["/login"]);
  }
  @HostBinding('@fadeInOut') fadeInOut = true;
  showBrowseProduct: boolean = false;
  showSpecialOffer: boolean = false;
  showChristmas: boolean = false;
  showBetterTomorrow: boolean = false;
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
}
