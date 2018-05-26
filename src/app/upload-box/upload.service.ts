import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DropboxService } from '../services/dropbox.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadingState;
  private subject = new BehaviorSubject(this.uploadingState);

  constructor(private dropbox: DropboxService) {
    this.uploadingState = { isUploading: false, progress: 0, error: null };
  }

  upload(val) {
    this.dropbox.upload(val, this.writeState, this.updateSubscribers);
  }

  getUploadingState() {
    return this.subject.asObservable();
  }

  writeState = (evt, response, msg) => {
    if (evt === 'onload') {
      switch (response) {
        case 'success':
          console.log('dis worked fine.');
          this.uploadingState = { isUploading: false, progress: 100, error: null };
          break;
        case 'failure':
          console.log('dis didnt work fine');
          this.uploadingState = { isUploading: false, progress: 0, error: msg };
      }
    } else {
      const progress = Math.floor((evt.loaded / evt.total) * 100);
      this.uploadingState = {
        ...this.uploadingState,
        isUploading: true,
        progress: progress,
      };
    }
    this.updateSubscribers();
  }
  updateSubscribers() {
    this.subject.next(this.uploadingState);
  }

}
