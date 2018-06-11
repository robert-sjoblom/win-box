import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropboxService } from '../services/dropbox.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl;
  thanks;
  constructor(private dropbox: DropboxService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.loginUrl = this.dropbox.url();
    this.route.paramMap
      .subscribe(params => this.thanks = params.get('thanks'));
  }
}
