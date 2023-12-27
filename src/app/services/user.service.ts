import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cart = [];
  private authID ="";
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
        const authID = authResult.uniqueId;
        this.http.post<{cart:Cart[]}>(`${environment.apiUrl}/api/users`,{firstName: firstName, lastName: lastName, authID: authID}).subscribe({
          next:(response)=>{
            this.authID = authID
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
      },
      // complete:()=>{
      //   this.http.post<{message:string}>(`${environment.apiUrl}/api/users/cart`,{authID: this.authID}).subscribe({
      //     next:(response)=>{
      //       console.log(response.message)
      //     },
      //     error:(err)=>{
      //       console.log(err)
      //     }
      //   })
      // }
    });
  }

  

  logout() {
    this.authService.logout();
  }

  private firstNameObservable = new BehaviorSubject<string>(localStorage.getItem("userName"))
  firstName = this.firstNameObservable.asObservable();

  private cartObservablle = new BehaviorSubject<Cart[]>(this.cart);
  getCart(){
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
