import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  isSidebarVisible = true; // Bạn có thể đặt giá trị mặc định là true hoặc false

  toggleSidenav() {
    this.isSidebarVisible = !this.isSidebarVisible;

    // Nếu sidebar bị ẩn, thêm lớp 'sidebar-hidden' vào content
    const content = document.querySelector('.content') as HTMLElement;
    if (!this.isSidebarVisible) {
      content.classList.add('sidebar-hidden');
    } else {
      content.classList.remove('sidebar-hidden');
    }
  }
}
