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


    public getList(type: String, id: number) : Array<BaseItem>{
        let res = this._http.get<Array<BaseItem>>(this.server+"api/equip?playerId=" + id + "&type=" + type)
        res.subscribe(
            e => {return(e)})
        return new Array<BaseItem>();
    }
    

    
    
    // Array<BaseItem>
    
}