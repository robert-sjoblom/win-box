import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';



@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUrl;
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.loginUrl = this.stateService.login();
  }
}
