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
        const res = crumbs.map(item => {
          return { [item.split('/').pop()]: [item].toString() };
        }); // key = name, value = address

        this.breadcrumbs = res;
        // console.log(this.breadcrumbs);
      });
  }

  changePath(val) {
    console.log(val);
    this.state.runAction(ActionType.ChangeLocation, val);
    // console.log(this.breadcrumbs);
  }

  goUp() {
    if (this.breadcrumbs.length > 0) {
      if (this.breadcrumbs.length === 1) {
        this.changePath('root');
      } else {
        const obj = this.breadcrumbs[this.breadcrumbs.length - 2]
        console.log(obj);
        this.changePath(obj[Object.keys(obj)[0]]);
      }
    }
  }
}
