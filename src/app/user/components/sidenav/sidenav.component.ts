import { Component, Input } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  isForgotPassword: boolean = false;
  isLoginFormOpen: boolean = true;
  loggedInUsername!: string;
  @Input() showSidenav!: boolean;

  constructor(private dialog: MatDialog) { }

  toggleSidenav() {
    // Đảo ngược trạng thái của sidenav ở đây
    this.showSidenav = !this.showSidenav;
  }

  openLoginDialog(): void {
    if (this.isForgotPassword) {
      this.isForgotPassword = false; // Hide the "Forgot Password" form
    }
    this.isLoginFormOpen = true; // Show the login form
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data: {}
    });

    // Subscribe to the afterClosed event to get the result (logged-in username)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loggedInUsername = result;
      }
    });
  }

  logout(): void {
    // Implement your logout logic here
    // For example, clear user data, navigate to logout page, etc.
    this.loggedInUsername = '';
  }
}
