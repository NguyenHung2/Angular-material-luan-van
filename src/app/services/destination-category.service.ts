import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface DestinationCategory {
  maDanhMuc: number;
  tenDanhMuc: string;
}


@Injectable({
  providedIn: 'root',
})
export class DestinationCategoryService {
  private categories: DestinationCategory[] = [
    { maDanhMuc: 1, tenDanhMuc: 'Cảnh quan thiên nhiên' },
    { maDanhMuc: 2, tenDanhMuc: 'Di tích lịch sử và văn hóa' },
    { maDanhMuc: 3, tenDanhMuc: 'Mua sắm và ẩm thực' },
    { maDanhMuc: 4, tenDanhMuc: 'Hoạt động ngoài trời và thể thao' },
    { maDanhMuc: 5, tenDanhMuc: 'Tôn giáo và lễ hội' },
    { maDanhMuc: 6, tenDanhMuc: 'Du lịch sinh thái' },
  ];

  getCategories(): Observable<DestinationCategory[]> {
    return of(this.categories);
  }
}
