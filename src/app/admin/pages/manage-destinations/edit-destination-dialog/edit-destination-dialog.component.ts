import { Component, Inject, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';
import { Destination } from 'src/app/admin/services/destination.service';
import { Image } from 'src/app/admin/services/image.service';

@Component({
  selector: 'app-edit-destination-dialog',
  templateUrl: './edit-destination-dialog.component.html',
  styleUrls: ['./edit-destination-dialog.component.css']
})
export class EditDestinationDialogComponent {
  destination: Destination;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  isDescriptionEmpty: boolean = false;
  isAddressEmpty: boolean = false;
  isKinhDoEmpty: boolean = false;
  isViDoEmpty: boolean = false;
  isNgayTaoEmpty: boolean = false;
  @ViewChild('picker') picker!: MatDatepicker<Date>;

  constructor(
    public dialogRef: MatDialogRef<EditDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destination: Destination,
      existingDestinations: Destination[],
      destinationCategories: DestinationCategory[],
      images: Image[]
    },
    private snackBar: MatSnackBar
  ) {
    this.destination = { 
      ...this.data.destination,
      maDanhMuc: data.destination.danhMuc?.maDanhMuc!, 
      maAnh: data.destination.anh?.maAnh!
    };
    console.log("danh mục: ", data.destination.danhMuc?.tenDanhMuc);
  }

  saveChanges(): void {
    this.dialogRef.close(this.destination);
    this.snackBar.open(
      'Người dùng đã được cập nhật thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }  

  closeDialog(): void {
    this.dialogRef.close();
  }

  isDuplicateDestination(destination: Destination): boolean {
    const normalizeddestinationName = destination.tenDiemDen.toLowerCase();
    return this.data.existingDestinations.some(destination =>
      destination.tenDiemDen.toLowerCase() === normalizeddestinationName && destination.maDiemDen !== destination.maDiemDen
    );
  }
}
