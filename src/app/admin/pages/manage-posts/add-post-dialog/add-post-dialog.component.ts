import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {
  editedPost!: Post;
  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFileName: string;

  constructor(
    public dialogRef: MatDialogRef<AddPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post, selectedFileName: string }
  ) {
    this.editedPost = { ...this.data.post };
    this.selectedFileName = this.data.selectedFileName;
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.dialogRef.close(this.editedPost);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.editedPost.hinhAnh = URL.createObjectURL(file);
    }
  }

  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }
}
