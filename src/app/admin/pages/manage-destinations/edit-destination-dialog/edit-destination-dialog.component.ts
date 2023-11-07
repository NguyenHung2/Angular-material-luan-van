import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';

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

  constructor(
    public dialogRef: MatDialogRef<EditDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destination: Destination,
      existingDestinations: Destination[],
      destinationCategories: DestinationCategory[]
    },
  ) {
    this.destination = { ...this.data.destination };
  }

  saveChanges(): void {
    // this.isInputEmpty = false;
    // this.isDuplicateName = false;
    // this.isDescriptionEmpty = false;
    // this.isAddressEmpty = false;
    // this.isKinhDoEmpty = false;
    // this.isViDoEmpty = false;
  
    // if (this.destination.tenDiemDen.trim() === '') {
    //   this.isInputEmpty = true;
    // } else {
    //   // Kiểm tra trùng tên điểm đến
    //   if (this.isDuplicateDestination(this.destination)) {
    //     this.isDuplicateName = true;
    //   }
      
    //   // Kiểm tra rỗng cho các trường
    //   if (this.destination.moTa.trim() === '') {
    //     this.isDescriptionEmpty = true;
    //   }
    //   if (this.destination.diaChi.trim() === '') {
    //     this.isAddressEmpty = true;
    //   }
    //   if (this.destination.kinhDo === 0) {
    //     this.isKinhDoEmpty = true;
    //   }
    //   if (this.destination.viDo === 0) {
    //     this.isViDoEmpty = true;
    //   }
  
    //   if (this.destination.maDiemDen !== null) {
    //     // Update the category ID before making the API call
    //     this.destination.maDanhMuc = this.destination.maDanhMuc; // Assign the selected category value
  
    //     if (!this.isInputEmpty && !this.isDuplicateName && !this.isDescriptionEmpty && !this.isAddressEmpty && !this.isKinhDoEmpty && !this.isViDoEmpty) {
    //       // Gọi phương thức tạo hoặc cập nhật từ DestinationService
    //       this.destinationService.updateDestination(this.destination.maDiemDen, this.destination).subscribe(result => {
    //         // Xử lý kết quả sau khi cập nhật
    //         this.dialogRef.close(result);
    //       });
    //     }
    //   } else {
    //     // Xử lý trường hợp this.destination.maDiemDen là null
    //   }
    // }
    this.dialogRef.close(this.destination);
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
