
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService){

  }
  /**
   *
   *
   *
  */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){


    const sessionUser = this.cookieService.get('session_user');

    if (sessionUser)
    {
      return true;
    }
    else{
      this.router.navigate(['/sessions/signin']);
      return false;
    }
     }

}
