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
    if ((this.fileToUpload.size / 1024 ** 2) < 150) {
      this.upload.upload(this.fileToUpload);
    } else {
      alert('Too big, too big!');
    }
  }
}
