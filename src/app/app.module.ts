import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardService as AuthGuard } from './auth-guard.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { DropboxService } from './dropbox.service';
import { FileListComponent } from './file-list/file-list.component';
import { FileComponent } from './file/file.component';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SizePipe } from './size.pipe';
import { StateService } from './state.service';
import { SuccessComponent } from './success/success.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StarredItemsComponent } from './starred-items/starred-items.component';

const appRoutes: Routes = [
  { path: '',         redirectTo: 'main', pathMatch: 'full' },
  { path: 'test',     component: TestComponentComponent},
  { path: 'main',     component: MainViewComponent, canActivate: [AuthGuard]},
  { path: 'starred',  component: StarredItemsComponent, canActivate: [AuthGuard]},
  { path: 'login',    component: LoginComponent },
  { path: 'success',  component: SuccessComponent},
  { path: '**',       component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    SuccessComponent,
    MainViewComponent,
    PageNotFoundComponent,
    FileListComponent,
    FileComponent,
    SizePipe,
    TestComponentComponent,
    StarredItemsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
  ],
  providers: [DropboxService, StateService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
