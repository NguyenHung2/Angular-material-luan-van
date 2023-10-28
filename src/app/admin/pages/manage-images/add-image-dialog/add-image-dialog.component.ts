import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Image } from 'src/app/admin/services/image.service';

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {
  addedImage!: Image; 
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFileName: string;

  constructor(
    public dialogRef: MatDialogRef<AddImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: Image, selectedFileName: string }
  ) {
    this.addedImage = { ...this.data.image };
    this.selectedFileName = this.data.selectedFileName;
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.dialogRef.close(this.addedImage);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.addedImage.duongDan = 'assets/' + this.selectedFileName;
    }
  }  

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
