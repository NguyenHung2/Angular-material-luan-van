import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Destination } from 'src/app/admin/services/destination.service';
import { Image } from 'src/app/admin/services/image.service';
import { Post } from 'src/app/admin/services/post.service';
// ...

@Component({
  selector: 'app-edit-image-dialog',
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.css']
})
export class EditImageDialogComponent implements OnInit {
  image!: Image;
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFileName: string;

  constructor(
    public dialogRef: MatDialogRef<EditImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      image: Image,
      fileInput: HTMLInputElement,
      selectedFileName: string,
      destinations: Destination[],
      posts: Post[]
    }
  ) {
    this.image = { ...this.data.image };
    this.selectedFileName = this.data.selectedFileName;
  }

  ngOnInit(): void {
    // Initialize the dialog component
  }

  saveChanges(): void {
    this.dialogRef.close(this.image);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.image.duongDan = 'assets/' + this.selectedFileName;
    }
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
