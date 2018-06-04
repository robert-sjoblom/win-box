import { Component, OnInit } from '@angular/core';
import { StateService, ActionType } from '../services/state.service';

@Component({
  selector: 'latestsearch',
  templateUrl: './latestsearch.component.html',
  styleUrls: ['./latestsearch.component.css']
})
export class LatestsearchComponent implements OnInit {

  searchItems = [];
  location;

  constructor(private state: StateService) { }

  ngOnInit() {
    

    this.state.getFromState('searchResult')
      .subscribe(latestSearch => {
        this.searchItems = latestSearch;
      })
  }
  
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
  }
}
