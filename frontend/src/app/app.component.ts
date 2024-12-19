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
  @HostBinding("class.loged") get isLogged() { return !this.isLoggedIn; }
  isLoggedIn : boolean = false;
  constructor(private dataService: DataService){}
  ngOnInit(){
    const server = 'http://localhost:3000/'
    // this.dataService.getFishByID(0).subscribe(fish => console.log(fish));
    //getting fishes
    fetch(server+'fishes')
      .then(response => response.json())
      .then(fishes => console.log(fishes))

    //login, if successfully it gives u id
    let login = 'ja', password = 'ja'
    fetch(server+'login/'+login+'.'+password)
      .then(response => response.json())
      .then(fishes => console.log(fishes))
  }

  tryLogginIn(){
    let id = 1; //wstaw tu returna od twojego logowania, jako login masz zmienną this.playerLogin, a jako hasło masz this.playerPassword
    if(id == -1){
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