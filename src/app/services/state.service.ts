import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
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

  logout() {
    new Logout().run(); // billigt sätt att göra det på.
  }
}

interface Action {
  run(params?: any[]);
}

class GetFileListing implements Action {
  constructor(private dropbox: DropboxService) { }

  run(location) {
    this.dropbox.getFileList(location)
      .pipe(
        map(res => res.entries)
      )
      .subscribe(res => {
        console.log(res);
        Manager.invokeStatehandler('FileList', location, res);
        Manager.invokeStatehandler('ErrorMessage', ''); // vi tömmer error message om vår request funkar.
      }, err => {
        this.errorHandler(err);
      });
  }

  errorHandler(e) {
    const { status, error } = e;
    let message;
    switch (status) {
      case 409:
        // har vi kommit hit betyder det att vår nuvarande Location inte längre "finns" (den kan ha blivit flyttad)
        // så vi måste ta bort den från starredItems (om den finns där)
        // Vi sätter även ett felmeddelande vi kan visa.
        message = `The resource you requested couldn't be found at this location.
        (Status code ${status})`;
        // fuck, vi behöver skriva om starred items så de kollar på location och inte id.
        // annars kan vi inte sortera bort gammal skit här.
        // vi tar det nu på förmiddagen.
        // "#My Files" ska leda till root, inte till Location; -> görs genom att sätta Location till 'root' i länken, typ.
        console.log('got here okay');
        break;
      case 401:
        // det här är Unauthorized. Fixa idag.
        // Om unauthorized, logga ut användaren?
        break;
      default:
      console.log(`we don't know this error.`);
      console.log(error);
      console.log(error.error);
      console.log(error.error.error);
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
  run() {
    Manager.invokeStatehandler('Logout');
  }
}
export enum ActionType {
  GetFileListing,
  ChangeLocation,
  AddStar,
  RemoveStar,
  AddUserDetails
}
