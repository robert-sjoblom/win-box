import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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
        new GetFileListing(this.dropbox).run(args);
        break;
      case ActionType.ChangeLocation:
        new ChangeLocation().run(args);
        break;
      case ActionType.AddStar:
        new AddStar().run(args);
        break;
      case ActionType.RemoveStar:
        new RemoveStar().run(args);
        break;
      case ActionType.AddUserDetails:
        new AddUserDetails().run(args);
        break;
    }
  }

  getFromState(key) { // key är vilken nyckel vi vill ha
    return this.subject.asObservable()
      .pipe(
        map(state => state[key])
      );
  }

  updateSubscribers() {
    this.subject.next(Manager.state);
  }

  upload(val) {
    this.dropbox.upload(val);
  }
  logout() {
    new Logout(this.dropbox).run();
  }
}

export enum ActionType {
  GetFileListing,
  ChangeLocation,
  AddStar,
  RemoveStar,
  AddUserDetails
}

// can we move this elsewhere somehow, without fucking up everything?
// No.
class GetFileListing implements Action {
  constructor(private dropbox: DropboxService) { }
  run(location) {
    this.dropbox.getFileList(location)
      .pipe(
        map(res => res.entries)
      )
      .subscribe(res => {
        Manager.invokeStatehandler('FileList', location, res);
        Manager.invokeStatehandler('ErrorMessage', ''); // set error message to empty string if request didn't throw
      }, err => {
        this.errorHandler(err);
      });
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
        message = 'Fuck if I know, boi.';
    }
    Manager.invokeStatehandler('ErrorMessage', message);
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
