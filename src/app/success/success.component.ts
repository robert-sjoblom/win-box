import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private state: StateService
  ) { }

  ngOnInit() {
    const url = window.location.href;
    this.state.setUserDetailsFromUrl(url)
      .then(val => console.log('shit yeah')) // redirect to main-view
      .catch(/* something went shit */);

  }

}
