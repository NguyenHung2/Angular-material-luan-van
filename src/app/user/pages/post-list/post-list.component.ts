import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Post, PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // Sidebar
  sidenavOpen = true;
  availableCategories = [
    'Cảnh quan thiên nhiên',
    'Di tích lịch sử và văn hóa',
    'Mua sắm và ẩm thực',
    'Hoạt động ngoài trời và thể thao',
    'Tôn giáo và lễ hội',
    'Du lịch sinh thái'
  ];
  availableTypes = [
    'Giới thiệu',
    'Kinh nghiệm du lịch',
    'Hướng dẫn du lịch',
    'Tin tức du lịch',
    'Ẩm thực và đặc sản'
  ];

  // Filters
  selectedTypes: string[] = [];
  selectedRating: string = '';
  noResultsFound: boolean = false;
  filteredKeywords: string[] = [];


  // Pagination
  itemsPerPage: number = 6;

  // Posts
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  displayedPosts: Post[] = [];

  // Sorting
  isNewestSortSelected: boolean = false;
  isOldestSortSelected: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.loadPosts();
    this.sidenavOpen = !this.isScreenSmall();
    window.addEventListener('resize', () => {
      this.sidenavOpen = !this.isScreenSmall();
    });

    this.applyFilters();
  }

  loadPosts() {
    this.postService.get().subscribe(posts => {
      this.posts = posts;
      this.filteredPosts = this.posts;
      this.updateDisplayedPosts(0);
    });
  }

  onPageChange(event: PageEvent) {
    this.updateDisplayedPosts(event.pageIndex);
  }

  updateDisplayedPosts(pageIndex: number) {
    const startIndex = pageIndex * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedPosts = this.filteredPosts.slice(startIndex, endIndex);
  }

  // Hàm lọc bài viết
  applyFilters() {
    // Kiểm tra và đảm bảo rằng this.selectedTypes là mảng
    if (!Array.isArray(this.selectedTypes)) {
      this.selectedTypes = [];
    }

    // Tạo một mảng rỗng để lưu trữ các từ khóa đã chọn
    const selectedKeywords: string[] = [];

    // Lọc bài viết dựa trên loại bài viết và ngày đăng
    this.filteredPosts = this.posts.filter((post) => {
      const isTypeMatch = this.selectedTypes.length === 0 || this.selectedTypes.some(type => post.loaiBaiViet.toLowerCase().includes(type.toLowerCase()));
      const isRatingMatch = this.selectedRating === 'all' || post.ngayDang >= new Date('2023-10-20');

      // So sánh từ khóa đã chọn với nội dung bài viết (không phân biệt chữ hoa/thường)
      const isKeywordMatch = this.selectedTypes.every(type => post.noiDung.toLowerCase().includes(type.toLowerCase()));

      if (isKeywordMatch) {
        selectedKeywords.push(post.noiDung); // Thêm nội dung khớp vào mảng từ khóa đã chọn
      }

      return isTypeMatch && isRatingMatch && isKeywordMatch;
    });

    // Cập nhật filteredKeywords với danh sách các từ khóa đã chọn
    this.filteredKeywords = selectedKeywords;

    // Kiểm tra xem có bài viết được hiển thị không
    this.noResultsFound = this.filteredPosts.length === 0;

    // Cập nhật bài viết được hiển thị sau khi áp dụng bộ lọc
    this.updateDisplayedPosts(0);
  }
  
  // Hàm xử lý chọn/loại bỏ loại bài viết
  toggleType(type: string) {
    type = type.toLowerCase(); // Chuyển về chữ thường
    const typeIndex = this.selectedTypes.indexOf(type);
  
    if (typeIndex > -1) {
      this.selectedTypes = this.selectedTypes.filter(t => t !== type); // Loại bỏ loại nếu tồn tại
    } else {
      this.selectedTypes.push(type); // Thêm loại nếu không tồn tại
    }
  }

  // Hàm hiển thị chi tiết bài viết
  showDetails(post: Post) {
    // Thực hiện logic để hiển thị chi tiết bài viết
  }

  // Hàm kiểm tra màn hình có phải là màn hình nhỏ không
  isScreenSmall(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width <= 1200;
  }

  // Hàm mở/tắt thanh bên
  toggleSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  // Hàm chuyển đổi sắp xếp mới nhất
  toggleNewestSort() {
    this.isNewestSortSelected = true;
    this.isOldestSortSelected = false;
  }

  // Hàm chuyển đổi sắp xếp cũ nhất
  toggleOldestSort() {
    this.isNewestSortSelected = false;
    this.isOldestSortSelected = true;
  }
}
