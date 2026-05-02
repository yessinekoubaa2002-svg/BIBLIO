import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-bib',
  templateUrl: './create-bib.component.html'
})
export class CreateBibComponent implements OnInit {

  isEditMode = false;
  editId: number | null = null;

  biblio = {
    nom: '', prenom: '', email: '',
    motDePasse: '', telephone: '',
    matricule: '', salaire: 0
  };

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute  // ← inject this
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.editId = +id;
      this.userService.getById(this.editId).subscribe({
        next: (data: any) => this.biblio = data,
        error: (err) => console.error(err)
      });
    }
  }

  create() {
    if (this.isEditMode && this.editId) {
      // EDIT
      this.userService.update(this.editId, this.biblio).subscribe({
        next: () => this.router.navigate(['/admin/bibliothecaires']),
        error: (err) => console.error(err)
      });
    } else {
      // CREATE
      const payload = { ...this.biblio, role: 'BIBLIOTHECAIRE' };
      this.authService.register(payload).subscribe({
        next: () => this.router.navigate(['/admin/bibliothecaires']),
        error: (err) => console.error(err)
      });
    }
  }
}