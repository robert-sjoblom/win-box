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
  apiUrl = 'https://api.dropboxapi.com/2/files/';

  constructor(private http: HttpClient) { }

  url() {
    return this.authUrl;
  }

  getFileList(location: string): Observable<any> {
    const body = {};

    body['path'] = (location === 'root') ? '' : location;
    console.log(body);

    // const loc = (location === 'root') ? '' : location;
    // const prefix = (!loc) ? '' : '/';
    return this.http.post(`${this.apiUrl}list_folder`, body);
  }

  // download(tag, path) {
  //   switch (tag) {
  //     case 'folder':
  //       download zip
  //     case 'file':
  //        download
  //   }
  // }

}
