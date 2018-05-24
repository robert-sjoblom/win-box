import { Component, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';

@Component({
  selector: 'upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {
  fileToUpload: File;
  constructor(private state: StateService) { }

  ngOnInit() {
  }

  handleChange(files) {
    const formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
    this.state.upload(this.fileToUpload);
  }

  /*
  isAdvancedUpload = () => {
    // tests whether drag and drop functionality exists in browser.
    // source: https://css-tricks.com/drag-and-drop-file-uploading/
    const div = document.createElement('div');

    return (
      ('draggable' in div)
      || ('ondragstart' in div && 'ondrop' in div))
      && 'FormData' in window
      && 'FileReader' in window;
  }
  */

}
