import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { DropboxService } from './dropbox.service';
import { LoginComponent } from './login/login.component';
import { MainViewComponent } from './main-view/main-view.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StateService } from './state.service';
import { SuccessComponent } from './success/success.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileComponent } from './file/file.component';
import { SizePipe } from './size.pipe'



const appRoutes: Routes = [
  { path: '',         component: WelcomeComponent, pathMatch: 'full' },
  { path: 'main',     component: MainViewComponent},
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
    SizePipe
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
