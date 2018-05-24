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
  

  constructor(private http: HttpClient) { 
    this.dropboxClient.setAccessToken('l4k0M7CsrbAAAAAAAAAANuvqmgo_ErdZJgspxT91bmyFb5MV97IYnsrePCA6lHYE');
  }

  url() {
    return this.authUrl;
  }


  getFileList(location: string): Observable<any> {
    const body = {};
    body['path'] = (location === 'root') ? '' : location;
    return this.http.post(`${this.apiUrl}list_folder`, body);
  }

  download(file): any{
    if(file['.tag'] === 'folder'){
      
      // return fetch('https://content.dropboxapi.com/2/files/download_zip', {
      //   method: 'POST',
      //   headers: new Headers({
      //     'Authorization': 'Bearer l4k0M7CsrbAAAAAAAAAAOMmP5G9iaeBBAaGQe8k8qwWxJQsvJCMQkFIYMwXms6fo',
      //     'Dropbox-API-Arg': '{"path":"/React"}' 
      //   })
      // })
        
  
    } else {
      return this.dropboxClient.filesGetTemporaryLink({path: file.path_lower})
    
    }
    
    
  } 
}
