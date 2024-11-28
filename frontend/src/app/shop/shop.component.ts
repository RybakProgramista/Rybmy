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

  currIds : Map<equipmentType, number> = new Map([
    ["wedka", 1],
    ["kolowrotek", 1],
    ["zylka", 1]
  ])
  currItems : Map<equipmentType, Item> = new Map([
    ["wedka", new BaseItem("", 0, 0, "NotBought", "")],
    ["kolowrotek", new BaseItem("", 0, 0, "")],
    ["zylka", new BaseItem("", 0, 0, "")]
  ])
  loadedEquipment : equipmentType[] = []

  @Output() equipItemEvent = new EventEmitter<number>();
  useItem(type : equipmentType) : void{
    if(this.checkItemState(type) == "EQUIP"){
      let durability = 0;
      for(let i = 0; i < 3; i++){
        durability += (this.currItems.get(equipmentTypeArray[i]) as BaseItem).getDurability();
      }
      this.equipItemEvent.emit(durability);
    }
    else if(this.checkItemState(type) == "BUY"){
      this._service.buyItem(type.toString(), this.currIds.get(type) ?? 0).subscribe(
        canBuy =>{
          if(canBuy == null){
            console.error("Wyjebało kupowanie");
            return;
          }
          if(canBuy){
            this.currItems.get(type)?.changeCurrState("Bought");
          }
        }
      )
    }
  }

  checkItemState(type : equipmentType) : string{
    switch(this.currItems.get(type)?.getState()){
      case "Bought" :
        return "EQUIP";
      case "NotBought":
        return "BUY";
      case "Equipped":
        return "Equipped";
      default:
        return "Dolbajob";
    }
  }

  changeItem(type : equipmentType, val : number){
    this.currIds.set(type, (this.currIds.get(type) ?? 0) + val);
    this.demandItem(type);
    this._service.getItem(type.toString(), this.currIds.get(type) ?? 0).subscribe(
      e => {
        this.currItems.set(type, new BaseItem(e.nazwa, e.wytrzymalosc, e.status , e.cena, ""));
      }
    )
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
