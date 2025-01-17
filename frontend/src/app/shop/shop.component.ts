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
  items : Map<equipmentType, Array<Item>> = new Map<equipmentType, Array<Item>>();
  currIds: Map<equipmentType, number> = new Map([
    ["wedka", 0],
    ["kolowrotek", 0],
    ["zylka", 0]
  ]);
  ngOnInit(){
    for(let a : number = 0; a <= equipmentTypeArray.length; a++){
      this.items.set(equipmentTypeArray[a], this._service.getList(equipmentTypeArray[a], 1));
    }
    console.log(this.items);
  }
  
  changeCurrItem(type : equipmentType, val : number){
    this.currIds.set(type, this.currIds.get(type) ?? 0 + val);
  }

  private getCurrItem(type : equipmentType) : Item{
    return (this.items.get(type) ?? new Array<Item>)[this.currIds.get(type) ?? 0] ?? new BaseItem("chuj", 0, "Equipped");
  }
  getItemName(type : equipmentType) : string{
    return this.getCurrItem(type).getName();
  }
  getItemState(type : equipmentType) : string{
    let target : Item = this.getCurrItem(type);
    switch (target.getState()){
      case "NotBought":
        return target.getVal() + "ZŁ";
      case "Bought":
        return "EQUIP";
      case "Equipped":
        return "UNEQUIP";
      default:
        return "Powieś się";
    }
  }
  useItem(type : equipmentType){
    let target : Item = this.getCurrItem(type);
    switch (target.getState()){
      case "NotBought":
        //BUY
        break;
      case "Bought":
        //EQUIP
        break;
      case "Equipped":
        //UNEQUIP
        break;
      default:
        //ERROR
        break;
    }
  }
}
