import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    private router: Router,
    private state: StateService,
  ) { }

  ngOnInit() {
    const url = window.location.href;
    this.state.setUserDetailsFromUrl(url)
      .then(() => {
        // we authorized, redirect to main
        this.router.navigate(['/main']);
    })
      .catch(/* something went shit */);
  }
}



/*
requests like so:
 private http: HttpClient
        const apiUrl = 'https://api.dropboxapi.com/2/files/list_folder';
        this.http.post(apiUrl, {path: ''})
          .subscribe(res => console.log(res));

        /* this works, but is a promise. we want an observable

        this.dropbox.dropboxClient.filesListFolder({path: '/delad mapp'})
          .then(res => console.log('files! ', res));
      */
