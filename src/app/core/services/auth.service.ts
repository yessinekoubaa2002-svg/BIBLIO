import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:8081/auth";

  constructor(private http: HttpClient) {}

  // ================= LOGIN =================
  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, {
      email: data.email,
      motDePasse: data.motDePasse
    });
  }

  // ================= REGISTER (GENERIC) =================
  register(data: any) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  // ================= STORAGE =================
  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  saveRole(role: string) {
    localStorage.setItem("role", role);
  }

  getRole(): string | null {
    return localStorage.getItem("role");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}