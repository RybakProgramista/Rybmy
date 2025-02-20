import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

import { Equip } from '../app.component';
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

    getList(type: String, id: number): Array<Item>{
        let result: Array<Item>
        let res = this._http.get<Array<Item>>(this.server+"api/equip?playerId=" + id + "&type=" + type)
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
    

    
    
    // Array<BaseItem>
    
}