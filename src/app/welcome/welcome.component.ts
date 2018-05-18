import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loggedIn;

  constructor(private router: Router) { }

  ngOnInit() {
    this.loggedIn = true;
    console.log(this.loggedIn);

    if (this.loggedIn) {
      console.log('logged in is true');
      this.router.navigate(['/main']);
    } else {
      console.log('logged in is false');
      this.router.navigate(['/login']);
    }

  }

}
