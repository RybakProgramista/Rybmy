import { Component, OnInit, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { ShopComponent } from './shop/shop.component';
import { LineComponent } from './line/line.component';
import { DataService } from './Client Handler/data.service';
import { FormsModule } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainSceneComponent, LineComponent, ShopComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{  //SERWER
  playerLogin : string = "";
  playerPassword : string = "";
  id : number = -1;
  server : string = 'http://localhost:3000/'
  @HostBinding("class.loged") get isLogged() { return !this.isLoggedIn; }
  isLoggedIn : boolean = false;
  constructor(private dataService: DataService){}
  ngOnInit(){}

  tryLogginIn(){
    fetch(this.server+'api/login?login='+this.playerLogin+'&password='+this.playerPassword)
    .then(response => response.json())
    .then(id => this.id = id)
    console.log(this.id + "");
    if(this.id == -1){
      //niezalogowano
    }
    else{
      //zalogowano
      this.isLoggedIn = true;
      console.log(this.playerLogin);
    }
  }


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
  status : number
  cena: number
}