import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from 'src/app/models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private api = "http://localhost:8081/emprunts";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.api);
  }

  create(livreId: number): Observable<Emprunt> {
    return this.http.post<Emprunt>(`${this.api}/${livreId}`, {});
  }

  validate(id: number) {
    return this.http.put(`${this.api}/valider/${id}`, {});
  }

  retour(id: number) {
    return this.http.put(`${this.api}/retour/${id}`, {});
  }
}