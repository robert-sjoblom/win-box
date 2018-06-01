import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { ActionType, StateService } from '../services/state.service';


@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
  error;
  filelist;
  location;
  starredItems;

  constructor(
    private state: StateService,
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.state.getFromState('Location')
      .subscribe(location => this.location = location, err => console.log(err));

    this.state.getFromState('FileList')
      .subscribe(filelist => {
        if (filelist.error) {
          this.error = filelist.error;
        } else {
          this.error = null;
          this.filelist = filelist[this.location];
        }
      });

    this.state.getFromState('starredItems')
      .subscribe(starredItems => this.starredItems = starredItems, err => console.log(err));

    this.state.runAction(ActionType.GetFileListing, this.location);
  }

  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
  }
  changeStar(file) {
    if (this.starredItems.some(starred => starred.id === file.id)) {
      this.state.runAction(ActionType.RemoveStar, file);
    } else {
      this.state.runAction(ActionType.AddStar, file);
    }
  }
}
