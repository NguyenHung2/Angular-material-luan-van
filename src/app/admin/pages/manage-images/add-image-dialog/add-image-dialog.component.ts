import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Destination } from 'src/app/admin/services/destination.service';
import { Image } from 'src/app/admin/services/image.service';
import { Post } from 'src/app/admin/services/post.service';

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {
  image: Image = {
    maAnh: 0, // Mã hình ảnh ban đầu, có thể đặt mặc định hoặc để trống tùy theo bạn
    tenAnh: '',
    duongDan: '',
    ngayTao: new Date(),
  };
  selectedFileName: string = ''; // Tên tệp đã chọn
  fileInput: HTMLInputElement; // Tham chiếu đến input type="file"
  isInputEmpty: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destinations: Destination[];
      posts: Post[];
    },
    private snackBar: MatSnackBar
  ) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.addEventListener('change', (event) => this.onFileSelected(event));
  }

  ngOnInit(): void {}

  openFileInput() {
    this.fileInput.click();
    this.snackBar.open(
      'Người dùng đã được thêm thành công!',
      'Đóng',
      {
        duration: 3000,
        panelClass: 'success-snackbar',
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFileName = file.name;
      this.image.duongDan = 'assets/' + this.selectedFileName;
    }
  }

  saveChanges() {
    if (this.image.tenAnh.trim() === '') {
      this.isInputEmpty = true;
      return;
    }
    // Thực hiện lưu hình ảnh và đóng dialog ở đây
    this.dialogRef.close(this.image);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
