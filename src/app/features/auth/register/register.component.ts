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
    motDePasse: '',
    telephone: '',
    role: '' // optional
  };

  selectedRole: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    // attach selected role if needed
    if (this.selectedRole) {
      this.registerData.role = this.selectedRole;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        console.log("REGISTER OK");
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("REGISTER ERROR", err);
      }
    });
  }
}