import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private selectedCategoryId: number | undefined;
  private selectedScheduleLength: number | undefined;

  getCategoryId(): number | undefined {
    return this.selectedCategoryId;
  }

  setCategoryId(categoryId: number): void {
    this.selectedCategoryId = categoryId;
  }

  getScheduleLength(): number | undefined {
    return this.selectedScheduleLength;
  }

  setScheduleLength(scheduleLength: number): void {
    this.selectedScheduleLength = scheduleLength;
  }
}
