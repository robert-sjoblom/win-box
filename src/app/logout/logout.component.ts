import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from '../services/state.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private state: StateService, private route: Router) { }

  logout() {
    this.state.logout();
    this.route.navigate(['login', 'thanks']);
  }

}
