import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox/src';

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

  // deprecated, dropbox client uses promises. weak.
  // setAccessToken(token: string) {
  //   this.dropboxClient.setAccessToken(token);
  // }

  getFileList(location: string) {
    return null;
  }

  getCurrentLocationContent(location: string) {
    return this.http.post(`${this.apiUrl}list_folder`, { path: location })
      .subscribe(res => {
        console.log(res);
      });
  }

  // download(tag, path) {
  //   switch (tag) {
  //     case 'folder':
  //       this.http.post(`${this.apiUrl}/download`)
  //   }
  // }

}
