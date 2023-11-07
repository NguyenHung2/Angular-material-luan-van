import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Schedule, ScheduleService } from '../../services/schedule.service';
import { EditScheduleDialogComponent } from './edit-schedule-dialog/edit-schedule-dialog.component';
import { DeleteScheduleDialogComponent } from './delete-schedule-dialog/delete-schedule-dialog.component';
import { DetailScheduleDialogComponent } from './detail-schedule-dialog/detail-schedule-dialog.component';
import { AddScheduleDialogComponent } from './add-schedule-dialog/add-schedule-dialog.component';
import { User, UserService } from '../../services/user.service';

@Component({
  selector: 'app-manage-schedules',
  templateUrl: './manage-schedules.component.html',
  styleUrls: ['./manage-schedules.component.css']
})
export class ManageSchedulesComponent implements OnInit {
  schedules: Schedule[] = [];
  user: User[] = [];
  searchControl = new FormControl('');
  filteredSchedules: MatTableDataSource<Schedule> = new MatTableDataSource<Schedule>(this.schedules);
  displayedColumns: string[] = ['maLichTrinh', 'tieuDe', 'moTa', 'maNguoiDung', 'kinhDoXuatPhat', 'viDoXuatPhat', 'soLuongDiemDenToiDa', 'thaoTac'];

  newSchedule: Schedule = {
    maLichTrinh: 0,
    tieuDe: '',
    moTa: '',
    maNguoiDung: 0,
    kinhDoXuatPhat: 0,
    viDoXuatPhat: 0,
    soLuongDiemDenToiDa: 5
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSchedules();
    this.loadUsers();
  }

  ngAfterViewInit() {
    this.filteredSchedules.sort = this.sort;
    this.filteredSchedules.paginator = this.paginator;
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;
      this.filteredSchedules = new MatTableDataSource<Schedule>(this.schedules);

      this.filteredSchedules.sort = this.sort;
      this.filteredSchedules.paginator = this.paginator;
    });
  }

  // Tải danh sách người dùng
  loadUsers() {
    this.userService.getAllUsers().subscribe((data) => {
      this.user = data;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredSchedules.filter = filterValue;
  }

  editSchedule(schedule: Schedule): void {
    const dialogRef = this.dialog.open(EditScheduleDialogComponent, {
      data: { schedule }
    });

    dialogRef.afterClosed().subscribe((editedSchedule: Schedule) => {
      if (editedSchedule) {
        this.scheduleService.updateSchedule(editedSchedule).subscribe(
          (updatedSchedule: Schedule) => {
            this.loadSchedules();
          },
          (error) => {
            console.error('Failed to update schedule:', error);
          }
        );
      }
    });
  }

  deleteSchedule(schedule: Schedule): void {
    const dialogRef = this.dialog.open(DeleteScheduleDialogComponent, {
      data: { schedule }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.scheduleService.deleteSchedule(schedule.maLichTrinh).subscribe(
          () => {
            this.loadSchedules();
          },
          (error) => {
            console.error('Failed to delete schedule:', error);
          }
        );
      }
    });
  }

  addSchedule(): void {
    const dialogRef = this.dialog.open(AddScheduleDialogComponent, {
      data: {
        schedules: this.newSchedule,
        users: this.user
      }
    });

    dialogRef.afterClosed().subscribe((newSchedule: Schedule) => {
      if (newSchedule) {
        this.scheduleService.addSchedule(newSchedule).subscribe(
          (newSchedule: Schedule) => {
            this.loadSchedules();
          },
          (error) => {
            console.error('Failed to add new schedule:', error);
          }
        );
      }
    });
  }

  showScheduleDetails(schedule: Schedule): void {
    const dialogRef = this.dialog.open(DetailScheduleDialogComponent, {
      data: { ...schedule }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Xử lý khi dialog đóng (nếu cần)
    });
  }
}
