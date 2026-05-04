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
    matricule: '',
    salaire: 0
  };

  roles = [
    { label: '👤 User', value: 'USER' },
    { label: '📚 Bibliothecaire', value: 'BIBLIOTHECAIRE' }
  ];

  selectedRole: string = 'USER';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const payload = {
      nom: this.registerData.nom,
      prenom: this.registerData.prenom,
      email: this.registerData.email,
      motDePasse: this.registerData.motDePasse,
      telephone: this.registerData.telephone,
      role: this.selectedRole,

      // only required for bibliothecaire
      matricule: this.selectedRole === 'BIBLIOTHECAIRE'
        ? this.registerData.matricule
        : null,

      salaire: this.selectedRole === 'BIBLIOTHECAIRE'
        ? this.registerData.salaire
        : 0
    };

    console.log("FINAL PAYLOAD =>", payload);

    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error("REGISTER ERROR", err)
    });
  }
}