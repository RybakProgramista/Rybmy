import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FriendsService {
  private apiUrl = 'http://localhost:2115/';

  constructor(private http: HttpClient) { }

  getFriends(idGracz: number): Observable <any> {
    
    const mockFriends = [
      { id: '2', name: 'aaf'},
      { id: '3', name: 'debil'},
    ];
    
    return of (mockFriends);
    //this.http.get(`${this.apiUrl}/${idGracz}`);
  }
}
