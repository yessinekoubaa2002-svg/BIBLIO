import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('token');

    // ✅ Skip auth routes — no token needed
    const isAuthRoute = req.url.includes('/auth/');

    if (token && !isAuthRoute) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        // ✅ Token expired or invalid → force logout
        if (error.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          this.router.navigate(['/login']);
        }

        // ✅ Authenticated but wrong role
        if (error.status === 403) {
          this.router.navigate(['/forbidden']);
        }
        if (token && !isAuthRoute) {
  console.log('TOKEN BEING SENT:', token); // ← add this
  req = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + token)
  });
}

        return throwError(() => error);
      })
    );
  }
}