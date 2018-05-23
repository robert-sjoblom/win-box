import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';
import Manager from './statemanager';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private stateService: StateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type'  : 'application/json; charset=utf-8',
        'Accept'        : 'application/json',
        'Authorization' : `Bearer ${ Manager.state.userDetails.access_token }` // fix this
      }
    });
    return next.handle(req);
  }
}
