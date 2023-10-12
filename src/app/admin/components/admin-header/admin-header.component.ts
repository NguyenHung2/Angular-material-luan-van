import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout(); // Gọi hàm logout từ dịch vụ xác thực của bạn
  }
}
