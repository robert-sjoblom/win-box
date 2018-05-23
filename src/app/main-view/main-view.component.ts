import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../services/auth-guard.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  currentLocation;
  filelist;

  constructor(private state: StateService, private authGuard: AuthGuardService) { }

  ngOnInit() {
    this.currentLocation = this.state.currentLocation;
    this.filelist = this.state.getState();
  }

}
