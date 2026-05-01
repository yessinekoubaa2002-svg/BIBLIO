import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/core/services/emprunt.service';

@Component({
  selector: 'app-biblio-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  emprunts: any[] = [];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit() {
    this.load();
  }

 load() {
  this.empruntService.getAll().subscribe({
    next: (data) => {
      this.emprunts = data.map(e => ({
        id: e.id,
        valide: e.valide,
        retourne: e.retourne,
        dateEmprunt: e.dateEmprunt,
        dateLimiteRetour: e.dateLimiteRetour,
        livre: {
          titre: e.livre?.titre || 'No book'
        }
      }));
    }
  });
}
  valider(id: number) {
  this.empruntService.validate(id).subscribe({
    next: () => {
      console.log("Emprunt validé");
      this.load(); // refresh table
    },
    error: (err) => console.error(err)
  });
}

retour(id: number) {
  this.empruntService.retour(id).subscribe({
    next: () => {
      console.log("Retour effectué");
      this.load(); // refresh table
    },
    error: (err) => console.error(err)
  });
}
}