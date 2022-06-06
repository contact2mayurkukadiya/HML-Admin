import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, Location } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations'; // for drawer
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserlistComponent } from './userlist/userlist.component';
import { ResturanttokenComponent } from './resturanttoken/resturanttoken.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDialogRef, MAT_DIALOG_DATA, MatDialog
} from '@angular/material';
import { PreloaderComponent } from './preloader/preloader.component';
import { ResturantcategoryComponent } from './resturantcategory/resturantcategory.component';
import { AllWallpaperComponent } from './all-wallpaper/all-wallpaper.component';
import { FileUploadingComponent } from './file-uploading/file-uploading.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [
  { path: 'userlist', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: UserlistComponent },
  { path: 'resturanttoken', component: ResturanttokenComponent },
  { path: 'resturantcategory', component: ResturantcategoryComponent },
  { path: 'allwallpaper', component: AllWallpaperComponent },
  { path: 'subcategory', component: SubCategoryComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    LoginComponent,
    UserlistComponent,
    ResturanttokenComponent,
    PreloaderComponent,
    ResturantcategoryComponent,
    AllWallpaperComponent,
    FileUploadingComponent,
    SubCategoryComponent,
  ],
  imports: [
    BrowserModule,
    MomentModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  exports: [
    RouterModule
  ],
  entryComponents: [
    PreloaderComponent
  ],
  providers: [DataService,
    { provide: APP_BASE_HREF, useValue: window['_app_base'] || '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }