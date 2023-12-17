import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { DestinationListComponent } from './pages/destination-list/destination-list.component';
import { SampleComponent } from './pages/itinerary/sample/sample.component';
import { PdfExportComponent } from './pages/itinerary/pdf-export/pdf-export.component';
import { AuthGuard } from '../admin/auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { DetailsComponent } from './pages/post-list/details/details.component';
import { AccountInfoComponent } from './pages/account-info/account-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
      { path: 'trang-chu', component: HomeComponent },
      { path: 'kham-pha', component: DestinationListComponent },
      { path: 'ban-do', component: ItineraryComponent, canActivate: [AuthGuard] },
      { path: 'lich-trinh', component: SampleComponent, canActivate: [AuthGuard] },
      { path: 'bai-viet', component: PostListComponent },
      { path: 'chi-tiet-bai-viet/:maBaiViet', component: DetailsComponent },
      { path: 'pdf-export', component: PdfExportComponent },
      { path: 'thong-tin-nguoi-dung', component: AccountInfoComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
