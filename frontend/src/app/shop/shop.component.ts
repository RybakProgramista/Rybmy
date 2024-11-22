import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';

type equipmentType = "Wedka" | "Kolowrotek" | "Zylka";
const equipmentTypeArray : equipmentType[] = ["Wedka", "Kolowrotek", "Zylka"];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent{
  currIds : Map<equipmentType, number> = new Map([
    ["Wedka", 0],
    ["Kolowrotek", 0],
    ["Zylka", 0]
  ])
  currItems : Map<equipmentType, Item> = new Map([
    ["Wedka", new BaseItem("", 0, 0, "")],
    ["Kolowrotek", new BaseItem("", 0, 0, "")],
    ["Zylka", new BaseItem("", 0, 0, "")]
  ])
  loadedEquipment : equipmentType[] = []

  //returned item
  @Input() returnedItem : string[] = [];

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

  changeItem(type : equipmentType, val : number){
    this.currIds.set(type, (this.currIds.get(type) ?? 0) + val);
    this.demandItem(type);
    console.log(this.returnedItem[0]);
    this.currItems.set(type, new BaseItem(this.returnedItem[1], parseInt(this.returnedItem[2]), parseInt(this.returnedItem[3]), ""));
  }

  getItemName(type : equipmentType): string{
    return this.currItems.get(type)?.getName() ?? "ZJEBAŁO SIĘ";
  }

  ngOnInit(){
    equipmentTypeArray.forEach(type => {
      this.changeItem(type, 0);
    });
  }
}
