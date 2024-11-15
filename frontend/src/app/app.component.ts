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
  ngOnInit(){
    const server = 'http://localhost:3000/'
    let id: number | null = null
    
    //pobiera tablicy z rybami i wypisuje ich nazwy
    this.http.get<Array<Fish>/*wpisjes jakiego typu będzie pobierana wartość z servera */>(server+'fishes'/*ścieżka do servera*/).subscribe(e => {
      e.forEach(row => {  
        console.log(row.nazwa); //jest wysylana jako json więc możesz z każdego wiersz wybrać wartość przypisaną do 'nazwa'
        
      })
    })





    //logowanie
    let login = 'kacper', password = 'aaaa'
    this.http.get<{id: number}|null>(server+'api/get/login?login='+login+'&password='+password)
      .subscribe(e => {
        if (e!==null) {
          id = e.id
          console.log(e.id);
          console.log("logowanie udalo sie");

          //pobiera i wyświetla znajomych
          this.http.get<Array<Player>|null>(server+'znajomi?id='+id)
            .subscribe(e => {
              if(e===null)  console.log("nie masz znajomych");
              else{
                e.forEach(friend => {
                  console.log(friend);
                })
              }
            })

        }else console.log("logowanie nie udalo sie");
    })
    
    //   fetch(server+'login?login='+login+'&password='+password)
    //   .then(result => console.log(result))
    

    
  
    
    // fetch(server+'znajomi?id='+id)
    //   .then(response => response.json())
    //   .then(friends => friends.array.forEach((name: any) => {
    //     console.log(name);
        
    //   }))
      
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