import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/core/services/emprunt.service';

@Component({
  selector: 'app-biblio-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  emprunts:any[] = [];

  constructor(private service: EmpruntService) {}

  ngOnInit(): void {
    this.load();
  }

  load(){
    this.service.getAll().subscribe(res => {
      this.emprunts = res;
    });
  }

  valider(id:number){
    this.service.validate(id).subscribe(() => {
      this.load();
    });
  }

  retour(id:number){
    this.service.retour(id).subscribe(() => {
      this.load();
    });
  }
}