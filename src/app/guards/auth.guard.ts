import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: MsalService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.instance.getAllAccounts().length > 0) {
        console.log(this.authService.instance.getAllAccounts())
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}