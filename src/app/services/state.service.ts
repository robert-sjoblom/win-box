import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserDetails } from '../interfaces/IUserDetails';
import { DropboxService } from './dropbox.service';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  userDetails: IUserDetails;
  currentLocation: string[]; // this is where we are. '' for root, 'java' for folder java
  currentLocationContent; // an array with IFileDetail objects
  starredItems = {};

  private subject = new BehaviorSubject<any>(this.currentLocationContent);

  constructor(private dropboxService: DropboxService) {


    try {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    } catch (error) {
      this.userDetails = {
        access_token: null
      };
    }
    try {
      this.starredItems = JSON.parse(localStorage.getItem('starredItems'));
    } catch (error) {
      this.starredItems = {};
    }

    this.currentLocation = [''];
  }

  saveStateToLocalStorage() {
    localStorage.setItem('userDetails', JSON.stringify(this.userDetails));
    localStorage.setItem('starredItems', JSON.stringify(this.starredItems));
  }

  setUserDetailsFromUrl(url: string): Promise<boolean> {
    this.userDetails = url.split('#')
      .reduce((acc, cur, i) => { // we want an object with key: value from the string
        if (!i) {
          return acc;
        }
        return acc = {
          // spread the object from the inner reduce onto the outer reduce object
          ...cur.split('&') // array of keys=values strings
            .map(item => item.split('=')) // we have [keys, values] instead
            .reduce((acc2, cur2) => { // make an object
              acc2[cur2[0]] = cur2[1];
              return acc2;
            }, {})
        };
      }, {});
    this.saveStateToLocalStorage();
    return Promise.resolve(true);
  }

  updateSubscribers(): void {
    // currentLocationContent
    this.saveStateToLocalStorage();
    this.subject.next(this.currentLocationContent);
  }

  getState() {
    return this.subject.asObservable();
    // stretch: .map(items => )
  }
  getFileList(location: string): void {
    // hämta ny skit
    // sätt currentLocationContent
    // return this.subject.asObservable()


    this.dropboxService.getFileList(location)
      .subscribe(res => {
        this.currentLocationContent = res.entries;
        this.updateSubscribers();
      });
  }

  getToken(): string {
    return this.userDetails.access_token;
  }

  getAuthUrl(): string {
    return this.dropboxService.authUrl;
  }

  changePath(path, tag) {
    if (tag === 'file') {
      // this.download(tag, path)
    } else {
      // this.currentLocation = path;
    }
  }
}
