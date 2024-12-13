import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { ShopComponent } from './shop/shop.component';
import { LineComponent } from './line/line.component';
import { DataService } from './Client Handler/data.service';
import { FriendsComponent } from './Friends/Friends.component';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainSceneComponent, LineComponent, ShopComponent, FriendsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{

  //SERWER
  constructor(private dataService: DataService, private http: HttpClient){}
  server = 'http://localhost:3000/'

  //Reszta
  maxDurability : number = 0;
  currDurabilityPercent : number = 0;
  maxDurabilityChanged(newVal : number){
    this.maxDurability = newVal;
  }
  changeCurrDurability(newVal : number){
    this.currDurabilityPercent = newVal;
  }
}


interface Player {
  id: number
  nazwa: string
  doswiadczenie: number
}

export interface Znajomy{
  id: number
  nazwa: string
}

interface Fish {
  id: number;
  nazwa: string
  obrazek: string
  minKg: number
  maxKg:  number
  minWymiar: number
  maxWymiar: number
  cena: number
  doswiadczenie: number
  wystepowanie: string
  opis: string
}

export interface Equip {
  id: number
  nazwa: string
  wytrzymalosc: number
  cena: number
}