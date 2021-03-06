import { Component } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent {
  constructor(private authGuard: AuthGuardService, private notification: NotificationService) { }
}
