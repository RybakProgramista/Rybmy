import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { ShopComponent } from './shop/shop.component';
import { LineComponent } from './line/line.component';
import { DataService } from './Client Handler/data.service';
import { FriendsComponent } from './Friends/Friends.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainSceneComponent, LineComponent, ShopComponent, FriendsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{

  //SERWER
  constructor(private dataService: DataService){}
  ngOnInit(){
    this.dataService.getFishByID(0).subscribe(fish => console.log(fish));
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