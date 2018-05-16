import { Component, OnInit } from '@angular/core';
import { DropboxLoginService } from '../dropbox-login.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private dropbox: DropboxLoginService) { }

  ngOnInit() {
  }

  login() {
  }

}
