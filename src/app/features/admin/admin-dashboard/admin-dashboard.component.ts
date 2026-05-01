import { Component, OnInit } from '@angular/core';
import { AdminService, DashboardResponse } from '../../../core/services/dashbord.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  stats: DashboardResponse | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats() {
    this.adminService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('ERROR loading stats', err);
      }
    });
  }
}