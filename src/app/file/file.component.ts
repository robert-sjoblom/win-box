import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input() file;

  @Output() fileObject = new EventEmitter

  constructor() { }

  ngOnInit() {
    // console.log(this.file)
    // console.log(this.file[".tag"] === 'folder')
  }

  changePath(file){
    this.fileObject.emit(this.file)
  }

}
