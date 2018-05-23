import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NewStateServiceService } from './new-state-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  userDetails;

  constructor(private state: NewStateServiceService, private route: Router) {
    this.state.getFromState('userDetails')
      .subscribe(userDetails => this.userDetails = userDetails);
  }

  canActivate(): boolean {
    if (!this.userDetails.access_token) {
      this.route.navigate(['/login']);
      return false;
    } else {
      // check that access token is valid
      return true;
    }

    // if(this.state.getToken() === null || this.state.getToken() === undefined){
    //   this.route.navigate(['/login'])
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
