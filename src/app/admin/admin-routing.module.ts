import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { ManageDestinationsComponent } from './pages/manage-destinations/manage-destinations.component';
import { ManageSchedulesComponent } from './pages/manage-schedules/manage-schedules.component';
import { ManagePostsComponent } from './pages/manage-posts/manage-posts.component';
import { ManageReviewsComponent } from './pages/manage-reviews/manage-reviews.component';
import { ManageDestinationCategoryComponent } from './pages/manage-destination-category/manage-destination-category.component';
import { ManageListPostsComponent } from './pages/manage-list-posts/manage-list-posts.component';
import { ManageImagesComponent } from './pages/manage-images/manage-images.component';
import { ManageScheduleDestinationComponent } from './pages/manage-schedule-destination/manage-schedule-destination.component';
import { LoginAdminComponent } from './auth/login-admin/login-admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ManageActivitiesComponent } from './pages/manage-activities/manage-activities.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'dashboard', component: AdminHomeComponent, canActivate: [AuthGuard] },
      { path: 'nguoi-dung', component: ManageUserComponent, canActivate: [AuthGuard] },
      { path: 'danh-muc-diem-den', component: ManageDestinationCategoryComponent, canActivate: [AuthGuard] },
      { path: 'diem-den', component: ManageDestinationsComponent, canActivate: [AuthGuard] },
      { path: 'lich-trinh', component: ManageSchedulesComponent, canActivate: [AuthGuard] },
      { path: 'danh-muc-bai-viet', component: ManageListPostsComponent, canActivate: [AuthGuard] },
      { path: 'bai-viet', component: ManagePostsComponent, canActivate: [AuthGuard] },
      { path: 'chi-tiet', component: ManageScheduleDestinationComponent, canActivate: [AuthGuard] },
      { path: 'danh-gia', component: ManageReviewsComponent, canActivate: [AuthGuard] },
      { path: 'hinh-anh', component: ManageImagesComponent, canActivate: [AuthGuard] },
      { path: 'hoat-dong', component: ManageActivitiesComponent, canActivate: [AuthGuard] },
    ],
  },
  { path: 'login-admin', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
