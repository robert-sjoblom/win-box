import { Inject, Injectable } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { StateService } from './state.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  userId: string;
  notification;

  constructor(private state: StateService, @Inject(FirebaseApp) fb) {
    this.state.getFromState('userDetails').subscribe(res => {
      this.userId = res.account_id;
      if (this.userId !== undefined) {

        const root = fb.database().ref(`notifications/${this.userId}/`);
        root.on('child_removed', snapshot => {
          console.log('a child was killed'); // okay, here we tell state that some file changes have happened.
        });
      }
    });
  }

  printStatus() {
    console.log(`Current Status:
    userId: ${this.userId}
    notification: ${this.notification}`);
  }
}
