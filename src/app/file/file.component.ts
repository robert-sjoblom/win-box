import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../services/state.service';
import { DropboxService } from '../services/dropbox.service';


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
  thumbnailLink

  constructor(private route: ActivatedRoute, private state: StateService, private dropbox: DropboxService) { }

  ngOnInit() {
    this.state.getFromState('starredItems')
      .subscribe(starred => this.starredItems = starred)

    this.starTest(this.file);
  
    if(this.file.name.endsWith('jpg') || this.file.name.endsWith('pdf') || this.file.name.endsWith('jpeg')){
      this.thumbnail(this.file.path_lower);
    }
  }

  starTest(file) {
    if (this.starredItems.some(star => star.id === file.id)) {
      this.tagged = true;
    } else {
      this.tagged = false;
    }
  }

  changeLocation(path) {
    this.pathObject.emit(path);
  }
  changeStar(file) {
    this.fileObject.emit(this.file);
  }
  thumbnail(path){
    this.dropbox.thumbnail(path)
      .then(res => {
        let url = URL.createObjectURL(res.fileBlob);
        let img = document.createElement('img');
        img.src = url;
        console.log(img);
        this.thumbnailLink = true;
        document.getElementById(this.file.id).appendChild(img);
      })
      .catch(error => console.log(error))
  }

  downloadFile(file){
    this.dropbox.download(file)
      .then(resp => {
        const a = document.createElement('a');
        a.setAttribute('href', resp.link);
        a.style.display = 'none';
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      })
  }
}
