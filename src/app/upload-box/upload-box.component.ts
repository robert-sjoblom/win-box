import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../services/state.service';
import { UploadService } from './upload.service';

@Component({
  selector: 'upload-box',
  templateUrl: './upload-box.component.html',
  styleUrls: ['./upload-box.component.css']
})
export class UploadBoxComponent implements OnInit, OnDestroy {
  uploadingState;
  fileToUpload: File;
  path;
  display;
  constructor(private upload: UploadService, private state: StateService) { }

  ngOnInit() {
    this.upload.getUploadingState()
      .subscribe(state => this.uploadingState = state);

    this.state.getFromState('Location')
      .subscribe(res => this.path = res);

    this.state.getFromState('userDetails')
      .subscribe(res => {
        if (res.access_token) {
          this.display = true;
        } else {
          this.display = false;
        }
      });
  }

  handleChange(files) {
    const formData: FormData = new FormData();
    this.fileToUpload = files.item(0);
    if ((this.fileToUpload.size / 1024 ** 2) < 150) { // make sure it's less than 150mb size
      this.upload.upload(this.fileToUpload);
    } else {
      alert('Too big, too big!');
    }
  }

  ngOnDestroy() {
    this.uploadingState.unsubscribe();
    this.path.unsubscribe();
  }

}
