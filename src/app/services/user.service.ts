import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environment';
import { Product } from '../models/product.model';
import { CartItem } from '../models/product-update.model';
import { CustomerOrder } from '../models/customer-order.model';
import { AuthenticationResult, SilentRequest } from '@azure/msal-browser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private cart: CartItem[] = [];
  constructor(private authService: MsalService, private http: HttpClient) {
    console.log(this.authService.instance.getAllAccounts()[0]);

    authService.handleRedirectObservable().subscribe({
      next: (authResult) => {
        const firstName = authResult.account.idTokenClaims.given_name as string;
        const lastName = authResult.account.idTokenClaims.family_name as string;
        const authID = authResult.account.localAccountId;
        console.log(authResult);
        console.log(this.authService.instance.getAllAccounts()[0]);
        this.http.post<{ cart: CartItem[] }>(`${environment.apiUrl}/api/users`, { firstName: firstName, lastName: lastName, authID: authID }).subscribe({
          next: (response) => {
            this.cart = response.cart;
          },
          error: (err) => {
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
          }else console.log(error)
        }
      },
      complete:()=>{
        console.log("Login successfully");
      }
    })
  }


  getAccessToken(): Observable<AuthenticationResult> {
    const account = this.authService.instance.getAllAccounts()[0]; 
    const silentRequest: SilentRequest = {
      scopes: ['https://adAzureBestBuy.onmicrosoft.com/api/demo.read'],
      account: account,
    };
    return this.authService.acquireTokenSilent(silentRequest);
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
        const authID = authResult.account.localAccountId;
        console.log(authResult);
        console.log(this.authService.instance.getAllAccounts()[0]);
        this.http.post<{ cart: CartItem[] }>(`${environment.apiUrl}/api/users`, { firstName: firstName, lastName: lastName, authID: authID }).subscribe({
          next: (response) => {
            this.cart = response.cart;
          },
          error: (err) => {
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
          }else console.log(error)
        }
      },
      complete:()=>{
        console.log("Login successfully");
      }
    });
  }

  logout() {
    this.authService.logout().subscribe({
      next:()=>{
        console.log("Logout successfully");
      }
    });
  }

  updateCart(product: CartItem) {
    this.getAccessToken().subscribe({
      next: (authResult: AuthenticationResult) => {
        const accessToken = authResult.accessToken;
        const authID = this.authService.instance.getAllAccounts()[0].localAccountId

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });

        console.log(headers)
        this.http.post<{ message: string }>(`${environment.apiUrl}/api/users/cart-update`, { product: product, authID: authID }, { headers }).subscribe({
          next: (res) => {
            console.log(res.message);
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
  }

  private firstNameObservable = new BehaviorSubject<string>(localStorage.getItem("userName"))
  firstName = this.firstNameObservable.asObservable();

  private cartObservablle = new BehaviorSubject<any[]>(this.cart);

  getCart() {
    this.getAccessToken().subscribe({
      next: (authResult: AuthenticationResult) => {
        const accessToken = authResult.accessToken;
        const authID = this.authService.instance.getAllAccounts()[0].localAccountId;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });
        console.log(authID)
        this.http.post<{ cart: any[] }>(`${environment.apiUrl}/api/users/get-cart`, { authID }, { headers }).subscribe({
          next: (response) => {
            this.cart = response.cart;
            this.cartObservablle.next(this.cart);
          },
          error: (err) => {
            console.log(err)
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
    return this.cartObservablle.asObservable();
  }

  removeCart() {
    this.getAccessToken().subscribe({
      next: (authResult: AuthenticationResult) => {
        const accessToken = authResult.accessToken;
        const authID = this.authService.instance.getAllAccounts()[0].localAccountId;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });
        this.http.post<{ message: string }>(`${environment.apiUrl}/api/users/remove-cart`, { authID: authID }, { headers }).subscribe({
          next: (response) => {
            console.log(response.message);
          },
          error: (err) => {
            console.log(err);
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
  }

  createOrder(order: CustomerOrder) {
    this.getAccessToken().subscribe({
      next: (authResult: AuthenticationResult) => {
        const accessToken = authResult.accessToken;
        const authID = this.authService.instance.getAllAccounts()[0].localAccountId;
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });
        this.http.post<{ message: string }>(`${environment.apiUrl}/api/users/create-order`, { order: order, authID: authID }, { headers }).subscribe({
          next: (response) => {
            console.log(response.message);
          },
          error: (err) => {
            console.log(err);
          },
          complete: () => {
            this.removeCart();
          }
        })
      },
      error: (err) => {
        console.log(err);
      }
    }
    )
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
