import { Component, Output, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';
import { ShopService } from './shop-service';
import { itemState } from '../ShopItems/item';

type equipmentType = "wedka" | "kolowrotek" | "zylka";
const equipmentTypeArray : equipmentType[] = ["wedka", "kolowrotek", "zylka"];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent{
  _service = inject(ShopService);
  items : Map<equipmentType, Array<BaseItem>> = new Map<equipmentType, Array<BaseItem>>();

  ngOnInit(){
    
  }
}
