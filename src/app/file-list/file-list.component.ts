import { Component, OnInit } from '@angular/core';
import { ActionType, StateService } from '../services/state.service';


@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  filelist;
  location;
  starredItems;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getFromState('Location')
      .subscribe(location => this.location = location);

    this.state.getFromState('FileList')
      .subscribe(filelist => this.filelist = filelist[this.location]);

    this.state.getFromState('starredItems')
      .subscribe(starredItems => this.starredItems = starredItems);

    this.state.runAction(ActionType.GetFileListing, this.location);
  }
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, this.location);
  }
  changeStar(file) {
    if (this.starredItems.some(starred => starred.id === file.id)) {
      this.state.runAction(ActionType.RemoveStar, file);
    } else {
      this.state.runAction(ActionType.AddStar, file);
    }
  }
}
