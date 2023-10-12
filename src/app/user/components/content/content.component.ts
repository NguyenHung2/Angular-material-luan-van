import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  isForgotPassword: boolean = false; // Trạng thái ban đầu

  constructor() { }

  ngOnInit(): void {
  }

  toggleForm() {
    this.isForgotPassword = !this.isForgotPassword;
  }
}