import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox/src';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  appKey = 'mkbet5s6hmzjcte';
  redirect = 'http://localhost:4200/success';
  dropboxClient = new Dropbox({clientId: this.appKey});

  authUrl = this.dropboxClient.getAuthenticationUrl(this.redirect, 'fly, you fools!', 'token');

  constructor(private http: HttpClient) { }

  url() {
    return this.authUrl;
  }
}
