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
import { ManageDestinationsComponent } from './admin/pages/manage-destinations/manage-destinations.component';
import { SidebarComponent } from './admin/components/sidebar/sidebar.component';
import { AdminLayoutComponent } from './admin/components/admin-layout/admin-layout.component';
import { ManageSchedulesComponent } from './admin/pages/manage-schedules/manage-schedules.component';
import { ManagePostsComponent } from './admin/pages/manage-posts/manage-posts.component';
import { ManageReviewsComponent } from './admin/pages/manage-reviews/manage-reviews.component';
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
import { ScheduleMapComponent } from './user/pages/schedule-map/schedule-map.component';
import { AddScheduleDialogComponent } from './admin/pages/manage-schedules/add-schedule-dialog/add-schedule-dialog.component';
import { EditScheduleDialogComponent } from './admin/pages/manage-schedules/edit-schedule-dialog/edit-schedule-dialog.component';
import { DetailScheduleDialogComponent } from './admin/pages/manage-schedules/detail-schedule-dialog/detail-schedule-dialog.component';
import { DeleteScheduleDialogComponent } from './admin/pages/manage-schedules/delete-schedule-dialog/delete-schedule-dialog.component';
import { MapDialogComponent } from './admin/pages/manage-schedules/map-dialog/map-dialog.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ManageScheduleDestinationComponent } from './admin/pages/manage-schedule-destination/manage-schedule-destination.component';
import { ConfirmationDialogComponent } from './admin/components/admin-header/confirmation-dialog/confirmation-dialog.component';
import { ManageUserComponent } from './admin/pages/manage-user/manage-user.component';
import { AddUserDialogComponent } from './admin/pages/manage-user/add-user-dialog/add-user-dialog.component';
import { EditUserDialogComponent } from './admin/pages/manage-user/edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from './admin/pages/manage-user/delete-user-dialog/delete-user-dialog.component';
import { DetailUserDialogComponent } from './admin/pages/manage-user/detail-user-dialog/detail-user-dialog.component';
import { ItineraryCreatorComponent } from './user/pages/itinerary-creator/itinerary-creator.component';
import { DetailScheduleDestinationDialogComponent } from './admin/pages/manage-schedule-destination/detail-schedule-destination-dialog/detail-schedule-destination-dialog.component';
import { EditScheduleDestinationDialogComponent } from './admin/pages/manage-schedule-destination/edit-schedule-destination-dialog/edit-schedule-destination-dialog.component';
import { AddScheduleDestinationDialogComponent } from './admin/pages/manage-schedule-destination/add-schedule-destination-dialog/add-schedule-destination-dialog.component';
import { DeleteScheduleDestinationDialogComponent } from './admin/pages/manage-schedule-destination/delete-schedule-destination-dialog/delete-schedule-destination-dialog.component';
import { SampleComponent } from './user/pages/itinerary/sample/sample.component';
import { SampleDialogComponent } from './user/pages/itinerary/sample-dialog/sample-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { PdfExportComponent } from './user/pages/itinerary/pdf-export/pdf-export.component';
import { NgxPrintModule } from 'ngx-print';
import { DetailsComponent } from './user/pages/post-list/details/details.component';
import { ManageActivitiesComponent } from './admin/pages/manage-activities/manage-activities.component';
import { AddActivityDialogComponent } from './admin/pages/manage-activities/add-activity-dialog/add-activity-dialog.component';
import { EditActivityDialogComponent } from './admin/pages/manage-activities/edit-activity-dialog/edit-activity-dialog.component';
import { DeleteActivityDialogComponent } from './admin/pages/manage-activities/delete-activity-dialog/delete-activity-dialog.component';
import { DetailActivityDialogComponent } from './admin/pages/manage-activities/detail-activity-dialog/detail-activity-dialog.component';
import { AccountInfoComponent } from './user/pages/account-info/account-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    AdminHomeComponent,
    LoginAdminComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    ManageDestinationsComponent,
    SidebarComponent,
    AdminLayoutComponent,
    ManageSchedulesComponent,
    ManagePostsComponent,
    ManageReviewsComponent,
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
    ScheduleMapComponent,
    AddScheduleDialogComponent,
    EditScheduleDialogComponent,
    DetailScheduleDialogComponent,
    DeleteScheduleDialogComponent,
    MapDialogComponent,
    ManageScheduleDestinationComponent,
    ConfirmationDialogComponent,
    ManageUserComponent,
    AddUserDialogComponent,
    EditUserDialogComponent,
    DeleteUserDialogComponent,
    DetailUserDialogComponent,
    ItineraryCreatorComponent,
    DetailScheduleDestinationDialogComponent,
    EditScheduleDestinationDialogComponent,
    AddScheduleDestinationDialogComponent,
    DeleteScheduleDestinationDialogComponent,
    SampleComponent,
    SampleDialogComponent,
    PdfExportComponent,
    DetailsComponent,
    ManageActivitiesComponent,
    AddActivityDialogComponent,
    EditActivityDialogComponent,
    DeleteActivityDialogComponent,
    DetailActivityDialogComponent,
    AccountInfoComponent
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
    NgxMatTimepickerModule,
    AngularEditorModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
