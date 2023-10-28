import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DestinationCategory } from 'src/app/admin/services/destination-category.service';
import { Destination, DestinationService } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-add-destination-dialog',
  templateUrl: './add-destination-dialog.component.html',
  styleUrls: ['./add-destination-dialog.component.css']
})
export class AddDestinationDialogComponent {
  newDestination: Destination;
  isInputEmpty: boolean = false;
  isDuplicateName: boolean = false;
  isInvalidKinhDo: boolean = false;
  isInvalidViDo: boolean = false;
  destinationCategories: DestinationCategory[]; // Danh sách danh mục điểm đến

  constructor(
    public dialogRef: MatDialogRef<AddDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destination: Destination,
      existingDestinations: Destination[],
      destinationCategories: DestinationCategory[] // Inject danh sách danh mục
    },
    private destinationService: DestinationService
  ) {
    this.newDestination = { ...this.data.destination };
    this.destinationCategories = this.data.destinationCategories; // Gán danh sách danh mục từ data
  }

  saveChanges(): void {
    this.isInputEmpty = false;
    this.isDuplicateName = false;
    this.isInvalidKinhDo = false;
    this.isInvalidViDo = false;

    if (!this.newDestination.tenDiemDen.trim()) {
      this.isInputEmpty = true;
    } else if (this.isDuplicateDestination(this.newDestination)) {
      this.isDuplicateName = true;
    } else {
      this.dialogRef.close(this.newDestination);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  isDuplicateDestination(newDestination: Destination): boolean {
    const normalizedNewName = newDestination.tenDiemDen.toLowerCase();
    return this.data.existingDestinations.some(destination => destination.tenDiemDen.toLowerCase() === normalizedNewName);
  }
}
