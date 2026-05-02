import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  isEditMode = false;
  userId: number | null = null;
  loading = false;
  error = '';
  success = '';

  form = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motDePasse: '',
    role: 'USER',
    // bibliothecaire only
    matricule: '',
    salaire: 0
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number) {
    this.loading = true;
    this.userService.getById(id).subscribe({
      next: (u) => {
        this.form.nom       = u.nom;
        this.form.prenom    = u.prenom;
        this.form.email     = u.email;
        this.form.telephone = u.telephone;
        this.form.role      = u.role;
        this.form.matricule = u.matricule || '';
        this.form.salaire   = u.salaire || 0;
        this.loading = false;
      },
      error: () => {
        this.error = 'Utilisateur introuvable.';
        this.loading = false;
      }
    });
  }

  submit() {
    this.error = '';
    this.success = '';
    this.loading = true;

    if (this.isEditMode && this.userId) {
      // ── EDIT ──────────────────────────────────────
      this.userService.update(this.userId, this.form).subscribe({
        next: () => {
          this.success = 'Utilisateur mis à jour avec succès.';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/admin/users']), 1200);
        },
        error: (err) => {
          this.error = err.error || 'Erreur lors de la mise à jour.';
          this.loading = false;
        }
      });

    } else {
      // ── CREATE ─────────────────────────────────────
      const call$ =
        this.form.role === 'ADMIN'          ? this.userService.createUser(this.form) :
        this.form.role === 'BIBLIOTHECAIRE' ? this.userService.createUser(this.form) :
                                              this.userService.createUser(this.form);

      call$.subscribe({
        next: () => {
          this.success = 'Utilisateur créé avec succès.';
          this.loading = false;
          setTimeout(() => this.router.navigate(['/admin/users']), 1200);
        },
        error: (err) => {
          this.error = err.error || 'Erreur lors de la création.';
          this.loading = false;
        }
      });
    }
  }

  cancel() {
    this.router.navigate(['/admin/users']);
  }

  get isBibliothecaire() {
    return this.form.role === 'BIBLIOTHECAIRE';
  }
}