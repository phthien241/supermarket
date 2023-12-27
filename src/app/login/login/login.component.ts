import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private authService: MsalService, private router: Router) {   
  }

  login() {
    this.authService.loginPopup().subscribe({
      next: (authResult) => {
        this.router.navigate(['']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


}
