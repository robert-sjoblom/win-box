import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Action from '../interfaces/IActions';
import { DropboxService } from './dropbox.service';
import Manager from './statemanager';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  private subject = new BehaviorSubject(Manager.state);

  constructor(private dropbox: DropboxService) {
    Manager.setUpdater(() => {
      this.updateSubscribers();
    });
    // vi ger Manager en funktion som uppdaterar alla våra subscribers, så att
    // Manager kan uppdatera när den vet att det behövs, istället.
  }

  runAction(action: ActionType, args) {
    switch (action) {
      case ActionType.GetFileListing:
        return new GetFileListing(this.dropbox, this.updateSubscribersWithError).run(args);
      case ActionType.ChangeLocation:
        return new ChangeLocation().run(args);
      case ActionType.AddStar:
        return new AddStar().run(args);
      case ActionType.RemoveStar:
        return new RemoveStar().run(args);
      case ActionType.AddUserDetails:
        return new AddUserDetails().run(args);
      case ActionType.UpdateFileListing:
        return new UpdateFileListing(this.dropbox).run();
    }
  }

  getFromState(key) { // key är vilken nyckel vi vill ha
    return this.subject.asObservable()
      .pipe(
        map(state => {
          let obj;
          if (state.error) {
            obj = {...state[key], error : state.error };
          } else {
            obj = state[key];
          }
          return obj;
        }));
  }

  updateSubscribers() {
    this.subject.next(Manager.state);
  }

  updateSubscribersWithError = (err) => {
    // this.updateSubscribers();
    this.subject.next({...Manager.state, error : err});
  }

  logout() {
    new Logout(this.dropbox).run();
    this.updateSubscribers();
  }
}

export enum ActionType {
  GetFileListing,
  ChangeLocation,
  AddStar,
  RemoveStar,
  AddUserDetails,
  UpdateFileListing
}

// can we move this elsewhere somehow, without fucking up everything?
// No.
class GetFileListing implements Action {
  constructor(private dropbox: DropboxService, private updateWithError) { }
  run(location) {
    return this.dropbox.getFileList(location)
      .pipe(
        map((res: any) => {
          return res.entries;
        }),
        catchError(err => Observable.throw(err))
      ).subscribe(
          (res) => Manager.invokeStatehandler('FileList', location, res),
          error => this.updateWithError(this.errorHandler(error)));

  }

  errorHandler(e) {
    const { status } = e;
    let message;
    switch (status) {
      case 400:
        message = `Bad Request (Status code ${status})`;
        break;
      case 401:
        message = `You will need to re-authorize to continue using this service. (Status code ${status}`;
        this.dropbox.revokeToken();
        break;
      case 409:
        message = `The resource you requested couldn't be found at this location. (Status code ${status})`;
        break;
      // remove stars here, when everything is fixed.
      default:
        message = 'Fuck if I know, boi!';
    }
    return message;
  }
}

class ChangeLocation implements Action {
  run(location) {
    Manager.invokeStatehandler('Location', location);
  }
}

class RemoveStar implements Action {
  run(file) {
    Manager.invokeStatehandler('RemoveStar', file);
  }
}

class AddStar implements Action {
  run(file) {
    Manager.invokeStatehandler('AddStar', file);
  }
}

class AddUserDetails implements Action {
  run(userdetails) {
    Manager.invokeStatehandler('AddUserDetails', userdetails);
  }
}

class Logout implements Action {
  constructor(private dropbox: DropboxService) { }
  run() {
    this.dropbox.revokeToken();
    Manager.invokeStatehandler('Logout');
  }
}

class UpdateFileListing implements Action {
  constructor(private dropbox: DropboxService) { }
  run() {
    console.log('UpdateFileListing ran!');
    this.dropbox.updateFileListing();

    // Manager.invokeStatehandler('UpdateFileListing');
  }
}
