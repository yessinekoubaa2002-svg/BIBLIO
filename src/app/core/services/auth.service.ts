import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "https://projet-jee-1.onrender.com/auth";

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, {
      email: data.email,
      motDePasse: data.motDePasse
    });
  }

  register(data: any) {
    return this.http.post<any>(`${this.api}/register`, data);
  }

  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  saveRole(role: string) {
    const cleanRole = role?.replace('ROLE_', '') ?? '';
    localStorage.setItem("role", cleanRole);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getRole(): string | null {
    return localStorage.getItem("role");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }
}