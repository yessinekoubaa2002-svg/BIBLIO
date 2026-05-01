import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = 'http://localhost:8081/auth';

  constructor(private http: HttpClient) {}

  // 👤 CREATE USER
  createUser(data: any) {
    return this.http.post(`${this.api}/register/user`, data);
  }

  // 📚 CREATE BIBLIOTHECAIRE
  createBibliothecaire(data: any) {
    return this.http.post(`${this.api}/register/bibliothecaire`, data);
  }

  // 📋 GET ALL USERS (تأكد عندك endpoint في backend)
  getAll() {
    return this.http.get<any[]>('http://localhost:8081/users');
  }
}