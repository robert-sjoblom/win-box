import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  hover;

  @Input() file;

  @Output() pathObject = new EventEmitter();

  @Output() fileObject = new EventEmitter();
 
  constructor(private route: ActivatedRoute) { };

  ngOnInit() {
  }

  changeLocation(path){
    this.pathObject.emit(path)
  }
  changeStar(file){ 
    this.fileObject.emit(this.file)
  }
}
