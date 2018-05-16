import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DropboxLoginService } from '../dropbox-login.service';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,

    private dropbox: DropboxLoginService
  ) { }

  ngOnInit() {
    console.log(window.location.href);

  }

}
