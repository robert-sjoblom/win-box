import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionType, StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleMenu;
  constructor(private state: StateService, private router: Router) { }
  title = 'app';

  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    // this.state.runAction(ActionType.GetFileListing, this.location);
  }

  logout() {
    this.toggleMenu = false;
    this.state.logout();
    this.router.navigate(['login', 'thanks']);
  }
}
