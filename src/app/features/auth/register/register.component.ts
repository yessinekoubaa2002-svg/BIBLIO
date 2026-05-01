import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerData = {
    nom: '',
    prenom: '',
    email: '',
    motDePasse: ''
  };

  selectedRole: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.selectedRole === 'ADMIN') {
      this.authService.registerAdmin(this.registerData).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error("REGISTER ERROR", err)
      });

    } else if (this.selectedRole === 'BIBLIOTHECAIRE') {
      this.authService.registerBibliothecaire(this.registerData).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error("REGISTER ERROR", err)
      });

    } else {
      this.authService.registerUser(this.registerData).subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error("REGISTER ERROR", err)
      });
    }
  }
}