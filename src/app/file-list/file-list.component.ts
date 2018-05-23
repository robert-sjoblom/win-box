import { Component, Input, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  @Input() files;
  constructor(private stateService: StateService) { }

  ngOnInit() {
  }

  // changePath(event) {
  //   this.stateService.changePath(event.path_lower, event['.tag']);
  // }
}
