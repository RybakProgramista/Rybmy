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
  loadedEquipment : equipmentType[] = []

  //returned item
  @Input() returnedItem : String[] = [];

  //asking for item at current id of demanded type
  @Output() demandItemEvent = new EventEmitter<string>();
  demandItem(type : equipmentType, id? : number) : void{
    this.demandItemEvent.emit(type.toString() +  " | " + (id != null ? id : this.currIds.get(type)));
  }

}
