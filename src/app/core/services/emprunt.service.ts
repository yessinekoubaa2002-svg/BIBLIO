import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EmpruntService {

  private api = "http://localhost:8081/emprunts";

  constructor(private http: HttpClient) {}

  getAll(){
    return this.http.get<any[]>(this.api);
  }

  validate(id:number){
    return this.http.put(`${this.api}/${id}/validate`, {});
  }

  retour(id:number){
    return this.http.put(`${this.api}/${id}/retour`, {});
  }
  create(livreId:number){
  return this.http.post(`http://localhost:8081/emprunts/${livreId}`, {});
}
}