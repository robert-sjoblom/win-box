import { Component, OnInit } from '@angular/core';
import { DropboxService } from '../services/dropbox.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl;
  constructor(private dropbox: DropboxService) { }

  ngOnInit() {
    this.loginUrl = this.dropbox.url();
  }
}
