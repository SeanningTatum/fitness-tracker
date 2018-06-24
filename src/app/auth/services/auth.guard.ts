import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route
} from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }


  // If can load is there, we can delete this.
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth())
      return true;
    else
      this.router.navigate(['/login']);
  }

  canLoad(route: Route) {
    if (this.authService.isAuth())
      return true;
    else
      this.router.navigate(['/login']);
  }
}
