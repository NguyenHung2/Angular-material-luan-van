import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoginVisible: boolean = true;
  isSignUpVisible: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    // Logic đăng nhập
  }

  showForgotPassword() {
    this.isLoginVisible = false;
    this.isSignUpVisible = false;
  }

  showSignUpForm() {
    this.isSignUpVisible = true;
    this.isLoginVisible = false;
  }

  showLoginForm() {
    this.isLoginVisible = true;
    this.isSignUpVisible = false;
  }
}
