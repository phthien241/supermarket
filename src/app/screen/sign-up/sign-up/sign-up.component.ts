import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  password: string = '';
  isMinLength: boolean = false;
  hasUppercase: boolean = false;
  hasLowercase: boolean = false;
  hasNumber: boolean = false;
  hasSpecialChar: boolean = false;
  
  checkPasswordRequirements() {
    this.isMinLength = this.password.length >= 8;
    this.hasUppercase = /[A-Z]/.test(this.password);
    this.hasLowercase = /[a-z]/.test(this.password);
    this.hasNumber = /[0-9]/.test(this.password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }
}
