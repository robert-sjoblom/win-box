import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService{

  constructor(private state: StateService) { }  

  isAuth(){
    // this.state.getAuthToken()
  }


}



// route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>