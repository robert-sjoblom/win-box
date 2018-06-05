import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
// the following three lines handle various firebase functionality
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';
// back to your regularly scheduled entertainment
import { AppComponent } from './app.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileComponent } from './file/file.component';
import { LatestsearchComponent } from './latestsearch/latestsearch.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DropboxService } from './services/dropbox.service';
import { NotificationService } from './services/notification.service';
import { StateService } from './services/state.service';
import { SizePipe } from './size.pipe';
import { StarredItemsComponent } from './starred-items/starred-items.component';
import { SuccessComponent } from './success/success.component';
import { UploadBoxComponent } from './upload-box/upload-box.component';
import { UploadService } from './upload-box/upload.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent, canActivate: [AuthGuard] },
  { path: 'starred', component: StarredItemsComponent, canActivate: [AuthGuard] },
  { path: 'latestSearch', component: LatestsearchComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'login/:thanks', component: LoginComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuccessComponent,
    MainViewComponent,
    PageNotFoundComponent,
    FileListComponent,
    FileComponent,
    SizePipe,
    StarredItemsComponent,
    LogoutComponent,
    UploadBoxComponent,
    BreadcrumbsComponent,
    SearchComponent,
    LatestsearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [
    UploadService,
    DropboxService,
    StateService,
    NotificationService,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
