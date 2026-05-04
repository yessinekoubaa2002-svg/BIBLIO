import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bibliothecaire-management',
  templateUrl: './bibliothecaire-management.component.html'
})
export class BibliothecaireManagementComponent implements OnInit {

  bibliothecaires: any[] = [];

  // FIX: chart properties (you were missing them)
  chartData: any;
  chartOptions: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.load();

    // FIX: chart options
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  load() {
    this.userService.getAll().subscribe({
      next: (data: any) => {
        this.bibliothecaires = data.filter((u: any) => u.role === 'BIBLIOTHECAIRE');

        // FIX: chart data
        this.chartData = {
          labels: ['Total', 'Bibliothecaires'],
          datasets: [
            {
              label: 'Users',
              data: [
                this.bibliothecaires.length,
                this.bibliothecaires.length
              ],
              backgroundColor: ['#3b82f6', '#10b981']
            }
          ]
        };
      },
      error: (err) => console.error(err)
    });
  }

  delete(id: number) {
    this.userService.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => console.error(err)
    });
  }

  goCreate() {
    this.router.navigate(['/admin/bibliothecaires/create']);
  }
}