import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data['role'];
    const userRole = this.auth.getRole();

    console.log('RoleGuard → expected:', expectedRole, 'actual:', userRole);

    // ❌ No role found → force login
    if (!userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // 🔥 Normalize roles (fix ROLE_ prefix + case issues)
    const cleanUserRole = userRole.replace('ROLE_', '').toUpperCase();
    const cleanExpectedRole = expectedRole?.toUpperCase();

    // ❌ Role mismatch → block access
    if (cleanUserRole !== cleanExpectedRole) {
      this.router.navigate(['/login']);
      return false;
    }

    // ✅ Allowed
    return true;
  }
}