import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Post, PostService } from '../../services/post.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EditPostCategoryDialogComponent } from './edit-post-category-dialog/edit-post-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { DeletePostDialogComponent } from './delete-post-dialog/delete-post-dialog.component';
import { DetailPostDialogComponent } from './detail-post-dialog/detail-post-dialog.component';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {
  posts: Post[] = [];
  searchControl = new FormControl('');
  filteredPosts: MatTableDataSource<Post> = new MatTableDataSource<Post>(this.posts);
  // displayedColumns: string[] = ['maBaiViet', 'tieuDe', 'danhMucBaiViet', 'tomTat', 'noiDung', 'hinhAnh', 'ngayDang', 'thaoTac'];
  displayedColumns: string[] = ['maBaiViet', 'tieuDe', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newPostForm!: FormGroup;
  newPost: Post = {
    maBaiViet: 0,
    tieuDe: '',
    danhMucBaiViet: '',
    tomTat: '',
    noiDung: '',
    hinhAnh: '',
    ngayDang: new Date(),
  };

  selectedFileName: string = 'Chưa chọn tệp';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.setupForm();
  }

  ngAfterViewInit() {
    this.filteredPosts.sort = this.sort;
    this.filteredPosts.paginator = this.paginator;
  }

  loadPosts() {
    this.postService.getPosts().subscribe((data) => {
      this.posts = data;
      this.filteredPosts = new MatTableDataSource<Post>(this.posts);

      this.filteredPosts.sort = this.sort;
      this.filteredPosts.paginator = this.paginator;
    });
  }

  setupForm() {
    this.newPostForm = this.fb.group({
      maBaiViet: ['', Validators.required],
      tieuDe: ['', Validators.required],
      danhMucBaiViet: ['', Validators.required],
      tomTat: ['', Validators.required],
      noiDung: ['', Validators.required],
      hinhAnh: ['', Validators.required],
      ngayDang: [new Date(), Validators.required],
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredPosts.filter = filterValue;
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditPostCategoryDialogComponent, {
      data: { post, fileInput: this.fileInput, selectedFileName: this.selectedFileName }
    });

    dialogRef.afterClosed().subscribe((editedPost: Post) => {
      if (editedPost) {
        this.postService.updatePost(editedPost).subscribe(
          (updatedPost: Post) => {
            this.loadPosts();
          },
          (error) => {
            console.error('Failed to update post:', error);
          }
        );
      }
    });
  }

  deletePost(post: Post): void {
    const dialogRef = this.dialog.open(DeletePostDialogComponent, {
      data: { post } // Pass the post data to the dialog
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion in the dialog
        this.postService.deletePost(post.maBaiViet).subscribe(
          () => {
            this.loadPosts(); // Reload the posts after successful deletion
          },
          (error) => {
            console.error('Failed to delete post:', error);
          }
        );
      }
    });
  }

  addPost() {
    if (this.newPostForm.valid) {
      this.postService.addPost(this.newPost).subscribe(
        (newPost: Post) => {
          this.resetForm();
          this.loadPosts();
        },
        (error) => {
          console.error('Failed to add new post:', error);
        }
      );
    }
  }

  cancelAddForm() {
    this.resetForm();
  }

  resetForm() {
    this.newPostForm.reset(this.newPost);
    this.selectedFileName = 'Chưa chọn tệp';
    this.showAddFormFlag = false;
  }

  showAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: { post: this.newPost, fileInput: this.fileInput, selectedFileName: this.selectedFileName }
    });

    dialogRef.afterClosed().subscribe((addedPost: Post) => {
      if (addedPost) {
        this.postService.addPost(addedPost).subscribe(
          (newPost: Post) => {
            this.loadPosts();
          },
          (error) => {
            console.error('Failed to add new post:', error);
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
      // You can also update this.newPost.hinhAnh with the selected file data
    } else {
      this.selectedFileName = 'Chưa chọn tệp';
      this.newPost.hinhAnh = '';
    }
  }

  showDetails(post: Post): void {
    const dialogRef = this.dialog.open(DetailPostDialogComponent, {
      data: { ...post } // Truyền bài viết vào dialog
    });
  
    dialogRef.afterClosed().subscribe(() => {
      // Xử lý khi dialog đóng (nếu cần)
    });
  }  
}