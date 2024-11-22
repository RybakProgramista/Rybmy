import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:2115/'; // URL backendu

  constructor(private http: HttpClient) { }

  getFishByID(id: number): Observable<any> { //pobieranie ryb po ID
    return this.http.get<any>(`${this.apiUrl + "fishes"}/${id}`);
  }
}
