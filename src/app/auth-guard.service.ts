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

// if(!this.state.getToken()){
//   this.route.navigate(['login'])
//   return false;
// }
// else {
//   return true;
// }


// route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>