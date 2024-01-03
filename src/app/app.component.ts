import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Best Buys';

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private authService: MsalService, private router: Router) {
    this.authService.handleRedirectObservable().subscribe({
      next: (result) => {
        if (result && this.authService.instance.getAllAccounts().length > 0) {
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
