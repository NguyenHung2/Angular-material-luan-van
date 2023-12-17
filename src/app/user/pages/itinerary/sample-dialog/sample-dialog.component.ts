import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DestinationCategory, DestinationCategoryService } from 'src/app/admin/services/destination-category.service';
import { ScheduleDestination, ScheduleDestinationService } from 'src/app/admin/services/schedule-destination.service';
import { Schedule, ScheduleService } from 'src/app/admin/services/schedule.service';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-sample-dialog',
  templateUrl: './sample-dialog.component.html',
  styleUrls: ['./sample-dialog.component.css']
})
export class SampleDialogComponent implements OnInit {
  categories: DestinationCategory[] = [];
  scheduleDestinations: ScheduleDestination[] = [];
  schedules: Schedule[] = [];
  selectedCategoryId: number | null = null;
  selectedScheduleLength: number = 1;
  isFormClosed: boolean = false;
  scheduleLengths: number[] = [1, 2, 3, 4, 5];
  selectedSchedules: { [key: string]: boolean } = {};
  selectedScheduleId: number | null = null;

  constructor(
    private dialogRef: MatDialogRef<SampleDialogComponent>,
    private categoryService: DestinationCategoryService,
    private scheduleDestinationService: ScheduleDestinationService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadScheduleDestinations();
    this.loadSchedules();
  }

  loadCategories() {
    this.categoryService.getAllDestinationCategories().subscribe((categories: DestinationCategory[]) => {
      this.categories = categories;
    });
  }

  loadScheduleDestinations() {
    this.scheduleDestinationService.getScheduleDestination().subscribe((scheduleDestinations: ScheduleDestination[]) => {
      this.scheduleDestinations = scheduleDestinations;
    });
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((schedules: Schedule[]) => {
      this.schedules = schedules;
    });
  }

  selectCategory(selectedCategory: DestinationCategory) {
    this.selectedCategoryId = selectedCategory.maDanhMuc;
  }

  selectScheduleLength(length: number) {
    this.selectedScheduleLength = length;

    // Reset selectedSchedules
    this.selectedSchedules = {};

    // Log all schedule IDs with the selected length
    const schedulesWithSelectedLength = this.schedules.filter(schedule => schedule.soNgayThamQuan === length);
    const scheduleIdsWithSelectedLength = schedulesWithSelectedLength.map(schedule => schedule.maLichTrinh);

    console.log(`Schedule IDs with length ${length}:`, scheduleIdsWithSelectedLength);
  }

  getSelectedScheduleNames(): string[] {
    const schedulesWithSelectedLength = this.schedules.filter(schedule => schedule.soNgayThamQuan === this.selectedScheduleLength);
    return schedulesWithSelectedLength.map(schedule => schedule.tieuDe);
  }

  cancel() {
    this.isFormClosed = true;
    this.dialogRef.close(null);
  }

  findScheduleIdByLength(length: number): number | null {
    const foundSchedule = this.schedules.find(schedule => schedule.soNgayThamQuan === length);
    if (foundSchedule) {
      return foundSchedule.maLichTrinh;
    }
    return null;
  }

  findScheduleIdByName(scheduleName: string): number | null {
    const foundSchedule = this.schedules.find(schedule => schedule.tieuDe === scheduleName);
    return foundSchedule ? foundSchedule.maLichTrinh : null;
  }

  createSchedule() {
    this.isFormClosed = true;
    console.log('Selected createSchedule ID:', this.selectedScheduleId);
    this.dialogRef.close({ selectedScheduleId: this.selectedScheduleId });
  }

  isActive(category: DestinationCategory): boolean {
    return this.selectedCategoryId === category.maDanhMuc;
  }

  isSelectedSchedule(scheduleName: string): boolean {
    // Check if the current scheduleName is the selected schedule
    return this.selectedSchedules[scheduleName];
  }

  toggleSelectedSchedule(scheduleName: string): void {
    // Deactivate all schedules
    for (const key in this.selectedSchedules) {
      if (this.selectedSchedules.hasOwnProperty(key)) {
        this.selectedSchedules[key] = false;
      }
    }

    // Activate the clicked schedule
    this.selectedSchedules[scheduleName] = true;

    // Set the selected schedule ID
    this.selectedScheduleId = this.findScheduleIdByName(scheduleName);

    // Log the selected schedule ID
    console.log('Selected Schedule ID:', this.selectedScheduleId);
  }
}
