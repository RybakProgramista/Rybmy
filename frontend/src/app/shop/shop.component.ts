import { Component, Output, EventEmitter, numberAttribute, Input } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';

type equipmentType = "Wędka" | "Kołowrotek" | "Żyłka";
const equipmentTypeArray : equipmentType[] = ["Wędka", "Kołowrotek", "Żyłka"];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent{
  currIds : Map<equipmentType, number> = new Map([
    ["Wędka", 0],
    ["Kołowrotek", 0],
    ["Żyłka", 0]
  ])
  currItems : Map<equipmentType, Item> = new Map([
    ["Wędka", new BaseItem("", 0, 0, "")],
    ["Kołowrotek", new BaseItem("", 0, 0, "")],
    ["Żyłka", new BaseItem("", 0, 0, "")]
  ])
  loadedEquipment : equipmentType[] = []

  //returned item
  @Input() returnedItem : String[] = [];

  //asking for item at current id of demanded type
  @Output() demandItemEvent = new EventEmitter<string>();
  demandItem(type : equipmentType, id? : number) : void{
    this.demandItemEvent.emit(type.toString() +  "-|-" + (id != null ? id : this.currIds.get(type)));
  }

  @Output() buyItemEvent = new EventEmitter<string>();
  useItem(type : equipmentType) : void{
    if(this.checkItemState(type) == "EQUIP"){
      //ekwipowanie
    }
    else if(this.checkItemState(type) == "BUY"){
      this.buyItemEvent.emit(type.toString() + "-|-" + this.currIds.get(type));
    }
  }

  checkItemState(type : equipmentType) : string{
    if(this.currItems.get(type)?.getIsBought()){
      if(this.currItems.get(type)?.getIsEquipped()){
        return "EQUIPPED";
      }
      else{
        return "EQUIP";
      }
    }
    else{
      return "BUY";
    }
  }

  getItemName(type : equipmentType): string{
    return this.currItems.get(type)?.getName() ?? "ZJEBAŁO SIĘ";
  }
}
