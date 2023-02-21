import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private routes: Router,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('access_token') != null) {
      let loginTime = parseInt(localStorage.getItem('exp'));
      let time = Date.now();
      let timeAuth = Math.round((time - loginTime) / (1000 * 60));

      if (timeAuth <= 6000) {
        return true;
      }
      return false;
    } else {
      this.authService.logout().subscribe(
        (data) => {
          this.router.navigateByUrl('/login');
        },
        (err) => {
          //console.log('Auth guard delete session.');
          this.authService.deleteSession();
        }
      );
      return false;
    }
  }
}