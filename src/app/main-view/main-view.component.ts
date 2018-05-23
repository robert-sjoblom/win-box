import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { NewStateServiceService } from '../new-state-service.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  error;
  constructor(
    private authGuard: AuthGuardService,
    private state: NewStateServiceService) { }

  ngOnInit() {
    this.state.getFromState('errorMessage')
      .subscribe(message => this.error = message);
  }
}
