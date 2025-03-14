import { Component, HostBinding, inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { ShopComponent } from './shop/shop.component';
import { LineComponent } from './line/line.component';
import { DataService } from './Client Handler/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ShopService } from './shop/shop-service';
import { FriendsMenuComponent } from './friends-menu/friends-menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MainSceneComponent,
    LineComponent,
    ShopComponent,
    FriendsMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //COOKIE
  // cookieValue?: string;
  // objectCookieValue?: object;
  // hasCookieTrue!: boolean;
  // hasCookieFalse!: boolean;

  // private key = 'myCookie';
  // private objectKey = 'myObjectCookie';

  // constructor(private cookieService: CookieService) {}

  // setCookies(): void {
  //   this.cookieService.set("accessToken", 'myValue');
  //   // this.cookieService.putObject(this.objectKey, {myKey: 'myValue'});
  // }

  // getCookies(): void {
  //   this.cookieValue = this.cookieService.get(this.key);
  //   // this.objectCookieValue = this.cookieService.getObject(this.objectKey);
  //   // this.hasCookieTrue = this.cookieService.hasKey(this.key) && this.cookieService.hasKey(this.objectKey);
  //   // this.hasCookieFalse = this.cookieService.hasKey('nonExistentKey');
  // }




  //SERWER
  headers = new HttpHeaders();
  _http = inject(HttpClient)
  // options = new RequestOptions({ headers: this.headers, withCredentials: true });

  @ViewChild(ShopComponent) shop! : ShopComponent;
  @ViewChild(FriendsMenuComponent) friends! : FriendsMenuComponent;
  _id : number = -1;
  server : string = 'http://localhost:3000/'
  isLoggedIn : boolean = false;

  constructor(private dataService: DataService, httpClient: HttpClient) {}

  ngOnInit() {
    this.tryLogginIn("", "")
  }
  /**
   * Dokonuje próby zalogowania się przez gracza 
   * @param playerLogin - login gracza
   * @param playerPassword - hasło gracza
   */
  async tryLogginIn(playerLogin : string, playerPassword : string) {
    await this._http.get<number>(this.server +
      'api/login?login=' +
      playerLogin +
      '&password=' +
      playerPassword, httpOptions).subscribe(
        async (id: number) => {
          this._id = id
          await this._id
          if (this._id == -1) {
            //niezalogowano
            console.log(111);
            
          } else {
            console.log(2222);
            //zalogowano
            this.isLoggedIn = true;
            this.shop.initialize();
            this.friends.loadFriends();
          }
        }
      )

    // await fetch(
    //   this.server +
    //     'api/login?login=' +
    //     playerLogin +
    //     '&password=' +
    //     playerPassword
    // )
    //   .then((response) => response.json())
    //   .then((id) => (this.id = id));
    // await console.log(this.id + '');
  }

  //Reszta
  maxDurability: number = 0;
  currDurabilityPercent: number = 0;
  maxDurabilityChanged(newVal: number) {
    this.maxDurability = newVal;
  }
  changeCurrDurability(newVal: number) {
    this.currDurabilityPercent = newVal;
  }
}

interface Player {
  id: number;
  nazwa: string;
  doswiadczenie: number;
}

export interface Znajomy {
  nazwa: string;
}

interface Fish {
  id: number;
  nazwa: string;
  obrazek: string;
  minKg: number;
  maxKg: number;
  minWymiar: number;
  maxWymiar: number;
  cena: number;
  doswiadczenie: number;
  wystepowanie: string;
  opis: string;
}

export let headers = new HttpHeaders();

export interface Equip {
  id: number;
  nazwa: string;
  wytrzymalosc: number;
  cena: number;
}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true 
};