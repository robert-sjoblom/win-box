import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  error;
  constructor(
    private authGuard: AuthGuardService,
    private state: StateService) { }

  ngOnInit() {
    this.state.getFromState('errorMessage')
      .subscribe(message => this.error = message);
  }
}
