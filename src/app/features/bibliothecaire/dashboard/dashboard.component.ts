import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/core/services/emprunt.service';

@Component({
  selector: 'app-biblio-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  emprunts: any[] = [];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.empruntService.getAll().subscribe({
      next: (data: any[]) => {
        this.emprunts = data.map(e => ({
          id: e.id,
          valide: e.valide,
          retourne: e.retourne,
          dateEmprunt: e.dateEmprunt,
          dateLimiteRetour: e.dateLimiteRetour,
          livre: {
            titre: e.livre?.titre || 'No book'
          },
          user: {
            nom: e.user?.nom || 'Unknown',
            prenom: e.user?.prenom || ''
          }
        }));
      },
      error: (err) => console.error('Error loading emprunts', err)
    });
  }

  valider(id: number): void {
    this.empruntService.validate(id).subscribe({
      next: () => {
        console.log('Emprunt validé');
        this.load();
      },
      error: (err) => console.error(err)
    });
  }

  retour(id: number): void {
    this.empruntService.retour(id).subscribe({
      next: () => {
        console.log('Retour effectué');
        this.load();
      },
      error: (err) => console.error(err)
    });
  }
}