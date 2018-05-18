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

  @Output() fileObject = new EventEmitter

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

  changePath(file){
    this.fileObject.emit(this.file)
  }
  enter(event){
    this.hover = !this.hover
  }
}
