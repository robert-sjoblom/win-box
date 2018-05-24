import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox/src';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DropboxService {


  appKey = 'mkbet5s6hmzjcte';
  redirect = 'http://localhost:4200/success';
  dropboxClient = new Dropbox({ clientId: this.appKey });

  authUrl = this.dropboxClient.getAuthenticationUrl(this.redirect, 'fly, you fools!', 'token');
  apiUrl = 'https://api.dropboxapi.com/2/';

  constructor(private http: HttpClient) { }

  url() {
    return this.authUrl;
  }

  revokeToken() {
    this.http.post(`${this.apiUrl}auth/token/revoke`, {});
  }

  getFileList(location: string): Observable<any> {
    const body = {};
    body['path'] = (location === 'root') ? '' : location;
    return this.http.post(`${this.apiUrl}files/list_folder`, body);
  }
}
