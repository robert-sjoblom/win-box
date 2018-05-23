import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from '../auth-guard.service';
import { StateService } from '../state.service';
import { NewStateServiceService, ActionType } from '../new-state-service.service';

@Component({
  selector: 'main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {




  constructor(private authGuard: AuthGuardService) { }

  ngOnInit(){
    
  }
}
