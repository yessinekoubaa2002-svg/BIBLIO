import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['role'];
    const userRole = this.auth.getRole()?.replace('ROLE_', '');  // ← strip prefix

    console.log('RoleGuard — expected:', expectedRole, '| actual:', userRole); // ← temp debug

    if (!userRole || userRole !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}