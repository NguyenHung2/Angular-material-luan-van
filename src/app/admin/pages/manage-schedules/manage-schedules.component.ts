import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Schedule, ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.css'],
})
export class ManageSchedulesComponent implements OnInit, AfterViewInit {
  schedules: Schedule[] = [];
  searchControl = new FormControl('');
  filteredSchedules: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>(
    this.schedules
  );
  displayedColumns: string[] = [
    'maLichTrinh',
    'tenLichTrinh',
    'moTa',
    'thoiGianBatDau',
    'thoiGianKetThuc',
    'diemBatDau',
    'soLuongDiemDenToiDa',
    'trangThai',
    'thuTu',
    'thaoTac',
  ];

  // Add variables and models for adding new schedules
  showAddFormFlag: boolean = false;
  newScheduleForm!: FormGroup;
  newSchedule: Schedule = {
    maLichTrinh: 0,
    tenLichTrinh: '',
    moTa: '',
    thoiGianBatDau: new Date(),
    thoiGianKetThuc: new Date(),
    diemBatDau: '',
    soLuongDiemDenToiDa: 0,
    trangThai: true,
    thuTu: 0,
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private scheduleService: ScheduleService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;

      // Initialize filteredSchedules and set up sorting
      this.filteredSchedules = new MatTableDataSource<Schedule>(this.schedules);
      this.filteredSchedules.sort = this.sort;

      // Set default sorting by 'maLichTrinh' in ascending order
      this.sort.sort(<MatSortable>{
        id: 'maLichTrinh',
        start: 'asc',
      });
    });

    // Define the filter predicate for search
    this.filteredSchedules.filterPredicate = (data: Schedule, filter: string) => {
      const searchTerms = filter.toLowerCase().split(' ');
      return searchTerms.every((term) =>
        data.maLichTrinh.toString().toLowerCase().includes(term) ||
        data.tenLichTrinh.toLowerCase().includes(term) ||
        data.moTa.toLowerCase().includes(term) ||
        data.diemBatDau.toLowerCase().includes(term) ||
        (data.trangThai ? 'Hoạt động' : 'Ngừng hoạt động').toLowerCase().includes(term) ||
        data.thuTu.toString().toLowerCase().includes(term)
      );
    };

    this.searchControl.valueChanges.subscribe((value: string | null) => {
      if (value !== null) {
        this.applyFilter(value);
      }
    });

    this.newScheduleForm = this.fb.group({
      maLichTrinh: ['', Validators.required],
      tenLichTrinh: ['', Validators.required],
      moTa: ['', Validators.required],
      thoiGianBatDau: [new Date(), Validators.required],
      thoiGianKetThuc: [new Date(), Validators.required],
      diemBatDau: ['', Validators.required],
      soLuongDiemDenToiDa: [0, Validators.required],
      trangThai: [true, Validators.required],
      thuTu: [0, Validators.required],
    });
  }

  ngAfterViewInit() {
    // Configure paginator and sort after the view is initialized
    this.filteredSchedules.paginator = this.paginator;
    this.filteredSchedules.sort = this.sort;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredSchedules.filter = filterValue;
  }

  editSchedule(schedule: Schedule): void {
    // Handle edit action
  }

  deleteSchedule(schedule: Schedule): void {
    // Handle delete action
  }

  addSchedule() {
    if (this.newScheduleForm.valid) {
      // Logic to add a new schedule to the list
      // Example:
      this.schedules.push(this.newSchedule);

      this.resetForm();
    }
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newScheduleForm.reset(this.newSchedule);
    this.showAddFormFlag = false;
  }

  showAddForm() {
    this.showAddFormFlag = true;
  }
}
