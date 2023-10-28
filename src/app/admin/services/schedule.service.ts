import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Schedule {
  maLichTrinh: number;
  tenLichTrinh: string;
  moTa: string;
  thoiGianBatDau: Date;
  thoiGianKetThuc: Date;
  diemBatDau: string;
  soLuongDiemDenToiDa: number;
  trangThai: boolean;
  thuTu: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private schedules: Schedule[] = [
    {
      maLichTrinh: 1,
      tenLichTrinh: 'Lịch trình thử nghiệm',
      moTa: 'Lịch trình thử nghiệm cho ví dụ',
      thoiGianBatDau: new Date('2023-10-13T08:00:00'),
      thoiGianKetThuc: new Date('2023-10-14T18:00:00'),
      diemBatDau: 'Điểm xuất phát',
      soLuongDiemDenToiDa: 5,
      trangThai: true,
      thuTu: 1
    },
    {
      maLichTrinh: 2,
      tenLichTrinh: 'Lịch trình thứ hai',
      moTa: 'Mô tả lịch trình thứ hai',
      thoiGianBatDau: new Date('2023-10-15T10:00:00'),
      thoiGianKetThuc: new Date('2023-10-16T17:00:00'),
      diemBatDau: 'Điểm khởi hành',
      soLuongDiemDenToiDa: 3,
      trangThai: false,
      thuTu: 2
    },
    // Add more schedule data here
  ];

  getSchedules(): Observable<Schedule[]> {
    return of(this.schedules);
  }
}
