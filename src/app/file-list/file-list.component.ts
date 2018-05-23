import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { NewStateServiceService, ActionType } from '../new-state-service.service';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  filelist;
  location;
  starredItems;

  constructor(private state: NewStateServiceService) { }

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
    console.log(location)
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, this.location);
  }
  changeStar(file){
    if(this.starredItems.some(starred => starred.id === file.id)){
      console.log('yey');
      this.state.runAction(ActionType.RemoveStar, file);
      console.log(this.starredItems)
    } else {
      console.log('nei')
      this.state.runAction(ActionType.AddStar, file);
      console.log(this.starredItems)
    }
    
  }
}
