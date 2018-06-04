import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../services/dropbox.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; 
import { StateService, ActionType } from '../services/state.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: string[] = [];
  latestSearch:string[] = [];
  toggle;
  stream = new Subject<string>(); 
  

  constructor(private dropbox: DropboxService, private state: StateService) { }

  ngOnInit() {
    this.stream
      .pipe( // Pipe subscribes to and observable or a promise.
        debounceTime(400), // to not send multiple requests all the time
        distinctUntilChanged(), // waits until the searchtext has changed
        switchMap(query => this.dropbox.search(query)) // this sends the search request to dropbox.
      )
      .subscribe((results:any) => {
        if(results.length > 0){

          this.state.runAction(ActionType.SaveSearch, results)
          let obj = results.map(item => {
            return {
              ...item,
              search:true
            }
          });
          this.results = obj
          return obj;
        } else {
          this.results = [];
        }
      },
      err => console.log(err)
    )
    this.state.getFromState('searchResult')
      .subscribe(search => {
        this.latestSearch = search;
      });
  }
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
  }
  setTime(){
    setTimeout(()=> this.results = [], 200);
  }
  onChangeSearch(query){
    this.stream.next(query)
  }
}
