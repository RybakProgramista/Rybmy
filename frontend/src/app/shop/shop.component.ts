import { Component, Output, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';
import { ShopService } from './shop-service';

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
    ["wedka", new BaseItem("", 0, 0, "")],
    ["kolowrotek", new BaseItem("", 0, 0, "")],
    ["zylka", new BaseItem("", 0, 0, "")]
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
    this._service.getItem(type.toString(), this.currIds.get(type) ?? 0).subscribe(
      e => {
        this.currItems.set(type, new BaseItem(e.nazwa, e.wytrzymalosc, e.cena, ""));

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
