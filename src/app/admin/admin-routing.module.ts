import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component'; 
import { ManageUsersComponent } from './pages/manage-users/manage-users.component'; 
import { ManageDestinationsComponent } from './pages/manage-destinations/manage-destinations.component'; 
import { ManageSchedulesComponent } from './pages/manage-schedules/manage-schedules.component';
import { ManagePostsComponent } from './pages/manage-posts/manage-posts.component';
import { ManageReviewsComponent } from './pages/manage-reviews/manage-reviews.component';
import { ManageStatisticsComponent } from './pages/manage-statistics/manage-statistics.component';
import { ManageDestinationCategoryComponent } from './pages/manage-destination-category/manage-destination-category.component';
import { ManageListPostsComponent } from './pages/manage-list-posts/manage-list-posts.component';
import { ManageImagesComponent } from './pages/manage-images/manage-images.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: AdminHomeComponent }, 
      { path: 'nguoi-dung', component: ManageUsersComponent }, 
      { path: 'danh-muc-diem-den', component: ManageDestinationCategoryComponent }, 
      { path: 'diem-den', component: ManageDestinationsComponent }, 
      { path: 'lich-trinh', component: ManageSchedulesComponent }, 
      { path: 'danh-muc-bai-viet', component:  ManageListPostsComponent}, 
      { path: 'bai-viet', component: ManagePostsComponent }, 
      { path: 'danh-gia', component: ManageReviewsComponent }, 
      { path: 'hinh-anh', component: ManageImagesComponent }, 
      { path: 'thong-ke', component: ManageStatisticsComponent }, 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
