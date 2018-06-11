import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userDetails;

  constructor(private state: StateService, private route: Router) {
    this.state.getFromState('userDetails')
      .subscribe(userDetails => this.userDetails = userDetails);
  }

  canActivate(): boolean {
    if (!this.userDetails.access_token) {
      this.route.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
