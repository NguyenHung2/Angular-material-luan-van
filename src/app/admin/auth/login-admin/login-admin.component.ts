import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.userService.getAllUsers().subscribe(users => {
      const user = users.find(u => u.soDienThoai === this.username && u.matKhau === this.password);
  
      if (user) {
        // Lưu thông tin đăng nhập vào LocalStorage
        localStorage.setItem('loggedInUsername', user.tenNguoiDung);
        
        // Hiển thị thông báo thành công
        alert('Đăng nhập thành công!');
  
        // Chuyển hướng đến trang bảo mật sau khi đăng nhập
        this.router.navigate(['/admin/dashboard']);
      } else {
        // Xác thực không thành công, bạn có thể hiển thị thông báo lỗi
        console.log('Đăng nhập thất bại');
      }
    });
  }
  
}