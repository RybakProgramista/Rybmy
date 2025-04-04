import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { httpOptions } from '../app.component';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
@Injectable({
  providedIn: 'root',
})
export class MainSceneService{
  _http = inject(HttpClient)
  server = 'http://localhost:3000/'
  headers = new HttpHeaders();
    

  async catchFish(wytrzymalosc : number) {
      let res = firstValueFrom(await this._http.get<any>(this.server+"api/catchedFish?wytrzymalosc=" + wytrzymalosc + "&wystepowanie=" + "Odra" , httpOptions))
      console.log(res);
      
      return res;
  }
}