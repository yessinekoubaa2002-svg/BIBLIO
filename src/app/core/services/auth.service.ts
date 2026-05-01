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
    return this.http.post<any>(`${this.api}/login`, data);
  }

  // ================= REGISTER USER =================
  registerUser(data: any) {
    return this.http.post<any>(`${this.api}/register/user`, data);
  }

  // ================= REGISTER ADMIN =================
  registerAdmin(data: any) {
    return this.http.post<any>(`${this.api}/register/admin`, data);
  }

  // ================= REGISTER BIBLIOTHECAIRE =================
  registerBibliothecaire(data: any) {
    return this.http.post<any>(`${this.api}/register/bibliothecaire`, data);
  }

  // ================= STORAGE =================
  saveToken(token: string) {
    localStorage.setItem("token", token);
  }

  saveRole(role: string) {
    localStorage.setItem("role", role);
  }

  getToken(): string | null {
  return localStorage.getItem("token");
}

getRole(): string | null {
  return localStorage.getItem("role");
}

isLoggedIn(): boolean {
  return !!this.getToken();
}

logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}
}