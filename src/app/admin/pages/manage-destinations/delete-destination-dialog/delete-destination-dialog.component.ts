// delete-destination-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Destination } from 'src/app/admin/services/destination.service';

@Component({
  selector: 'app-delete-destination-dialog',
  templateUrl: './delete-destination-dialog.component.html',
  styleUrls: ['./delete-destination-dialog.component.css']
})
export class DeleteDestinationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { destination: Destination }
  ) {}

  confirmDeletion(): void {
    this.dialogRef.close(true); // Signal to the parent component that deletion is confirmed
  }

  cancelDeletion(): void {
    this.dialogRef.close(false); // Signal to the parent component that deletion is canceled
  }
}
