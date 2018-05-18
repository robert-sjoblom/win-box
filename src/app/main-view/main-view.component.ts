import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { AuthGuardService } from '../auth-guard.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  

  constructor(private state: StateService, private authGuard: AuthGuardService) { }

  ngOnInit() {

  }

}
