import { Component, OnInit } from '@angular/core';
import { ActionType, StateService } from '../services/state.service';


@Component({
  selector: 'starred-items',
  templateUrl: './starred-items.component.html',
  styleUrls: ['./starred-items.component.css']
})
export class StarredItemsComponent implements OnInit {
  starredItems;

  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getFromState('starredItems')
      .subscribe(starred => this.starredItems = starred);
  }
  changeStar(file) {
    this.state.runAction(ActionType.RemoveStar, file);
  }

}
