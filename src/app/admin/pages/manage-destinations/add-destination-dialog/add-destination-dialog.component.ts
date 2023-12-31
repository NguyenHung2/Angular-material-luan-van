import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';
import { Destination } from 'src/app/admin/services/destination.service';
import { Image } from 'src/app/admin/services/image.service';

@Component({
  selector: 'app-add-destination-dialog',
  templateUrl: './add-destination-dialog.component.html',
  styleUrls: ['./add-destination-dialog.component.css']
})
export class AddDestinationDialogComponent {
  newDestination: Destination = {
    maDiemDen: 0,
    tenDiemDen: '',
    moTa: '',
    kinhDo: null,
    viDo: null,
    diaChi: '',
    ngayTao: new Date(),
    maDanhMuc: 0,
    maAnh: 0,
    danhMuc: {
      maDanhMuc: 0,
      tenDanhMuc: ''
    },
  };
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  isInvalidKinhDo: boolean = false;
  isInvalidViDo: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destination: Destination,
      existingDestinations: Destination[],
      destinationCategories: DestinationCategory[], 
      images: Image[],
    },
    private snackBar: MatSnackBar
  ) {
    console.log('Constructor của AddDestinationDialogComponent được gọi.');
    console.log('Dữ liệu được truyền vào: ', this.data);
    console.log('Danh sách danh mục:', this.data.destinationCategories);
    console.log('Danh sách hình ảnh:', this.data.images);
  }

  saveChanges(): void {
    this.dialogRef.close(this.newDestination); 
    this.snackBar.open(
      'Người dùng đã được thêm thành công!',
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

  isDuplicateDestination(newDestination: Destination): boolean {
    const normalizedNewName = newDestination.tenDiemDen.toLowerCase();
    return this.data.existingDestinations.some(destination => destination.tenDiemDen.toLowerCase() === normalizedNewName);
  }
}
