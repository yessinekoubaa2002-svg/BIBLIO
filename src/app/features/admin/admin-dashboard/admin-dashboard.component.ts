import { Component, OnInit } from '@angular/core';
import { AdminService, DashboardResponse } from '../../../core/services/dashbord.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  rolesStats: any;
  stats: DashboardResponse | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRolesStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;

        // 🔥 IMPORTANT (باش charts يخدمو)
        setTimeout(() => {
          this.createCharts();
        }, 100);

      },
      error: (err) => {
        console.error('ERROR loading stats', err);
      }
    });
  }
  loadRolesStats() {
  this.adminService.getRolesStats().subscribe({
    next: (data) => {
      this.rolesStats = data;

      setTimeout(() => {
        this.createRoleChart();
      }, 100);
    }
  });
}
createRoleChart() {

  if (!this.rolesStats) return;

  new Chart('rolesChart', {
    type: 'pie',
    data: {
      labels: ['Admin', 'User', 'Bibliothecaire'],
      datasets: [{
        data: [
          this.rolesStats.ADMIN || 0,
          this.rolesStats.USER || 0,
          this.rolesStats.BIBLIOTHECAIRE || 0
        ],
        backgroundColor: [
          '#dc3545', // admin
          '#0d6efd', // user
          '#198754'  // biblio
        ]
      }]
    }
  });

}

  // 🔥 NEW FUNCTION (ما تمسش القديم)
  createCharts() {

    if (!this.stats) return;

    // 📊 Emprunts Chart
    new Chart('empruntChart', {
      type: 'doughnut',
      data: {
        labels: ['Pending', 'Returned', 'Overdue'],
        datasets: [{
          data: [
            this.stats.pendingEmprunts,
            this.stats.returnedBooks,
            this.stats.overdueBooks
          ],
          backgroundColor: ['#0dcaf0', '#198754', '#dc3545']
        }]
      }
    });

    // 📚 Books Chart
    new Chart('booksChart', {
      type: 'bar',
      data: {
        labels: ['Available', 'Low Stock'],
        datasets: [{
          label: 'Books',
          data: [
            this.stats.availableBooks,
            this.stats.lowStockBooks
          ],
          backgroundColor: ['#198754', '#ffc107']
        }]
      }
    });

  }
}