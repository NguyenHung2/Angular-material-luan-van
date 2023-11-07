import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    maDiemDen: null, // Khởi tạo là null, bạn có thể thay đổi giá trị trong quá trình nhập liệu
    maBaiViet: null, // Khởi tạo là null, bạn có thể thay đổi giá trị trong quá trình nhập liệu
  };
  selectedFileName: string = ''; // Tên tệp đã chọn
  fileInput: HTMLInputElement; // Tham chiếu đến input type="file"

  constructor(
    public dialogRef: MatDialogRef<AddImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      destinations: Destination[];
      posts: Post[];
    }
  ) {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.addEventListener('change', (event) => this.onFileSelected(event));
  }

  ngOnInit(): void {}

  openFileInput() {
    this.fileInput.click();
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
    // Thực hiện lưu hình ảnh và đóng dialog ở đây
    this.dialogRef.close(this.image);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
