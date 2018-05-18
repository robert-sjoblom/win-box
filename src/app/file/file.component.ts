import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  @Input() file;

  @Output() fileObject = new EventEmitter

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.file)
    console.log(this.file[".tag"] === 'folder')
  }

  changePath(file){
    this.fileObject.emit(this.file)
  }

}
