import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DropboxService } from '../services/dropbox.service';
import { ActionType, StateService } from '../services/state.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fade', [
      state('visible', style({ opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-in')
      ]),
      transition(':leave', [ // transition from 'visible' state to unmounted
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SearchComponent implements OnInit {

  results: string[] = [];
  latestSearch: string[] = [];
  toggle;
  stream = new Subject<string>();


  constructor(private dropbox: DropboxService, private state: StateService, private route: Router) { }

  ngOnInit() {
    this.stream
      .pipe( // Pipe subscribes to and observable or a promise.
        debounceTime(400), // to not send multiple requests all the time
        distinctUntilChanged(), // waits until the searchtext has changed
        switchMap(query => this.dropbox.search(query)) // this sends the search request to dropbox.
      )
      .subscribe((results: any) => {
        if (results.length > 0) {

          this.state.runAction(ActionType.SaveSearch, results);
          const obj = results.map(item => {
            return {
              ...item,
              search: true
            };
          });
          this.results = obj;
          return obj;
        } else {
          this.results = [];
        }
      },
      err => console.log(err)
    );
    this.state.getFromState('searchResult')
      .subscribe(search => {
        this.latestSearch = search;
      });
  }
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
    this.route.navigate(['/main']);
  }
  setTime() {
    setTimeout(() => this.results = [], 200);
  }
  onChangeSearch(query) {
    //Sends the query into stream
    this.stream.next(query);
  }
}
