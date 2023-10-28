import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Destination, DestinationService } from '../../services/destination.service';
import { DestinationCategory, DestinationCategoryService } from '../../services/destination-category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AddDestinationDialogComponent } from './add-destination-dialog/add-destination-dialog.component';
import { EditDestinationDialogComponent } from './edit-destination-dialog/edit-destination-dialog.component';
import { DeleteDestinationDialogComponent } from './delete-destination-dialog/delete-destination-dialog.component';
import { DetailDestinationDialogComponent } from './detail-destination-dialog/detail-destination-dialog.component';

@Component({
  selector: 'app-manage-destinations',
  templateUrl: './manage-destinations.component.html',
  styleUrls: ['./manage-destinations.component.css']
})
export class ManageDestinationsComponent implements OnInit {
  destinations: Destination[] = [];
  destinationCategories: DestinationCategory[] = [];
  searchControl = new FormControl('');
  filteredDestinations: MatTableDataSource<Destination> = new MatTableDataSource<Destination>(this.destinations);
  displayedColumns: string[] = ['maDiemDen', 'tenDiemDen', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newDestination: Destination = {
    maDiemDen: null,
    tenDiemDen: '',
    moTa: '',
    diaChi: '',
    kinhDo: null,
    viDo: null,
    ngayTao: new Date(),
    danhMuc: null
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private destinationService: DestinationService,
    private destinationCategoryService: DestinationCategoryService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadDestinations();
    this.loadDestinationCategories(); // Gọi để tải danh sách danh mục điểm đến
  }

  ngAfterViewInit() {
    this.filteredDestinations.sort = this.sort;
    this.filteredDestinations.paginator = this.paginator;
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe((data) => {
      this.destinations = data;
      this.filteredDestinations = new MatTableDataSource<Destination>(this.destinations);

      this.filteredDestinations.sort = this.sort;
      this.filteredDestinations.paginator = this.paginator;
    });
  }

  loadDestinationCategories() {
    this.destinationCategoryService.getAllDestinationCategories().subscribe((data) => {
      this.destinationCategories = data;
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredDestinations.filter = filterValue;
  }

  showEditForm(destination: Destination): void {
    const dialogRef = this.dialog.open(EditDestinationDialogComponent, {
      data: { destination, existingDestinations: this.destinations, destinationCategories: this.destinationCategories }
    });

    dialogRef.afterClosed().subscribe((editedDestination: Destination) => {
      if (editedDestination.maDiemDen !== null) {
        this.destinationService.updateDestination(editedDestination.maDiemDen, editedDestination).subscribe(
          (updatedDestination: Destination) => {
            this.loadDestinations();
          },
          (error) => {
            console.error('Lỗi khi cập nhật điểm đến:', error);
          }
        );
      }
    });
  }

  showDeleteForm(destination: Destination): void {
    if (destination.maDiemDen !== null) {
      const dialogRef = this.dialog.open(DeleteDestinationDialogComponent, {
        data: { destination }
      });

      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.destinationService.deleteDestination(destination.maDiemDen as number).subscribe(
            () => {
              this.loadDestinations();
            },
            (error) => {
              console.error('Failed to delete destination:', error);
            }
          );
        }
      });
    } else {
      // Handle the case where `destination.maDiemDen` is `null`.
    }
  }

  addDestination() {
    this.destinationService.createDestination(this.newDestination).subscribe(
      (newDestination: Destination) => {
        this.resetForm();
        this.loadDestinations();
      },
      (error) => {
        console.error('Failed to add new destination:', error);
      }
    );
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newDestination = {
      maDiemDen: null,
      tenDiemDen: '',
      moTa: '',
      diaChi: '',
      kinhDo: null,
      viDo: null,
      ngayTao: new Date(),
      danhMuc: null
    };
    this.showAddFormFlag = false;
  }

  showAddForm() {
    const dialogRef = this.dialog.open(AddDestinationDialogComponent, {
      data: {
        destination: this.newDestination,
        existingDestinations: this.destinations,
        destinationCategories: this.destinationCategories
      },
    });

    dialogRef.afterClosed().subscribe((addedDestination: Destination) => {
      if (addedDestination) {
        this.destinationService.createDestination(addedDestination).subscribe(
          (newDestination: Destination) => {
            this.loadDestinations();
            this.resetForm();
          },
          (error) => {
            console.error('Failed to add new destination:', error);
          }
        );
      }
    });
  }

  // Hiển thị form chi tiết
  showDetails(destination: Destination): void {
    const dialogRef = this.dialog.open(DetailDestinationDialogComponent, {
      data: { destination }
    });
  }
}
