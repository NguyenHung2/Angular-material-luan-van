import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() isSidebarVisible: boolean | undefined;
  isCategoryMenuOpen = false;
  isDiemDenActive = false;
  isBaiVietActive = false;
  isNewCategoryMenuOpen = false;
  isLichTrinhActive = false;
  isHoatDongActive = false;
  isChiTietActive = false;

  toggleCategoryMenu() {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
  }

  toggleNewCategoryMenu() {
    this.isNewCategoryMenuOpen = !this.isNewCategoryMenuOpen;
  }
}
