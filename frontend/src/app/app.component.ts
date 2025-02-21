import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { ShopComponent } from './shop/shop.component';
import { LineComponent } from './line/line.component';
import { DataService } from './Client Handler/data.service';
import { HttpClient } from '@angular/common/http';
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

  id : number = -1;
  server : string = 'http://localhost:3000/'
  isLoggedIn : boolean = false;

  constructor(private dataService: DataService, httpClient: HttpClient) {}

  ngOnInit() {}

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
      .then((id) => (this.id = id));
    console.log(this.id + '');
    if (this.id == -1) {
      //niezalogowano
    } else {
      //zalogowano
      this.isLoggedIn = true;
      console.log(playerLogin);
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
