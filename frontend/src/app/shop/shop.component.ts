import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { Item } from '../ShopItems/item';
import { ShopService } from './shop-service';

type equipmentType = 'wedka' | 'kolowrotek' | 'zylka';
const equipmentTypeArray: equipmentType[] = ['wedka', 'kolowrotek', 'zylka'];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent {
  _service = inject(ShopService);
  _playerID : number = -1;
  items : Map<equipmentType, Array<Item>> = new Map<equipmentType, Array<Item>>();
  currIds: Map<equipmentType, number> = new Map([
    ["wedka", 0],
    ["kolowrotek", 0],
    ["zylka", 0]
  ]);
  @Output() sendID = new EventEmitter<number>();
  constructor(){
    this.sendID.subscribe(id => {
      this._playerID = id;
      this.initialize();
    })
  }

  initialize(){
    for(let a : number = 0; a < equipmentTypeArray.length; a++){
      this.items.set(equipmentTypeArray[a], this._service.getList(equipmentTypeArray[a], this._playerID));
      console.log(this.items.get(equipmentTypeArray[a]));
  }
  }

  changeCurrItem(type : equipmentType, val : number){
    let newId  = (this.currIds.get(type) ?? 0) + val;
    if(newId < 0) newId = (this.items.get(type)?.length ?? 0) - 1;
    else if (newId > (this.items.get(type)?.length ?? 0) - 1) newId = 0;
    this.currIds.set(type, newId);
  }

  private getCurrItem(type : equipmentType) : Item{
    return this.items.get(type)?.at(this.currIds.get(type) ?? -1) ?? new Item(null);
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
        console.log(this._service.buyItem(this.currIds.get(type) ?? -1, type, this._playerID))
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
