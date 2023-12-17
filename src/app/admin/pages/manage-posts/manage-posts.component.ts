import { ListPostService } from 'src/app/admin/services/list-post.service';
import { Image, ImageService } from './../../services/image.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Post, PostService } from '../../services/post.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { EditPostCategoryDialogComponent } from './edit-post-category-dialog/edit-post-category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from './add-post-dialog/add-post-dialog.component';
import { DeletePostDialogComponent } from './delete-post-dialog/delete-post-dialog.component';
import { DetailPostDialogComponent } from './detail-post-dialog/detail-post-dialog.component';
import { ListPost } from '../../services/list-post.service';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {
  posts: Post[] = [];
  listPosts: ListPost[] = [];
  images: Image[] = [];
  searchControl = new FormControl('');
  filteredPosts: MatTableDataSource<Post> = new MatTableDataSource<Post>(this.posts);
  displayedColumns: string[] = ['maBaiViet', 'tieuDe', 'thaoTac'];

  showAddFormFlag: boolean = false;
  newPostForm!: FormGroup;
  newPost: Post = {
    maBaiViet: 0,
    tieuDe: '',
    tomTat: '',
    noiDung: '',
    ngayTao: new Date(),
    maLoai: 0,
    maAnh: 0
  };

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService: PostService,
    private listPostService: ListPostService,
    private imageService: ImageService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadPosts();
    this.loadListPosts();
    this.loadImages();
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

  loadListPosts() {
    this.listPostService.getAllListPost().subscribe((data) => {
      this.listPosts = data;
      console.log(data);
    });
  }

  loadImages() {
    this.imageService.getAllImages().subscribe((data) => {
      this.images = data;
      console.log(data);
    });
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.filteredPosts.filter = filterValue;
  }

  editPost(post: Post): void {
    const dialogRef = this.dialog.open(EditPostCategoryDialogComponent, {
      data: {
        post,
        listPosts: this.listPosts,
        images: this.images
      }
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
    this.showAddFormFlag = false;
  }

  showAddPostDialog() {
    const dialogRef = this.dialog.open(AddPostDialogComponent, {
      data: {
        post: this.newPost,
        listPosts: this.listPosts,
        images: this.images
      }
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

  showDetails(post: Post): void {
    const dialogRef = this.dialog.open(DetailPostDialogComponent, {
      data: { ...post }
    });
  }
}