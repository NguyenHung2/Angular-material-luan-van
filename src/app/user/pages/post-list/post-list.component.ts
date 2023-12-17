import { Component, OnInit } from '@angular/core';
import { Post, PostService } from 'src/app/admin/services/post.service';
import { ListPost, ListPostService } from 'src/app/admin/services/list-post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  pagedPosts: Post[] = [];
  page = 0;
  itemsPerPage = 5;
  totalItems = 0;
  posts: Post[] = [];
  categories: ListPost[] = [];
  selectedCategory: ListPost | null = null;
  allPosts: Post[] = [];

  constructor(private postService: PostService, private listPostService: ListPostService) { }

  ngOnInit() {
    this.loadCategories();
    this.listPostService.getAllListPost().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = null; // Không chọn danh mục nào ban đầu
      this.loadAllPosts(); // Tải tất cả bài viết
    });
  }  

  loadCategories() {
    this.listPostService.getAllListPost().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadAllPosts() {
    this.postService.getPosts().subscribe(posts => {
      this.allPosts = posts;
      this.totalItems = this.allPosts.length;
      this.loadPosts(); // Tải tất cả bài viết
      console.log('Dữ liệu bài viết đã được tải:', this.allPosts);
    });
  } 
  
  filterPostsByCategory(category: ListPost | null) {
    this.selectedCategory = category;
    this.page = 0; // Trở về trang đầu khi thay đổi danh mục
  
    if (category) {
      const categoryPosts = this.allPosts.filter(post => post.loai?.maLoai === category.maLoai);
      this.totalItems = categoryPosts.length;
    } else {
      this.totalItems = this.allPosts.length; // Trường hợp không có danh mục được chọn
    }
  
    this.loadPosts();
  }  

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.loadPosts();
  }

  loadPosts() {
    console.log('Tất cả biến và thuộc tính trong hàm loadPosts:');
    console.log('this.selectedCategory:', this.selectedCategory);
    console.log('this.page:', this.page);
    console.log('this.itemsPerPage:', this.itemsPerPage);
    console.log('this.totalItems:', this.totalItems);
    console.log('this.allPosts:', this.allPosts);
  
    if (this.selectedCategory) {
      console.log('Danh mục được chọn:', this.selectedCategory);
      const filteredPosts = this.allPosts
        .filter(post => post.loai?.maLoai === this.selectedCategory!.maLoai);
  
      console.log('Bài viết sau khi lọc theo danh mục:', filteredPosts);
  
      if (filteredPosts.length > 0) {
        this.pagedPosts = filteredPosts
          .slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
        console.log('Bài viết sau khi phân trang:', this.pagedPosts);
      } else {
        // Không có bài viết phù hợp với danh mục đã chọn
        this.pagedPosts = [];
        console.log('Không có bài viết phù hợp với danh mục đã chọn.');
      }
    } else {
      this.pagedPosts = this.allPosts.slice(this.page * this.itemsPerPage, (this.page + 1) * this.itemsPerPage);
      console.log('Bài viết sau khi phân trang (không lọc theo danh mục):', this.pagedPosts);
    }
  
    console.log('Dữ liệu bài viết đã được cập nhật:', this.pagedPosts); // Ghi thông tin debug vào console
  }  
}
