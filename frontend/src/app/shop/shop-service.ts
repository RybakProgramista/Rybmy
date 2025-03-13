import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Equip, httpOptions } from '../app.component';
import { Item } from "../ShopItems/item";
@Injectable({
  providedIn: 'root',
})
export class ShopService{
    _http = inject(HttpClient)
    server = 'http://localhost:3000/'
    // result: Array<BaseItem> = []

    // res = this._http.get<BaseItem>(this.server+"api/equip?playerId=" + 1 + "&type=" + "wedka").subscribe(
    //     e => {console.log(e)})
    // b = this.getList("wedka",1)
    
    headers = new HttpHeaders();
  
    /**
     * Pobiera listę WSZYSTKICH przedmiotów z serwera
     * @param type - typ przedmiotów, które mają zostać pobrane
     * @param id - id gracza
     * @returns zwraca listę obiektów typu item
     */
    getList(type: String, id: number): Array<Item>{
        let result: Array<Item>
        let res = this._http.get<Array<Item>>(this.server+"api/equip?playerId=" + id + "&type=" + "wedka", httpOptions)
        res.subscribe(
            (e : any) => {
                // /*this.result = e*/ console.log(e[0])
                if(e.code == "ER_EMPTY_QUERY"){
                    alert("błąd z bazą danych " + type);
                }
                else{
                    (e as Array<any>).forEach(element => {
                        result.push(new Item(element))
                    })
                }
                return result
            })
        // return this.result
        result = []
        return result
    }
    /**
     * Dokonuje zakupu przedmiotu
     * @param itemID - id przedmiotu, który ma zostać kupiony
     * @param itemType - typ przedmiotu, który ma zostać kupiony
     * @param playerID - id gracza, który kupuje przedmiot
     * @returns - zwraca zmienną boolean, odpowiadającą temu, czy dany przedmiot udało się zakupić
     */
    buyItem(itemID : number, itemType : String, playerID : number) : boolean{
        let res: boolean = false
        this._http.get<Boolean>(this.server+"api/possibilityToBuy?id=" + itemID + "&type=" + itemType + "&playerId=" + playerID).subscribe(
            (e : any) =>{
                res =  e==1;
            }
        )
        return res;
    }
}