import { HttpClient } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"

import { Equip } from '../app.component';

@Injectable({
    providedIn: 'root',
})
export class ShopService{
    _http = inject(HttpClient);
    _server = 'http://localhost:3000/';

    
}