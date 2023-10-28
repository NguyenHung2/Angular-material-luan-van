import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-edit-destination-dialog',
  templateUrl: './edit-destination-dialog.component.html',
  styleUrls: ['./edit-destination-dialog.component.css']
})
export class EditDestinationDialogComponent {
  editedDestination: Destination;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  isDescriptionEmpty: boolean = false;
  isAddressEmpty: boolean = false;
  isKinhDoEmpty: boolean = false;
  isViDoEmpty: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<EditDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destination: Destination,
      existingDestinations: Destination[]
    },
    private destinationService: DestinationService
  ) {
    this.editedDestination = { ...this.data.destination };
  }

  saveChanges(): void {
    this.isInputEmpty = false;
    this.isDuplicateName = false;
    this.isDescriptionEmpty = false;
    this.isAddressEmpty = false;
    this.isKinhDoEmpty = false;
    this.isViDoEmpty = false;

    if (this.editedDestination.tenDiemDen.trim() === '') {
      this.isInputEmpty = true;
    } else {
      // Kiểm tra trùng tên điểm đến
      if (this.isDuplicateDestination(this.editedDestination)) {
        this.isDuplicateName = true;
      }
      
      // Kiểm tra rỗng cho các trường
      if (this.editedDestination.moTa.trim() === '') {
        this.isDescriptionEmpty = true;
      }
      if (this.editedDestination.diaChi.trim() === '') {
        this.isAddressEmpty = true;
      }
      if (this.editedDestination.kinhDo === 0) {
        this.isKinhDoEmpty = true;
      }
      if (this.editedDestination.viDo === 0) {
        this.isViDoEmpty = true;
      }

      if (this.editedDestination.maDiemDen !== null) {
        if (!this.isInputEmpty && !this.isDuplicateName && !this.isDescriptionEmpty && !this.isAddressEmpty && !this.isKinhDoEmpty && !this.isViDoEmpty) {
          // Gọi phương thức tạo hoặc cập nhật từ DestinationService
          this.destinationService.updateDestination(this.editedDestination.maDiemDen, this.editedDestination).subscribe(result => {
            // Xử lý kết quả sau khi cập nhật
            this.dialogRef.close(result);
          });
        }
      } else {
        // Xử lý trường hợp this.editedDestination.maDiemDen là null
      }
      
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  isDuplicateDestination(editedDestination: Destination): boolean {
    const normalizedEditedDestinationName = editedDestination.tenDiemDen.toLowerCase();
    return this.data.existingDestinations.some(destination =>
      destination.tenDiemDen.toLowerCase() === normalizedEditedDestinationName && destination.maDiemDen !== editedDestination.maDiemDen
    );
  }
}
