import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropboxService } from '../services/dropbox.service';
import { StateService } from '../services/state.service';


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
  constructor(private route: ActivatedRoute, private state: StateService, private dropbox: DropboxService) { }

  ngOnInit() {
    this.state.getFromState('starredItems')
      .subscribe(starred => this.starredItems = starred);

    this.starTest(this.file);
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

  downloadFile(file) {
    this.dropbox.download(file)
      .then(resp => {
        const a = document.createElement('a');
        a.setAttribute('href', resp.link);
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
  }
}
