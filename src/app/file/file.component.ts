import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewStateServiceService } from '../new-state-service.service';


@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input() file;

  @Output() pathObject = new EventEmitter();

  @Output() fileObject = new EventEmitter();

  starredItems;
  tagged;
  constructor(private route: ActivatedRoute, private state: NewStateServiceService) { };

  ngOnInit() {
    this.state.getFromState('starredItems')
      .subscribe(starred => this.starredItems = starred)
    
    this.starTest(this.file)
  }

  starTest(file){
    if(this.starredItems.some(star => star.id === file.id)){
      this.tagged = true;
    } else{
      this.tagged = false;
    }
  }

  changeLocation(path){
    this.pathObject.emit(path)
  }
  changeStar(file){ 

    this.fileObject.emit(this.file)
  }
}
