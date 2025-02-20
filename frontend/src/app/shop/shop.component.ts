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
  items : Map<equipmentType, Array<Item>> = new Map<equipmentType, Array<Item>>();
  currIds: Map<equipmentType, number> = new Map([
    ["wedka", 0],
    ["kolowrotek", 0],
    ["zylka", 0]
  ]);
  ngOnInit(){
    for(let a : number = 0; a < equipmentTypeArray.length; a++){
        this.items.set(equipmentTypeArray[a], this._service.getList(equipmentTypeArray[a], 1));
        console.log(this.items.get(equipmentTypeArray[a]));
    }
  }
  
  changeCurrItem(type : equipmentType, val : number){
    let newId  = (this.currIds.get(type) ?? 0) + val;
    if(newId < 0) newId = (this.items.get(type)?.length ?? 0) - 1;
    else if (newId > (this.items.get(type)?.length ?? 0) - 1) newId = 0;
    this.currIds.set(type, newId);
  }
  checkItemState(type: equipmentType): string {
    switch (this.currItems.get(type)?.getState()) {
      case 'Bought':
        return 'EQUIP';
      case 'NotBought':
        return 'BUY';
      case 'Equipped':
        return 'Equipped';
      default:
        return 'Dolbajob';
    }
  }

  changeItem(type: equipmentType, val: number) {
    this.currIds.set(type, (this.currIds.get(type) ?? 0) + val);
    // this.demandItem(type);
    this._service.getItem(type.toString(), this.currIds.get(type) ?? 0);
    // .subscribe((e) => {
    //   this.currItems.set(
    //     type,
    //     new BaseItem(e.nazwa, e.wytrzymalosc, e.status, e.cena, '')
    //   );
    // });
  }
  getItemName(type: equipmentType): string {
    return this.currItems.get(type)?.getName() ?? 'ZJEBAŁO SIĘ';
  }

  ngOnInit() {
    equipmentTypeArray.forEach((type) => {
      this.changeItem(type, 0);
    });
  }
}
