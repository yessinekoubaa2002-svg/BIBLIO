import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = "http://localhost:8081/auth";

  constructor(private http: HttpClient) {}

  login(data:any){
    return this.http.post<any>(`${this.api}/login`, data);
  }

  saveToken(token:string){
    localStorage.setItem("token", token);
  }

  saveRole(role:string){
    localStorage.setItem("role", role);
  }
}