import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprunt } from 'src/app/models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {

  private api = 'https://projet-jee-1.onrender.com/emprunts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.api);
  }

  // ✅ ADD THIS — for My Loans page
  getMyEmprunts(): Observable<Emprunt[]> {
    const userId = localStorage.getItem('userId');
    return this.http.get<Emprunt[]>(`${this.api}/user/${userId}`);
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