import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {

  private baseUrl = 'http://localhost:8081/users';
  private authUrl = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  // ── USERS CRUD ─────────────────────────
  getAll() {
    return this.http.get<any[]>(this.baseUrl);
  }

  getById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createUser(data: any) {
    return this.http.post(`${this.baseUrl}/add`, data);
  }

  update(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  delete(id: number) {
  return this.http.delete(`${this.baseUrl}/delete/${id}`, {
    responseType: 'text'  // ← add this
  });
}

  // ── AUTH ───────────────────────────────
  register(data: any) {
    return this.http.post(`${this.authUrl}/register`, data);
  }
}