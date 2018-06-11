import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  token: string;

  constructor(private state: StateService) {
    this.state.getFromState('userDetails')
      .subscribe(userDetails => this.token = userDetails.access_token, err => console.log('interceptor ', err));
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('dropbox')) {
      // adds headers to all requests to dropbox
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          'Authorization': `Bearer ${this.token}`
        }
      });
    }
    // sends request to next handler (out to dropbox in this case)
    return next.handle(req);
  }
}
