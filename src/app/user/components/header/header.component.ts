import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isForgotPassword: boolean = false;
  isLoginFormOpen: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLoginDialog(): void {
    if (this.isForgotPassword) {
      this.isForgotPassword = false; // Hide the "Forgot Password" form
    }
    this.isLoginFormOpen = true; // Show the login form
    this.dialog.open(LoginComponent, {
      width: '400px',
      data: {}
    });
  }

  openForgotPasswordDialog(): void {
    this.isLoginFormOpen = false; // Hide the login form
    this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
      data: {}
    });
  }

  toggleForm() {
    this.isForgotPassword = !this.isForgotPassword;
  }
}