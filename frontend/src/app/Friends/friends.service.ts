import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Znajomy } from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getFriends(idGracz: number): Observable <any> {
    return this.http.get<Znajomy>((this.apiUrl+"api/get/znajomi?id=" + idGracz));
  }
}
