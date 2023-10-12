import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  isLoginFormVisible: boolean = true;
  isSignUpVisible: boolean = false;
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  @Output() backToLogin: EventEmitter<any> = new EventEmitter();

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  signUp() {
    // Logic đăng ký tài khoản
  }

  showLoginForm() {
    this.isLoginFormVisible = true;
    this.isSignUpVisible = false;
  }
}
