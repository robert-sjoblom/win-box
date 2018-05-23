import { Component, OnInit } from '@angular/core';
import { ActionType, NewStateServiceService } from '../new-state-service.service';


@Component({
  selector: 'test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {
  filelist;
  location;
  fakelocation;
  constructor(private state: NewStateServiceService) {
    this.fakelocation = '/java/apps/tampermonkey';
  }

  ngOnInit() {
    this.state.getFromState('Location')
      .subscribe(location => this.location = location);

    this.state.getFromState('FileList')
      .subscribe(filelist => this.filelist = filelist[this.location]);

    this.state.runAction(ActionType.GetFileListing, this.location);
  }

  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, this.location);
  }
}
