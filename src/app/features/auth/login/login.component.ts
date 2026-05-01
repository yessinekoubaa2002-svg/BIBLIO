import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  mode: 'login' | 'register' = 'login';

  loginForm = {
    email: '',
    motDePasse: ''
  };

  registerForm = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    telephone: '',
    matricule: '',
    salaire: 0
  };

  selectedRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.authService.login(this.loginForm).subscribe({
      next: (res: any) => {
        console.log("LOGIN OK", res);
        console.log("ROLE =", res.role);

        this.authService.saveToken(res.token);
        this.authService.saveRole(res.role);

        if (res.role === 'ROLE_ADMIN' || res.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else if (res.role === 'ROLE_BIBLIOTHECAIRE' || res.role === 'BIBLIOTHECAIRE') {
          this.router.navigate(['/biblio']);
        } else if (res.role === 'ROLE_USER' || res.role === 'USER') {
          this.router.navigate(['/user']);
        }
      },
      error: (err) => {
        console.error("LOGIN ERROR", err);
      }
    });
  }

  register() {
    if (this.selectedRole === 'ADMIN') {
      this.authService.registerAdmin(this.registerForm).subscribe({
        next: () => { this.mode = 'login'; this.selectedRole = ''; },
        error: (err) => console.error("REGISTER ERROR", err.error)
      });

    } else if (this.selectedRole === 'BIBLIOTHECAIRE') {
      this.authService.registerBibliothecaire(this.registerForm).subscribe({
        next: () => { this.mode = 'login'; this.selectedRole = ''; },
        error: (err) => console.error("REGISTER ERROR", err.error)
      });

    } else {
      this.authService.registerUser(this.registerForm).subscribe({
        next: () => { this.mode = 'login'; this.selectedRole = ''; },
        error: (err) => console.error("REGISTER ERROR", err.error)
      });
    }
  }
  
}