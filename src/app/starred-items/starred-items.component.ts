import { Component, OnInit } from '@angular/core';
import { ActionType, StateService } from '../services/state.service';
import { Router } from '@angular/router';


@Component({
  selector: 'starred-items',
  templateUrl: './starred-items.component.html',
  styleUrls: ['./starred-items.component.css']
})
export class StarredItemsComponent implements OnInit {
  starredItems;

  constructor(private state: StateService, private route: Router) { }

  ngOnInit() {
    this.state.getFromState('starredItems')
      .subscribe(starred => this.starredItems = starred);

    this.state.runAction(ActionType.ChangeLocation, 'starred');
  }
  changeStar(file) {
    this.state.runAction(ActionType.RemoveStar, file);
  }

  changeLocation(location) {
    console.log(location)
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
    this.route.navigate(['/main'])
  }

}
