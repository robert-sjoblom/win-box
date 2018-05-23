import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType, StateService } from '../services/state.service';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  errormsg;

  constructor(
    private router: Router,
    private state: StateService,
  ) { }

  ngOnInit() {
    const url = window.location.href;
    let userDetails;
    try {
      userDetails = this.getUserDetailsFromUrl(url);
      this.state.runAction(ActionType.AddUserDetails, userDetails);
      this.router.navigate(['/main']);
    } catch (error) {
      this.errormsg = error;
      console.log(error);
    }
  }

  getUserDetailsFromUrl(url: string) {
    const userDetails: any = url.split('#')
      .reduce((acc, cur, i) => { // we want an object with key: value from the string
        if (!i) {
          return acc;
        }
        return acc = {
          // spread the object from the inner reduce onto the outer reduce object
          ...cur.split('&') // array of keys=values strings
            .map(item => item.split('=')) // we have [keys, values] instead
            .reduce((acc2, cur2) => { // make an object
              acc2[cur2[0]] = cur2[1];
              return acc2;
            }, {})
        };
      }, {});

    if (!userDetails.access_token) {
      throw new Error('You need to authorize us properly.');
    }
    return userDetails;
  }
}
