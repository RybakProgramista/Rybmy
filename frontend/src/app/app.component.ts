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
    RouterOutlet,
    MainSceneComponent,
    LineComponent,
    ShopComponent,
    FriendsMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  //SERWER
  a = new ShopService()
  b = this.a.getList("wedka",1)
  //Co z tym u góry zrobić?

  @ViewChild(ShopComponent) shop! : ShopComponent;
  _id : number = -1;
  server : string = 'http://localhost:3000/'
  isLoggedIn : boolean = false;

  constructor(private dataService: DataService, httpClient: HttpClient) {}

  ngOnInit() {}
  /**
   * Dokonuje próby zalogowania się przez gracza 
   * @param playerLogin - login gracza
   * @param playerPassword - hasło gracza
   */
  tryLogginIn(playerLogin : string, playerPassword : string) {
    console.log(playerLogin + " " + playerPassword)
    fetch(
      this.server +
        'api/login?login=' +
        playerLogin +
        '&password=' +
        playerPassword
    )
      .then((response) => response.json())
      .then((id) => (this._id = id));
    console.log(this._id + '');
    if (this._id == -1) {
      //niezalogowano
    } else {
      //zalogowano
      this.isLoggedIn = true;
      this.shop.sendID.emit(this._id);
    }
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
  id: number;
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