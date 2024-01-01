import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment';
import { Product } from '../models/product.model';
import { CartItem } from '../models/product-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cart:CartItem[] = [];
  constructor(private authService: MsalService, private http: HttpClient) { 
  }

  checkAuthenticated() {
    if (this.authService.instance.getAllAccounts().length == 0) {
      this.clearFirstName();
    }
  }
  login() {
    this.authService.loginPopup().subscribe({
      next: (authResult) => {
        const firstName = authResult.account.idTokenClaims.given_name as string;
        const lastName = authResult.account.idTokenClaims.family_name as string;
        const authID = authResult.account.homeAccountId;
        this.http.post<{cart:CartItem[]}>(`${environment.apiUrl}/api/users`,{firstName: firstName, lastName: lastName, authID: authID}).subscribe({
          next:(response)=>{
            this.cart = response.cart;
          },
          error:(err)=>{
            console.log(err)
          }
        })
        this.updateFirstName(firstName);
      },
      error: (error) => {
        if (error.errorMessage) {
          if (error.errorMessage.indexOf('AADB2C90118') > -1) {
            this.authService.loginPopup({
              authority: 'https://adAzureBestBuy.b2clogin.com/adAzureBestBuy.onmicrosoft.com/B2C_1_Best-Buy-Rest-Password',
              scopes: ['openid', 'profile']
            })
          }
        }
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  updateCart(product: CartItem){
    const authID = this.authService.instance.getAllAccounts()[0].homeAccountId
    this.http.post<{message:string}>(`${environment.apiUrl}/api/users/cart-update`,{product: product, authID: authID}).subscribe(res=>{
      next:()=>{
        console.log(res.message);
      }
    })
  }

  private firstNameObservable = new BehaviorSubject<string>(localStorage.getItem("userName"))
  firstName = this.firstNameObservable.asObservable();

  private cartObservablle = new BehaviorSubject<any[]>(this.cart);
  getCart(){
    const authID = this.authService.instance.getAllAccounts()[0].homeAccountId;
    this.http.post<{cart:any[]}>(`${environment.apiUrl}/api/users/get-cart`,{authID: authID}).subscribe({
      next:(response)=>{
        this.cart = response.cart;
        console.log(this.cart)
        this.cartObservablle.next(this.cart);
      },
      error:(err)=>{
        console.log(err)
      }
    })
    return this.cartObservablle.asObservable();
  }

  updateFirstName(name: string) {
    localStorage.setItem('userName', name);
    this.firstNameObservable.next(name);
  }

  clearFirstName() {
    localStorage.removeItem('userName');
    this.firstNameObservable.next('');
  }

  
}
