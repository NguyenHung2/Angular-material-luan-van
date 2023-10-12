import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component'; // Import trang Home của admin
import { ManageUsersComponent } from './pages/manage-users/manage-users.component'; // Import trang quản lý người dùng
import { ManageDestinationsComponent } from './pages/manage-destinations/manage-destinations.component'; // Import trang quản lý điểm đến
import { ManageSchedulesComponent } from './pages/manage-schedules/manage-schedules.component';
import { ManagePostsComponent } from './pages/manage-posts/manage-posts.component';
import { ManageReviewsComponent } from './pages/manage-reviews/manage-reviews.component';
import { ManageStatisticsComponent } from './pages/manage-statistics/manage-statistics.component';
import { ManageDestinationCategoryComponent } from './pages/manage-destination-category/manage-destination-category.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Điều hướng mặc định đến trang Home
      { path: 'dashboard', component: AdminHomeComponent }, // Đường dẫn đến trang Home
      { path: 'quan-ly-nguoi-dung', component: ManageUsersComponent }, // Đường dẫn đến trang quản lý người dùng
      { path: 'quan-ly-danh-muc-diem-den', component: ManageDestinationCategoryComponent }, // Đường dẫn đến trang quản lý điểm đến
      { path: 'quan-ly-diem-den', component: ManageDestinationsComponent }, // Đường dẫn đến trang quản lý điểm đến
      { path: 'quan-ly-lich-trinh', component: ManageSchedulesComponent }, // Đường dẫn đến trang quản lý điểm đến
      { path: 'quan-ly-bai-viet', component: ManagePostsComponent }, // Đường dẫn đến trang quản lý điểm đến
      { path: 'quan-ly-danh-gia', component: ManageReviewsComponent }, // Đường dẫn đến trang quản lý điểm đến
      { path: 'quan-ly-thong-ke', component: ManageStatisticsComponent }, // Đường dẫn đến trang quản lý điểm đến
      // Thêm các đường dẫn khác cho các trang quản lý khác ở đây
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
