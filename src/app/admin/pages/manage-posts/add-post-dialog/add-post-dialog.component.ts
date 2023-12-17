import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Image } from 'src/app/admin/services/image.service';
import { ListPost } from 'src/app/admin/services/list-post.service';
import { Post } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent {
  editedPost!: Post;

  constructor(
    public dialogRef: MatDialogRef<AddPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      post: Post,
      listPosts: ListPost[],
      images: Image[]
    },
    private snackBar: MatSnackBar
  ) {
    this.editedPost = { ...this.data.post };
  }

  ngOnInit(): void {
  }

  saveChanges(): void {
    this.dialogRef.close(this.editedPost);
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

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
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
