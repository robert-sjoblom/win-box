import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType, StateService } from '../services/state.service';

@Component({
  selector: 'latestsearch',
  templateUrl: './latestsearch.component.html',
  styleUrls: ['./latestsearch.component.css']
})
export class LatestsearchComponent implements OnInit {

  searchItems = [];
  location;

  constructor(private state: StateService, private route: Router) { }


  //Component showing the latest searchresult.
  ngOnInit() {
    this.state.getFromState('searchResult')
      .subscribe(latestSearch => {
        this.searchItems = latestSearch;
      });
  }

  
  //Handles the location change
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
    this.route.navigate(['/main']);
  }
}
