import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../services/dropbox.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'; 
import { StateService } from '../services/state.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: string[];
  stream = new Subject<string>(); 

  constructor(private dropbox: DropboxService, private state: StateService) { }

  ngOnInit() {
    this.stream
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(query => this.dropbox.search(query))
      )
      .subscribe(results => {
        this.results = results;
        
        console.log(this.results)
      },
      err => console.log(err)
    )
  }

  onChangeSearch(value){
    this.stream.next(value)
  }
}
