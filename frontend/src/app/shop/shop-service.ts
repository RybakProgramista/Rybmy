import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

import { Equip } from '../app.component';

@Injectable({
    providedIn: 'root',
})
export class ShopService{
    _http = inject(HttpClient);
    _server = 'https://localhost:3000/';

    getItem(type : string, id : number){
        return this._http.get<Equip>(this._server+"api/get/equip?id=" + id + "&type=" + type);
    }
}