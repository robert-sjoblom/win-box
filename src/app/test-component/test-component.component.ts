import { Component, OnInit } from '@angular/core';
import { ActionType, StateService } from '../services/state.service';
import Manager from '../services/statemanager';


@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  filelist;
  location;
  fakelocation;
  constructor(private state: StateService) {
    this.fakelocation = '/java/apps/tampermonkey';
  }

  ngOnInit() {
    this.state.getFromState('Location')
      .subscribe(location => this.location = location);

    this.state.getFromState('FileList')
      .subscribe(filelist => this.filelist = filelist[this.location]);

    this.state.runAction(ActionType.GetFileListing, this.location);
  }

  printLocalStorage() {
    Manager.saveStateToStorage();
  }

  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, this.location);
  }
}
