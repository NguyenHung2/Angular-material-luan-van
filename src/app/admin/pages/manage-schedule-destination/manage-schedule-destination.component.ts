import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDestination, ScheduleDestinationService } from '../../services/schedule-destination.service';
import { AddScheduleDestinationDialogComponent } from './add-schedule-destination-dialog/add-schedule-destination-dialog.component';
import { EditScheduleDestinationDialogComponent } from './edit-schedule-destination-dialog/edit-schedule-destination-dialog.component';
import { DeleteScheduleDestinationDialogComponent } from './delete-schedule-destination-dialog/delete-schedule-destination-dialog.component';
import { DetailScheduleDestinationDialogComponent } from './detail-schedule-destination-dialog/detail-schedule-destination-dialog.component';
import { Schedule, ScheduleService } from '../../services/schedule.service';
import { Destination, DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-manage-schedule-destination',
  templateUrl: './manage-schedule-destination.component.html',
  styleUrls: ['./manage-schedule-destination.component.css']
})
export class ManageScheduleDestinationComponent implements OnInit {
  scheduleDestinations: ScheduleDestination[] = [];
  schedules: Schedule[] = [];
  destinations: Destination[] = [];
  searchControl = new FormControl('');
  filteredScheduleDestinations: MatTableDataSource<ScheduleDestination> = new MatTableDataSource<ScheduleDestination>(this.scheduleDestinations);
  displayedColumns: string[] = ['maLichTrinhDiemDen', 'thuTu', 'thaoTac'];

  newScheduleDestination: ScheduleDestination = {
    maLichTrinhDiemDen: 0,
    maLichTrinh: 0,
    maDiemDen: 0,
    thuTu: 0,
    hoatDong: ''
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private scheduleDestinationService: ScheduleDestinationService,
    private scheduleService: ScheduleService,
    private destinationService: DestinationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadScheduleDestinations();
    this.loadSchedules();
    this.loadDestinations();
  }

  ngAfterViewInit() {
    this.filteredScheduleDestinations.sort = this.sort;
    this.filteredScheduleDestinations.paginator = this.paginator;
  }

  loadScheduleDestinations() {
    this.scheduleDestinationService.getScheduleDestination().subscribe((data) => {
      this.scheduleDestinations = data;
      console.log(data);
      this.filteredScheduleDestinations = new MatTableDataSource<ScheduleDestination>(this.scheduleDestinations);

      this.filteredScheduleDestinations.sort = this.sort;
      this.filteredScheduleDestinations.paginator = this.paginator;
    });
  }

  loadSchedules() {
    this.scheduleService.getSchedules().subscribe((data) => {
      this.schedules = data;
    });
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe((data) => {
      this.destinations = data;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredScheduleDestinations.filter = filterValue;
  }

  editScheduleDestination(scheduleDestination: ScheduleDestination): void {
    console.log('Before Edit:', scheduleDestination);
    const dialogRef = this.dialog.open(EditScheduleDestinationDialogComponent, {
      data: { scheduleDestination }
    });
  
    dialogRef.afterClosed().subscribe((editedDestination: ScheduleDestination) => {
      if (editedDestination) {
        console.log('After Edit:', editedDestination);
        this.scheduleDestinationService.updateScheduleDestination(editedDestination).subscribe(
          (updatedDestination: ScheduleDestination) => {
            console.log('After Service Call:', updatedDestination);
            this.loadScheduleDestinations();
          },
          (error) => {
            console.error('Failed to update schedule destination:', error);
          }
        );
      }
    });
  }
  

  deleteScheduleDestination(destination: ScheduleDestination): void {
    const dialogRef = this.dialog.open(DeleteScheduleDestinationDialogComponent, {
      data: { destination }
    });

    console.log(destination);

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.scheduleDestinationService.deleteScheduleDestination(destination.maLichTrinhDiemDen).subscribe(
          () => {
            this.loadScheduleDestinations();
          },
          (error) => {
            console.error('Failed to delete schedule destination:', error);
          }
        );
      }
    });
  }

  addScheduleDestination() {
    const dialogRef = this.dialog.open(AddScheduleDestinationDialogComponent, {
      data: {
        scheduleDestinations: this.newScheduleDestination,
        schedules: this.schedules,
        destinations: this.destinations
      }
    });

    dialogRef.afterClosed().subscribe((newScheduleDestination: ScheduleDestination) => {
      if (newScheduleDestination) {
        this.scheduleDestinationService.addScheduleDestination(newScheduleDestination).subscribe(
          (addedDestination: ScheduleDestination) => {
            this.loadScheduleDestinations();
          },
          (error) => {
            console.error('Failed to add schedule destination:', error);
          }
        );
      }
    });
  }

  showDestinationDetails(destination: ScheduleDestination) {
    const dialogRef = this.dialog.open(DetailScheduleDestinationDialogComponent, {
      data: { destination }
    });

    console.log(destination);

    dialogRef.afterClosed().subscribe(() => {
      // Handle any action you need after closing the details dialog.
    });
  }
}