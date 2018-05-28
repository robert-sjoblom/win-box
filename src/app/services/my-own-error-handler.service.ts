import { ErrorHandler, Injectable } from '@angular/core';
import { DropboxService } from './dropbox.service';
import { StateService } from './state.service';
import Manager from './statemanager';

// well this was an abject failure.
@Injectable({
  providedIn: 'root'
})
export class MyOwnErrorHandlerService implements ErrorHandler {
  constructor(private dropbox: DropboxService, private state: StateService) { }
  handleError(e: any): void {
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
