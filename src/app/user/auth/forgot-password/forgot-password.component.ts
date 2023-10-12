import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  @Output() backToLogin: EventEmitter<any> = new EventEmitter();

  resetPassword() {
    // Thực hiện logic khôi phục mật khẩu ở đây
  }

  showLogin() {
    this.backToLogin.emit();
  }
}
