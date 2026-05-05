import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = {
    email: '',
    motDePasse: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
  this.authService.login(this.loginForm).subscribe({
    next: (res: any) => {

      console.log("LOGIN RESPONSE 👉", res); // 🧪 للتأكد

      const role = res.role?.replace('ROLE_', '');

      this.authService.saveToken(res.token);
      this.authService.saveRole(role);

      // ✅ FIX
      localStorage.setItem('userId', res.id);
      localStorage.setItem('username', res.nom + ' ' + res.prenom);

      // navigation
      if (role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } 
      else if (role === 'BIBLIOTHECAIRE') {
        this.router.navigate(['/bibliothecaire']);
      } 
      else {
        this.router.navigate(['/user']);
      }

    },
    error: (err) => {
      console.error("LOGIN ERROR", err);
    }
  });
}
}