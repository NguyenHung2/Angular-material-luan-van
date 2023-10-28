import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Image, ImageService } from '../../services/image.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddImageDialogComponent } from './add-image-dialog/add-image-dialog.component';
import { DeleteImageDialogComponent } from './delete-image-dialog/delete-image-dialog.component';
import { DetailImageDialogComponent } from './detail-image-dialog/detail-image-dialog.component';
import { EditImageDialogComponent } from './edit-image-dialog/edit-image-dialog.component';
import { Post, PostService } from '../../services/post.service';
import { Destination, DestinationService } from '../../services/destination.service';

@Component({
  selector: 'app-manage-images',
  templateUrl: './manage-images.component.html',
  styleUrls: ['./manage-images.component.css']
})
export class ManageImagesComponent implements OnInit {
  images: Image[] = [];
  posts: Post[] = []; 
  destinations: Destination[] = []; 
  searchControl = new FormControl('');
  filteredImages: MatTableDataSource<Image> = new MatTableDataSource<Image>(this.images);
  displayedColumns: string[] = ['maAnh', 'tenAnh', 'duongDan', 'ngayTao', 'maDiemDen', 'maBaiViet', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newImageForm!: FormGroup;
  newImage: Image = {
    maAnh: 0,
    tenAnh: '',
    duongDan: '',
    ngayTao: new Date(),
    maDiemDen: null,
    maBaiViet: null,
  };

  selectedFileName: string = 'Chưa chọn tệp';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private imageService: ImageService,
    private postService: PostService, 
    private destinationService: DestinationService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadImages();
    this.setupForm();
    this.loadPosts(); 
    this.loadDestinations();
  }

  ngAfterViewInit() {
    this.filteredImages.sort = this.sort;
    this.filteredImages.paginator = this.paginator;
  }

  loadImages() {
    this.imageService.getAllImages().subscribe((data) => {
      this.images = data;
      this.filteredImages = new MatTableDataSource<Image>(this.images);

      this.filteredImages.sort = this.sort;
      this.filteredImages.paginator = this.paginator;
    });
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  loadDestinations() {
    this.destinationService.getAllDestinations().subscribe((data) => {
      this.destinations = data;
    });
  }

  setupForm() {
    this.newImageForm = this.fb.group({
      tenAnh: ['', Validators.required],
      duongDan: ['', Validators.required],
      ngayTao: [new Date(), Validators.required],
      diemDen: null, // You can set a default value if needed
      baiViet: null, // You can set a default value if needed
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredImages.filter = filterValue;
  }

  editImage(image: Image): void {
    const dialogRef = this.dialog.open(EditImageDialogComponent, {
      data: { image, fileInput: this.fileInput, selectedFileName: this.selectedFileName }
    });

    dialogRef.afterClosed().subscribe((editedImage: Image) => {
      if (editedImage) {
        this.imageService.updateImage(image.maAnh, editedImage).subscribe(
          (updatedImage: Image) => {
            this.loadImages();
          },
          (error) => {
            console.error('Failed to update image:', error);
          }
        );
      }
    });
  }

  deleteImage(image: Image): void {
    const dialogRef = this.dialog.open(DeleteImageDialogComponent, {
      data: { image }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.imageService.deleteImage(image.maAnh).subscribe(
          () => {
            this.loadImages();
          },
          (error) => {
            console.error('Failed to delete image:', error);
          }
        );
      }
    });
  }

  addImage() {
    if (this.newImageForm.valid) {
      this.imageService.createImage(this.newImage).subscribe(
        (newImage: Image) => {
          this.resetForm();
          this.loadImages();
        },
        (error) => {
          console.error('Failed to add new image:', error);
        }
      );
    }
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newImageForm.reset(this.newImage);
    this.selectedFileName = 'Chưa chọn tệp';
    this.showAddFormFlag = false;
  }

  showAddImageDialog() {
    const dialogRef = this.dialog.open(AddImageDialogComponent, {
      data: { image: this.newImage, fileInput: this.fileInput, selectedFileName: this.selectedFileName }
    });

    dialogRef.afterClosed().subscribe((addedImage: Image) => {
      if (addedImage) {
        this.imageService.createImage(addedImage).subscribe(
          (newImage: Image) => {
            this.loadImages();
          },
          (error) => {
            console.error('Failed to add new image:', error);
          }
        );
      }
    });
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      // You may want to handle the file upload logic here
      // You can also update this.newImage.duongDan with the selected file data
    } else {
      this.selectedFileName = 'Chưa chọn tệp';
      this.newImage.duongDan = '';
    }
  }

  showImageDetails(image: Image): void {
    const dialogRef = this.dialog.open(DetailImageDialogComponent, {
      data: { ...image }
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle dialog close, if needed
    });
  }
}
