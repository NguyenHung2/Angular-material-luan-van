import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  @Input() showSidenav!: boolean;

  constructor() { }

  toggleSidenav() {
    // Đảo ngược trạng thái của sidenav ở đây
    this.showSidenav = !this.showSidenav;
  }
}
