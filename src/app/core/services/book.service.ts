import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livre } from 'src/app/models/Livre';

@Injectable({
  providedIn: 'root'
})
export class LivreService {

  private api = 'http://localhost:8081/livres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.api);
  }

  getById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.api}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.api}/add`, data);
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/update/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/delete/${id}`, {
      responseType: 'text'
    });
  }

  searchByTitle(titre: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.api}/search/title?titre=${titre}`);
  }

  searchByAuteur(auteur: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.api}/search/auteur?auteur=${auteur}`);
  }

  getAvailable(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.api}/available`);
  }

  getLowStock(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.api}/low-stock`);
  }
  filterByCategory(nom: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.api}/category?nom=${nom}`);
  }
}