import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddActivityDialogComponent } from './add-activity-dialog/add-activity-dialog.component';
import { EditActivityDialogComponent } from './edit-activity-dialog/edit-activity-dialog.component';
import { DeleteActivityDialogComponent } from './delete-activity-dialog/delete-activity-dialog.component';
import { DetailActivityDialogComponent } from './detail-activity-dialog/detail-activity-dialog.component';
import { Activity, ActivityService } from '../../services/activity.service';
import { Destination, DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit {
  activities: Activity[] = [];
  destinations: Destination[] = [];  

  searchControl = new FormControl('');
  filteredActivities: MatTableDataSource<Activity> = new MatTableDataSource<Activity>(this.activities);
  displayedColumns: string[] = ['maHoatDong', 'tenHoatDong', 'thoiGianBatDau', 'thoiGianKetThuc', 'maDiemDen', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newActivity: Activity = {
    maHoatDong: 0,
    tenHoatDong: '',
    thoiGianBatDau: new Date(),
    thoiGianKetThuc: new Date(),
    maDiemDen: 0,
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private activityService: ActivityService,
    private destinationService: DestinationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadActivities();
    // Load destinations if needed
  }

  ngAfterViewInit() {
    this.filteredActivities.sort = this.sort;
    this.filteredActivities.paginator = this.paginator;
  }

  loadActivities() {
    this.activityService.getAllActivities().subscribe((data) => {
      this.activities = data;

      this.filteredActivities = new MatTableDataSource<Activity>(this.activities);

      this.filteredActivities.sort = this.sort;
      this.filteredActivities.paginator = this.paginator;
    });
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe((data) => {
      this.destinations = data;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredActivities.filter = filterValue;
  }

  showEditForm(activity: Activity): void {
    // Similar to the implementation in ManageDestinationsComponent
    // Use MatDialog to open the edit activity dialog
  }

  showDeleteForm(activity: Activity): void {
    // Similar to the implementation in ManageDestinationsComponent
    // Use MatDialog to open the delete activity dialog
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newActivity = {
      maHoatDong: 0,
      tenHoatDong: '',
      thoiGianBatDau: new Date(),
      thoiGianKetThuc: new Date(),
      maDiemDen: 0,
      // Reset other properties as needed
    };
    this.showAddFormFlag = false;
  }

  showAddForm() {
    const dialogRef = this.dialog.open(AddActivityDialogComponent, {
      data: {
        activity: this.newActivity,
        destinations: this.destinations,
      },
    });

    dialogRef.afterClosed().subscribe((addedActivity: Activity) => {
      if (addedActivity) {
        this.activityService.createActivity(addedActivity).subscribe(
          (newActivity: Activity) => {
            this.loadActivities();
            this.resetForm();
          },
          (error) => {
            console.error('Error adding new activity:', error);
          }
        );
      }
    });
  }

  showDetails(activity: Activity): void {
    // Similar to the implementation in ManageDestinationsComponent
    // Use MatDialog to open the detail activity dialog
  }
}
