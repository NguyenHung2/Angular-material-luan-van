import { Component, Inject, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Image } from 'src/app/admin/services/image.service';
import { ListPost } from 'src/app/admin/services/list-post.service';
import { Post } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-edit-post-category-dialog',
  templateUrl: './edit-post-category-dialog.component.html',
  styleUrls: ['./edit-post-category-dialog.component.css']
})
export class EditPostCategoryDialogComponent {
  post!: Post;
  @ViewChild('picker') picker!: MatDatepicker<Date>;

  constructor(
    public dialogRef: MatDialogRef<EditPostCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      post: Post,
      listPosts: ListPost[],
      images: Image[]
    },
    private snackBar: MatSnackBar
  ) {
    this.post = {
      ...this.data.post,
      maLoai: data.post.loai?.maLoai!,
      maAnh: data.post.anh?.maAnh!
    };
    console.log("POST: ", data.post);
    console.log("POST: ", data.post.loai?.maLoai);
  }

  saveChanges(): void {
    this.dialogRef.close(this.post);
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    // defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}
