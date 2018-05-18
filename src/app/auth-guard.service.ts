import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  canActivate(): boolean {
    if(this.state.getToken() === null || this.state.getToken() === undefined){
      this.route.navigate(['/login'])
      return false;
    } else {
      return true;
    }
  }
  constructor(private state: StateService, private route: Router) { }
}
