import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActionType, StateService } from './services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toggleMenu;
  constructor(private state: StateService, private router: Router) {
    router.events
    .pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: NavigationEnd) => {
        this.toggleMenu = false;
      });
  }
  title = '#win_box';

  changeLocation(location) {
    this.state.runAction(ActionType.ChangeLocation, location);
    this.toggleMenu = false;
  }

  logout() {
    this.state.logout();
    this.router.navigate(['login', 'thanks']);
  }
}
