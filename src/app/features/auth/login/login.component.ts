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
    salaire: 0,
    role: ''
  };

  selectedRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  // ================= LOGIN =================
  login() {

    console.log("LOGIN FORM SENT:", this.loginForm); // 🔥 DEBUG

    this.authService.login(this.loginForm).subscribe({
      next: (res: any) => {
        console.log("LOGIN SUCCESS", res);

        this.authService.saveToken(res.token);
        this.authService.saveRole(res.role);

        if (res.role === 'ADMIN' || res.role === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } 
        else if (res.role === 'BIBLIOTHECAIRE') {
          this.router.navigate(['/biblio']);
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

  // ================= REGISTER =================
  register() {

    if (this.selectedRole) {
      this.registerForm.role = this.selectedRole;
    }

    this.authService.register(this.registerForm).subscribe({
      next: () => {
        console.log("REGISTER SUCCESS");
        this.mode = 'login';
      },
      error: (err) => {
        console.error("REGISTER ERROR", err);
      }
    });
  }
}