import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashbord.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {

  stats: any;

  overviewChartData: any;
  distributionChartData: any;
  empruntChartData: any;
  trendChartData: any;

  chartOptions: any;
  pieOptions: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      position: 'bottom',
      labels: { boxWidth: 8, font: { size: 10 } }
    }
  },
  scales: {
    x: { ticks: { font: { size: 10 } } },
    y: { ticks: { font: { size: 10 } } }
  }
};

    this.pieOptions = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { boxWidth: 8, font: { size: 10 } }
        }
      }
    };

    this.loadStats();
  }

  loadStats() {
    this.dashboardService.getStats().subscribe(data => {
      this.stats = data;

      // 1 BAR
      this.overviewChartData = {
        labels: ['Users', 'Books', 'Emprunts'],
        datasets: [{
          label: 'Stats',
          data: [
            data.totalUsers ?? 0,
            data.totalBooks ?? 0,
            data.totalEmprunts ?? 0
          ],
          backgroundColor: ['#378ADD', '#1D9E75', '#7F77DD']
        }]
      };

      // 2 DOUGHNUT
      this.distributionChartData = {
        labels: ['Returned', 'Pending', 'Overdue'],
        datasets: [{
          data: [
            data.returnedBooks ?? 0,
            data.pendingEmprunts ?? 0,
            data.overdueBooks ?? 0
          ],
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444']
        }]
      };

      // 3 PIE
      this.empruntChartData = {
        labels: ['Returned', 'Pending', 'Overdue'],
        datasets: [{
          data: [
            data.returnedBooks ?? 0,
            data.pendingEmprunts ?? 0,
            data.overdueBooks ?? 0
          ],
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444']
        }]
      };

      // 4 LINE
      this.trendChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Activity',
          data: [3, 5, 2, 8, 6],
          borderColor: '#378ADD',
          backgroundColor: 'rgba(55,138,221,0.1)',
          tension: 0.4,
          fill: true
        }]
      };
    });
  }
}