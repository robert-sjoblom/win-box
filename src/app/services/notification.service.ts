import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { ActionType, StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  userId: string;

  constructor(private state: StateService, @Inject(FirebaseApp) fb) {
    this.state.getFromState('userDetails').subscribe(res => {
      this.userId = res.account_id;
      if (this.userId !== undefined) {

        const root = fb.database().ref(`notifications/${this.userId}/`);
        root.on('child_removed', snapshot => {
          console.log('a child was created');
          this.state.runAction(ActionType.UpdateFileListing, null);
        });
      }
    });
  }

  printStatus() {
    console.log(`Current Status:
    userId: ${this.userId}`);
  }
}
