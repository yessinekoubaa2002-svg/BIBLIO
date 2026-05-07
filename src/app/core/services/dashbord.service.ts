import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardResp8081onse {
  totalUsers: number;
  totalBooks: number;
  totalEmprunts: number;
  pendingEmprunts: number;
  returnedBooks: number;
  overdueBooks: number;
  totalBibliothecaires: number;
  availableBooks: number;
  lowStockBooks: number;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private api = 'https://projet-jee-j4gl.onrender.com/admins/dashboard';

  constructor(private http: HttpClient) {}

  // 📊 GET DASHBOARD STATS
  getStats() {
  return this.http.get<any>('https://projet-jee-j4gl.onrender.com/admins/dashboard/stats');
}

  // 👥 OPTIONAL: roles stats (only if backend exists)
  getRolesStats(): Observable<any> {
    return this.http.get<any>(`${this.api}/roles`);
  }
}