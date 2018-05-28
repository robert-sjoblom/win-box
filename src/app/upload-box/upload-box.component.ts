import { Component, OnInit } from '@angular/core';
import { UploadService } from './upload.service';

@Component({
  selector: 'upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit {
  uploadingState;
  fileToUpload: File;
  constructor(private upload: UploadService) { }

  ngOnInit() {
    this.upload.getUploadingState()
      .subscribe(state => this.uploadingState = state);
  }

  handleChange(files) {
    const formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    this.upload.upload(this.fileToUpload);
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
