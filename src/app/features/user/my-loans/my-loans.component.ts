import { Component, OnInit } from '@angular/core';
import { EmpruntService } from 'src/app/core/services/emprunt.service';
import { Emprunt } from 'src/app/models/emprunt';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.css']
})
export class MyLoansComponent implements OnInit {

  emprunts: Emprunt[] = [];
  filtered: Emprunt[] = [];
  loading = true;
  activeFilter = 'ALL';

  filters = [
    { label: 'All',      value: 'ALL' },
    { label: 'Active',   value: 'ACTIVE' },
    { label: 'Returned', value: 'RETURNED' },
    { label: 'Late',     value: 'LATE' },
    { label: 'Pending',  value: 'PENDING' }
  ];

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.empruntService.getMyEmprunts().subscribe({
      next: (data) => {
        console.log("🔥 EMPRUNTS FROM BACK:", data); // ✅ ADD THIS
        this.emprunts = data;
        this.filtered = data;
        this.loading = false;
        
  

      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  applyFilter(value: string): void {
    this.activeFilter = value;
    switch (value) {
      case 'ACTIVE':   this.filtered = this.emprunts.filter(e =>  e.valide && !e.retourne); break;
      case 'RETURNED': this.filtered = this.emprunts.filter(e =>  e.retourne); break;
      case 'LATE':     this.filtered = this.emprunts.filter(e =>  e.enRetard); break;
      case 'PENDING':  this.filtered = this.emprunts.filter(e => !e.valide && !e.retourne); break;
      default:         this.filtered = this.emprunts;
    }
  }

  getStatus(e: Emprunt): { label: string; class: string } {
    if (e.enRetard) return { label: 'Late',     class: 'status-late' };
    if (e.retourne) return { label: 'Returned', class: 'status-returned' };
    if (e.valide)   return { label: 'Active',   class: 'status-active' };
    return                 { label: 'Pending',  class: 'status-pending' };
  }

  getDaysLeft(dateLimite: string): number {
    const today = new Date();
    const limit = new Date(dateLimite);
    return Math.ceil((limit.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }
}