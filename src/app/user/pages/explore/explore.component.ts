import { Component } from '@angular/core';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent {
  applyFilters(filters: any) {
    // Thực hiện logic lọc và sắp xếp dữ liệu dựa trên các tùy chọn trong biến filters
    // Sau đó cập nhật lại danh sách địa điểm hiển thị
  }
}
