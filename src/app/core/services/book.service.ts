import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private api = "http://localhost:8081/livres";

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<any[]>(this.api);
  }
}