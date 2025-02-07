import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

import { Equip } from '../app.component';
import { BaseItem } from "../ShopItems/baseItem";

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

    getList(type: String, id: number): Array<BaseItem>{
        let result: Array<BaseItem>
        let res = this._http.get<Array<BaseItem>>(this.server+"api/equip?playerId=" + id + "&type=" + type)
        res.subscribe(
            e => {
                // /*this.result = e*/ console.log(e[0])
                e.forEach(element => {
                    result.push(new BaseItem(element))
                })
                console.log(result);
                
                return result
            })
        // return this.result
        result = []
        return result
    }
    

    
    
    // Array<BaseItem>
    
}