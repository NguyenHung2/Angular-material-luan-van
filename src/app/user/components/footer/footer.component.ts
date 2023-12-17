// footer.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private router: Router) { }

  handleLichTrinhClick(): void {
    // Handle the click event for the "Lịch trình" link
    // You can perform additional logic if needed
    this.router.navigate(['/lich-trinh']);
  }

  handleBanDoClick(): void {
    // Handle the click event for the "Bản đồ" link
    // You can perform additional logic if needed
    this.router.navigate(['/ban-do']);
  }

  handlThongTinClick(): void {
    // Handle the click event for the "Thông tin" link
    // You can perform additional logic if needed
    this.router.navigate(['/thong-tin-nguoi-dung']);
  }
}
