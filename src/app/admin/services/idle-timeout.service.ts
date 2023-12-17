// idle-timeout.service.ts

import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IdleTimeoutService {
  // Thời gian chờ trước khi tự động đăng xuất (5 phút)
  private readonly idleTimeoutInSeconds = 300;

  // Khoảng thời gian giữa các lần đặt lại hẹn giờ (1 phút)
  private readonly resetTimerIntervalInSeconds = 60;

  // Subject để hủy bỏ hẹn giờ khi cần
  private resetTimer$ = new Subject<void>();

  // Observable hẹn giờ tự động
  private idleTimer$: Observable<number>;

  constructor() {
    // Tạo observable hẹn giờ với khoảng thời gian cụ thể
    this.idleTimer$ = timer(0, this.resetTimerIntervalInSeconds * 1000);

    // Thiết lập hẹn giờ tự động
    this.setupIdleTimeout();
  }

  // Thiết lập hẹn giờ tự động
  private setupIdleTimeout() {
    this.idleTimer$.pipe(takeUntil(this.resetTimer$)).subscribe(() => {
      // Khi hết thời gian chờ, đặt lại hẹn giờ
      this.resetTimer$.next();
    });
  }

  // Phương thức để đặt lại hẹn giờ khi có hoạt động
  resetIdleTimer() {
    this.resetTimer$.next();
  }

  // Lấy thời gian chờ tự động đăng xuất
  getIdleTimeoutInSeconds(): number {
    return this.idleTimeoutInSeconds;
  }
}
