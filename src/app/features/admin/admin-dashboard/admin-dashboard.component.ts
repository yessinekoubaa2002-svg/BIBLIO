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

  ngOnInit(): void {

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };

    this.loadStats();
  }

  constructor(private dashboardService: DashboardService) {}

  loadStats() {
    this.dashboardService.getStats().subscribe(data => {

      this.stats = data;

      // 1 BAR
      this.overviewChartData = {
        labels: ['Users', 'Books', 'Emprunts'],
        datasets: [{
          label: 'Stats',
          data: [
            data.totalUsers || 0,
            data.totalBooks || 0,
            data.totalEmprunts || 0
          ]
        }]
      };

      // 2 DOUGHNUT
      this.distributionChartData = {
        labels: ['Returned', 'Pending', 'Overdue'],
        datasets: [{
          data: [
            data.returnedBooks || 0,
            data.pendingEmprunts || 0,
            data.overdueBooks || 0
          ]
        }]
      };

      // 3 PIE
      this.empruntChartData = {
        labels: ['Returned', 'Pending', 'Overdue'],
        datasets: [{
          data: [
            data.returnedBooks || 0,
            data.pendingEmprunts || 0,
            data.overdueBooks || 0
          ],
          backgroundColor: ['#22c55e', '#f59e0b', '#ef4444']
        }]
      };

      // 4 LINE (simple trend fake example)
      this.trendChartData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{
          label: 'Activity',
          data: [3, 5, 2, 8, 6]
        }]
      };

    });
  }
}