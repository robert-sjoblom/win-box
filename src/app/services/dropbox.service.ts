import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox/src';
import { Observable } from 'rxjs';
import Manager from './statemanager';
@Injectable({
  providedIn: 'root'
})
export class DropboxService {


  appKey = 'mkbet5s6hmzjcte';
  redirect = 'http://localhost:4200/success';
  dropboxClient = new Dropbox({ clientId: this.appKey });

  authUrl = this.dropboxClient.getAuthenticationUrl(this.redirect, 'fly, you fools!', 'token');
  apiUrl = 'https://api.dropboxapi.com/2/';

  constructor(private http: HttpClient) {
    this.dropboxClient.setAccessToken('l4k0M7CsrbAAAAAAAAAANuvqmgo_ErdZJgspxT91bmyFb5MV97IYnsrePCA6lHYE');
  }

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

  download(file): any {
    if (file['.tag'] === 'folder') {
      // return fetch('https://content.dropboxapi.com/2/files/download_zip', {
      //   method: 'POST',
      //   headers: new Headers({
      //     'Authorization': 'Bearer l4k0M7CsrbAAAAAAAAAAOMmP5G9iaeBBAaGQe8k8qwWxJQsvJCMQkFIYMwXms6fo',
      //     'Dropbox-API-Arg': '{"path":"/React"}'
      //   })
      // })
    } else {
      return this.dropboxClient.filesGetTemporaryLink({ path: file.path_lower });
    }
  }

  upload(file) {
    // Angular uses multipart/form-data; DROPBOX DOES NOT LIKE THAT.
    // We can use XMLHttpRequests directly, instead.
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = function(evt) {
      console.log(evt);
      // Upload in progress. Do something here with the percent complete.
    };

    xhr.onload = function() {
      if (xhr.status === 200) {
        const fileInfo = JSON.parse(xhr.response);
        console.log('shit yea, dat worked!');
        console.log(fileInfo);
      } else {
        const errorMsg = xhr.response || 'Unable to upload file.';
        console.log('got an error here boi', );
        console.log(errorMsg);
        // something went wrong.
      }
    };

    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader('Authorization', 'Bearer ' + Manager.state.userDetails.access_token);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
      path: Manager.state.Location + '/' + file.name,
      mode: 'add',
      autorename: true,
      mute: false
    }));

    xhr.send(file);
  }
}
