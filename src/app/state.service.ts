import { Injectable } from '@angular/core';
import { DropboxService } from './dropbox.service';
import { IUserDetails } from './interfaces/IUserDetails';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  // state knows stuff
  // like, access tokens
  userDetails: IUserDetails;
  currentLocation: string[]; // this is where we are. '' for root, 'java' for folder java
  // currentLocationContent = new BehaviorSubject<IFIleDetails[]>(); // an array with IFileDetail objects
  starredItems = false;

  // updateSubscribers uppdaterar och skriver till local storage;

  // if local storage exists, use that
  // if it doesn't, user needs to log in.
  constructor(private dropboxService: DropboxService) {
    if (localStorage.getItem('userDetails') !== null ) {
      this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    } else {
      this.userDetails = {
        access_token: null
      };
    }
    if (localStorage.getItem('starredItems') !== null) {
      this.starredItems = JSON.parse(localStorage.getItem('starredItems'));
    }
  }

  saveStateToLocalStorage() {
    // userDetails
    // starredItems
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
    this.updateSubscribers();
    return Promise.resolve(true);
  }

  updateSubscribers(): void {
    // currentLocationContent
    this.saveStateToLocalStorage();
  }

  getCurrentLocationContent(location: string) {
    this.dropboxService.getCurrentLocationContent('');

    // this.currentLocationContent = this.dropboxService.getCurrentLocationContent(location);
  }

  getToken(): string{
    return this.userDetails.access_token
  }

  getAuthUrl(): string {
    return this.dropboxService.authUrl;
  }

  changePath(path, tag){
    if(tag === 'file'){
      //this.download(tag, path)
    } else{
      // this.currentLocation = path;
    }
  }
}
