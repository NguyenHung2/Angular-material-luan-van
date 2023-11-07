import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { HomeComponent } from './pages/home/home.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { MapComponent } from './pages/map/map.component';
import { PostListComponent } from './pages/post-list/post-list.component';
import { DestinationListComponent } from './pages/destination-list/destination-list.component';
import { ScheduleMapComponent } from './pages/schedule-map/schedule-map.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
      { path: 'trang-chu', component: HomeComponent },
      { path: 'kham-pha', component: DestinationListComponent },
      { path: 'lich-trinh', component: ItineraryComponent },
      { path: 'ban-do', component: MapComponent },
      { path: 'bai-viet', component: PostListComponent },
      { path: 'lich-trinh-ban-do', component: ScheduleMapComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
