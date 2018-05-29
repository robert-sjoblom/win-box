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
  stream = new Subject<string>(); 

  constructor(private dropbox: DropboxService, private state: StateService) { }

  ngOnInit() {
    this.stream
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(query => this.dropbox.search(query))
      )
      .subscribe((results:any) => {
        if(results.length > 0){

          //results should be saved in state before map
          this.results = results.map(item => {
            let obj = {
              ...item,
              search: true
            }
            console.log(obj)
            return obj
          });
        } else {
          this.results = []
        }
        
        
        console.log(this.results)
      },
      err => console.log(err)
    )
  }
  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.state.runAction(ActionType.GetFileListing, location);
  }

  onChangeSearch(value){
    this.stream.next(value)
  }
}
