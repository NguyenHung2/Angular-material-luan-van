import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


// Import Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';

// Import ReactiveFormsModule
import { ReactiveFormsModule } from '@angular/forms';

// Import other Angular Material modules as needed
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { UserRoutingModule } from './user/user-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { AdminHomeComponent } from './admin/pages/admin-home/admin-home.component';
import { LoginAdminComponent } from './admin/auth/login-admin/login-admin.component';
import { AdminHeaderComponent } from './admin/components/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/components/admin-footer/admin-footer.component';
import { ManageUsersComponent } from './admin/pages/manage-users/manage-users.component';
import { ManageDestinationsComponent } from './admin/pages/manage-destinations/manage-destinations.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { ManageSchedulesComponent } from './admin/pages/manage-schedules/manage-schedules.component';
import { ManagePostsComponent } from './admin/pages/manage-posts/manage-posts.component';
import { ManageReviewsComponent } from './admin/pages/manage-reviews/manage-reviews.component';
import { ManageStatisticsComponent } from './admin/pages/manage-statistics/manage-statistics.component';
import { HeaderComponent } from './user/components/header/header.component';
import { FooterComponent } from './user/components/footer/footer.component';
import { DestinationListComponent } from './user/pages/destination-list/destination-list.component';
import { FeaturedPlacesComponent } from './user/components/featured-places/featured-places.component';
import { LoginComponent } from './user/auth/login/login.component';
import { SignUpComponent } from './user/auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './user/auth/forgot-password/forgot-password.component';
import { UserLayoutComponent } from './user/components/user-layout/user-layout.component';
import { HomeComponent } from './user/pages/home/home.component';
import { SliderComponent } from './user/components/slider/slider.component';
import { FilterComponent } from './user/components/filter/filter.component';
import { ItineraryComponent } from './user/pages/itinerary/itinerary.component';
import { MapComponent } from './user/pages/map/map.component';
import { ManageDestinationCategoryComponent } from './admin/pages/manage-destination-category/manage-destination-category.component';
import { HttpClientModule } from '@angular/common/http';
import { ManageListPostsComponent } from './admin/pages/manage-list-posts/manage-list-posts.component';
import { EditPostCategoryDialogComponent } from './admin/pages/manage-posts/edit-post-category-dialog/edit-post-category-dialog.component';
import { AddPostDialogComponent } from './admin/pages/manage-posts/add-post-dialog/add-post-dialog.component';
import { AddListDialogComponent } from './admin/pages/manage-list-posts/add-list-dialog/add-list-dialog.component';
import { EditListDialogComponent } from './admin/pages/manage-list-posts/edit-list-dialog/edit-list-dialog.component';
import { DeletePostDialogComponent } from './admin/pages/manage-posts/delete-post-dialog/delete-post-dialog.component';
import { DetailPostDialogComponent } from './admin/pages/manage-posts/detail-post-dialog/detail-post-dialog.component';
import { ManageImagesComponent } from './admin/pages/manage-images/manage-images.component';
import { AddImageDialogComponent } from './admin/pages/manage-images/add-image-dialog/add-image-dialog.component';
import { DeleteImageDialogComponent } from './admin/pages/manage-images/delete-image-dialog/delete-image-dialog.component';
import { EditImageDialogComponent } from './admin/pages/manage-images/edit-image-dialog/edit-image-dialog.component';
import { DetailImageDialogComponent } from './admin/pages/manage-images/detail-image-dialog/detail-image-dialog.component';
import { AddDestinationCategoryDialogComponent } from './admin/pages/manage-destination-category/add-destination-category-dialog/add-destination-category-dialog.component';
import { EditDestinationCategoryDialogComponent } from './admin/pages/manage-destination-category/edit-destination-category-dialog/edit-destination-category-dialog.component';
import { DeleteDestinationCategoryDialogComponent } from './admin/pages/manage-destination-category/delete-destination-category-dialog/delete-destination-category-dialog.component';
import { PostListComponent } from './user/pages/post-list/post-list.component';
import { SidenavComponent } from './user/components/sidenav/sidenav.component';
import { DeleteListDialogComponent } from './admin/pages/manage-list-posts/delete-list-dialog/delete-list-dialog.component';
import { DeleteDestinationDialogComponent } from './admin/pages/manage-destinations/delete-destination-dialog/delete-destination-dialog.component';
import { EditDestinationDialogComponent } from './admin/pages/manage-destinations/edit-destination-dialog/edit-destination-dialog.component';
import { AddDestinationDialogComponent } from './admin/pages/manage-destinations/add-destination-dialog/add-destination-dialog.component';
import { DetailDestinationDialogComponent } from './admin/pages/manage-destinations/detail-destination-dialog/detail-destination-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AdminHomeComponent,
    LoginAdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    ManageUsersComponent,
    ManageDestinationsComponent,
    SidebarComponent,
    AdminLayoutComponent,
    ManageSchedulesComponent,
    ManagePostsComponent,
    ManageReviewsComponent,
    ManageStatisticsComponent,
    HeaderComponent,
    FooterComponent,
    DestinationListComponent,
    FeaturedPlacesComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    UserLayoutComponent,
    HomeComponent,
    SliderComponent,
    FilterComponent,
    ItineraryComponent,
    MapComponent,
    ManageDestinationCategoryComponent,
    ManageListPostsComponent,
    EditPostCategoryDialogComponent,
    AddPostDialogComponent,
    AddListDialogComponent,
    EditListDialogComponent,
    DeletePostDialogComponent,
    DetailPostDialogComponent,
    ManageImagesComponent,
    AddImageDialogComponent,
    DeleteImageDialogComponent,
    EditImageDialogComponent,
    DetailImageDialogComponent,
    AddDestinationCategoryDialogComponent,
    EditDestinationCategoryDialogComponent,
    DeleteDestinationCategoryDialogComponent,
    PostListComponent,
    SidenavComponent,
    DeleteListDialogComponent,
    DeleteDestinationDialogComponent,
    EditDestinationDialogComponent,
    AddDestinationDialogComponent,
    DetailDestinationDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    UserRoutingModule,
    AdminRoutingModule, 
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatFormFieldModule,
    MatIconModule,
    MatPaginatorModule,
    MatSidenavModule,
    MatSelectModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatStepperModule,
    MatChipsModule,
    MatGridListModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatRippleModule,
    NgxPaginationModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
