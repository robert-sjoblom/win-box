import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'latestsearch',
  templateUrl: './latestsearch.component.html',
  styleUrls: ['./latestsearch.component.css']
})
export class LatestsearchComponent implements OnInit {

  searchItems = [];

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getFromState('searchResult')
      .subscribe(latestSearch => {
        this.searchItems = latestSearch;
        console.log(this.searchItems, "this is from latestSearch!");
      })
  }
}
