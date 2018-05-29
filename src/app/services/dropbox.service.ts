import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dropbox } from 'dropbox/src';
import { Observable } from 'rxjs';
import { of } from 'rxjs'
import { map, delay } from 'rxjs/operators'
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
    const token = Manager.state.userDetails.access_token;
    this.dropboxClient.setAccessToken(token);
    return this.dropboxClient.filesGetTemporaryLink({ path: file.path_lower });
  }

  upload(file, writeState, updateSubscribers) {
    // Angular uses multipart/form-data; DROPBOX DOES NOT LIKE THAT.
    // We can use XMLHttpRequests directly, instead.
    const xhr = new XMLHttpRequest();
    const prefix = (Manager.state.Location === 'root' ? '' : Manager.state.Location);
    const path = `${prefix}/${file.name}`;

    xhr.upload.onprogress = function (evt) {
      writeState(evt, 'no', 'no');
    };

    xhr.onload = function () {
      if (xhr.status === 200) {
        const fileInfo = JSON.parse(xhr.response);
        writeState('onload', 'success');
      } else {
        const errorMsg = xhr.response || 'Unable to upload file.';
        console.log('got an error here boi', );
        console.log(errorMsg);
        writeState('onload', 'failure', errorMsg);
        // something went wrong.
      }
    };

    xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
    xhr.setRequestHeader('Authorization', 'Bearer ' + Manager.state.userDetails.access_token);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({
      path: path,
      mode: 'add',
      autorename: true,
      mute: false
    }));

    xhr.send(file);
  }
  search(query): Observable<string[]> {
    if(!query){
      return of([])
    }

    return this.http.post(`${this.apiUrl}/files/search`, {
      "path": "",
      "query": query,
      "max_results": 10,
    })
    .pipe(
      map((response: any) => {
        return response.matches.map(item => item.metadata);
      })
    )
  }

  thumbnail(file) {
    const token = Manager.state.userDetails.access_token;
    this.dropboxClient.setAccessToken(token);
    const data = {
      path: file,
    };
    return this.dropboxClient.filesGetThumbnail(data);
  }
}
