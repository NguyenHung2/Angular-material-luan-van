import { Component, Inject, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-edit-post-category-dialog',
  templateUrl: './edit-post-category-dialog.component.html',
  styleUrls: ['./edit-post-category-dialog.component.css']
})
export class EditPostCategoryDialogComponent implements OnInit {
  editedPost!: Post;
  @ViewChild('fileInput') fileInput!: ElementRef; // Use ViewChild to reference the file input
  selectedFileName: string; // Add a property to store the selected file name

  constructor(
    public dialogRef: MatDialogRef<EditPostCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: Post, selectedFileName: string }
  ) {
    this.editedPost = { ...this.data.post };
    this.selectedFileName = this.data.selectedFileName;
  }

  ngOnInit(): void {
    // Initialize the dialog component
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
