import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DropboxService } from './dropbox.service';
import Manager from './statemanager';


@Injectable({
  providedIn: 'root'
})
export class NewStateServiceService {
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
}

interface Action {
  run(params?: any[]);
}

class RemoveStar implements Action {
  run(file){
    Manager.invokeStatehandler('RemoveStar', file)
  }
}

class AddStar implements Action {

  run(file){
    Manager.invokeStatehandler('AddStar', file);
  }
}

class GetFileListing implements Action {
  constructor(private dropbox: DropboxService) { }

  run(location) {
    this.dropbox.getFileList(location)
      .pipe(
        map(res => res.entries)
      )
      .subscribe(res => {
        Manager.invokeStatehandler('FileList', location, res);
      });
  }
}

class ChangeLocation implements Action {
  run(location) {
    Manager.invokeStatehandler('Location', location);
  }
}
export enum ActionType {
  GetFileListing,
  ChangeLocation,
  AddStar,
  RemoveStar,

  // RemoveStarRating
}
