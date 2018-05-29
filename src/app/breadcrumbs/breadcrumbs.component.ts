import { Component, OnInit } from '@angular/core';
import { ActionType, StateService } from '../services/state.service';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs;
  objectKeys = Object.keys;
  constructor(private state: StateService) { }

  ngOnInit() {
    this.state.getFromState('breadcrumbs')
      .subscribe(crumbs => {
        let crumbsToMapOver;
        if (crumbs.error) {
          crumbsToMapOver = Object.keys(crumbs)
            .filter(key => key !== 'error')
            .map(key => crumbs[key]);
        } else {
          crumbsToMapOver = crumbs;
        }
        const res = crumbsToMapOver.map(item => {
          return { [item.split('/').pop()]: [item].toString() };
        }); // key = name, value = address
        this.breadcrumbs = res;
      });
  }

  changePath(val) {
    this.state.runAction(ActionType.ChangeLocation, val);
  }

  goUp() {
    if (this.breadcrumbs.length > 0) {
      if (this.breadcrumbs.length === 1) {
        this.changePath('root');
      } else {
        const obj = this.breadcrumbs[this.breadcrumbs.length - 2];
        this.changePath(obj[Object.keys(obj)[0]]);
        // one level up is 1 before .length-1
        // then we use the first key in Object.kes(obj)[0]
        // as a key on obj.
        // so gud.
      }
    }
  }
}
