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
  filterByCategory(nom: string) {
  return this.http.get<Livre[]>(`${this.api}/category?nom=${nom}`);
}
}