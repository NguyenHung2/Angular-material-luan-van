import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginComponent } from '../../auth/login/login.component';
import { ForgotPasswordComponent } from '../../auth/forgot-password/forgot-password.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/admin/services/user.service';
import { Subscription, fromEvent } from 'rxjs';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/admin/services/data-sharing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isForgotPassword: boolean = false;
  isLoginFormOpen: boolean = true;
  showSidenav = false;
  loggedInUser: User | null = null;

  private inactivityTimeout: number = 60 * 60 * 1000; // 1 phút
  private inactivityTimer: any;
  private activitySubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private dataSharingService: DataSharingService
  ) {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    // Theo dõi hoạt động của người dùng để đặt lại đồng hồ đếm thời gian
    this.activitySubscription = this.subscribeToUserActivity();

    // Đăng ký nhận thông báo từ Service khi có sự thay đổi
    this.dataSharingService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  ngOnInit(): void {
    // Log the user data when HeaderComponent is initialized
    console.log('Logged in user:', this.loggedInUser);
  }

  ngOnDestroy(): void {
    // Dọn dẹp các đăng ký khi thành phần bị hủy
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
    this.clearInactivityTimer();
  }

  toggleSidenav() {
    this.showSidenav = !this.showSidenav;
  }

  closeSidenav() {
    this.showSidenav = false;
  }

  openLoginDialog(): void {
    // Check if the "Forgot Password" form is open and close it
    if (this.isForgotPassword) {
      this.isForgotPassword = false;
    }

    // Set the login form to be open
    this.isLoginFormOpen = true;

    // Open the login dialog
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px', // Set the width as per your design
      data: {},
    });

    // Subscribe to the afterClosed event to get the result (logged-in user)
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the loggedInUser with the result from the dialog
        this.loggedInUser = result;

        // Save the loggedInUser to localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
      }
    });

    // Xóa đồng hồ đếm thời gian không hoạt động khi đăng nhập
    this.clearInactivityTimer();
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

  private subscribeToUserActivity(): Subscription {
    // Sử dụng RxJS để theo dõi sự kiện mousemove
    const mousemove$ = fromEvent(document, 'mousemove');

    // Đăng ký theo dõi sự kiện mousemove để kiểm tra hoạt động người dùng
    return mousemove$.subscribe(() => {
      // Nếu có hoạt động, hủy bỏ đồng hồ đếm thời gian hiện tại và bắt đầu một mới
      this.clearInactivityTimer();
      this.startInactivityTimer();
    });
  }

  private startInactivityTimer(): void {
    // Đặt đồng hồ đếm thời gian để tự động đăng xuất người dùng sau thời gian không hoạt động
    this.inactivityTimer = setTimeout(() => {
      // Thực hiện các logic đăng xuất ở đây
      this.logout();
    }, this.inactivityTimeout);
  }

  private clearInactivityTimer(): void {
    // Xóa đồng hồ đếm thời gian không hoạt động hiện tại
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }
  }

  logout(): void {
    // Remove the loggedInUser from localStorage
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('selectedScheduleLength');
    localStorage.removeItem('loadCategories');
    localStorage.removeItem('loadSchedules');
    localStorage.removeItem('loadScheduleDestinations');
  
    // Reset the loggedInUser to null
    this.loggedInUser = null;
    console.log("header: ", this.loggedInUser);
    console.log("selectedScheduleLength: ", localStorage);

    this.router.navigate(['/trang-chu']);
  
    // Xóa đồng hồ đếm thời gian không hoạt động khi đăng xuất
    this.clearInactivityTimer();
  
    // Open the login dialog after logout
    this.openLoginDialog();
  }  

  // Phương thức mới để xử lý sự kiện click liên kết "Lịch trình"
 handleLichTrinhClick(): void {
    if (!this.loggedInUser) {
      alert('Vui lòng đăng nhập tài khoản.');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/lich-trinh']);
    }
  }

  handleBanDoClick(): void {
    if (!this.loggedInUser) {
      alert('Vui lòng đăng nhập tài khoản.');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/ban-do']);
    }
  }

  handlThongTinClick(): void {
    if (!this.loggedInUser) {
      alert('Vui lòng đăng nhập tài khoản.');
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/thong-tin-nguoi-dung']);
    }
  } 
}