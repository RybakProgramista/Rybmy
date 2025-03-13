import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { httpOptions, Znajomy } from '../app.component';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { 
    
  }

  /**
   * Funkcja zwracająca kurwa nie wiem co to nawet jest
   * @param idGracz - gówno
   * @returns 
   */
  getFriends(): Observable <any> {
    return this.http.get<Znajomy[]>((this.apiUrl+"api/znajomi"), httpOptions);
  }
}
