import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  inject,
  OnChanges,
  SimpleChanges
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
  _playerID! : number;
  items : Map<equipmentType, Array<Item>> = new Map<equipmentType, Array<Item>>();
  equipedItems : Map<equipmentType, Item> = new Map<equipmentType, Item>();
  currIds: Map<equipmentType, number> = new Map([
    ["wedka", 0],
    ["kolowrotek", 0],
    ["zylka", 0]
  ]);
  /**
   * Inicjalizuje zawartość sklepu, po zalogowaniu się przez gracza
   */
  initialize() : number{
    for(let a : number = 0; a < equipmentTypeArray.length; a++){
      this.items.set(equipmentTypeArray[a], this._service.getList(equipmentTypeArray[a]));
      console.log(this.items.get(equipmentTypeArray[a]));
    }
    return 0;
  }
  /**
   * Zmienia wyświetlany obecnie przez gracza przedmiot po interakcji gracza
   * @param type - typ przedmiotu, który zostaje zmieniony
   * @param val  - wartość (-1 albo 1) o ile ma się zmienić ID obecnie wyświetlanego przedmiotu
   */
  changeCurrItem(type : equipmentType, val : number){
    let newId  = (this.currIds.get(type) ?? 0) + val;
    if(newId < 0) newId = (this.items.get(type)?.length ?? 0) - 1;
    else if (newId > (this.items.get(type)?.length ?? 0) - 1) newId = 0;
    this.currIds.set(type, newId);
  }
  /**
   * Pobiera obecnie wyświetlany przedmiot
   * @param type - typ przedmiotu, który ma zostać podany
   * @returns - zwraca obiekt typu Item
   */
  private getCurrItem(type : equipmentType) : Item{
    return this.items.get(type)?.at(this.currIds.get(type) ?? -1) ?? new Item(null);
  }
  /**
   * Pobiera nazwę obecnie wyświetlanego przedmiotu
   * @param type - typ przedmiotu, którego nazwa ma zostać pobrana
   * @returns - zwraca zmienną typu string
   */
  getItemName(type : equipmentType) : string{
    return this.getCurrItem(type).getName();
  }
  /**
   * Pobiera stan obecnie wyświetlanego przedmiotu 
   * @param type - typ przedmiotu, którego stan ma zostać pobrany
   * @returns - zwraca zmienną typu string
   */
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
  /**
   * Wykonuje akcję związaną z obecnie wyświetlanym przedmiotem, odpowiednią jej stanowi (np jeśli przedmiot jest nie kupiony, to go kupuje)
   * @param type - typ przedmiotu, z którym ma zostać wykonana akcja
   */
  useItem(type : equipmentType){
    let target : Item = this.getCurrItem(type);
    switch (target.getState()){
      case "NotBought":
        console.log(this._service.buyItem(this.currIds.get(type) ?? -1, type, this._playerID))
        break;
      case "Bought":
        this.equipedItems.set(type, target);
        break;
      case "Equipped":
        //UNEQUIP
        break;
      default:
        //ERROR
        break;
    }
  }
  //output dla wytrzymalosc, do app.component
  @Output() durabilityChanged = new EventEmitter<number>;
  /**
   * Oblicza wytrzymałość sprzętu gracza, którą następnie emituje do app.component
   */
  calculateDurability() : void{
    let out : number = 0;
    for(let a : number = 0; a < equipmentTypeArray.length; a++){
      out += (this.equipedItems.get(equipmentTypeArray[a]) ?? new Item(null)).getDurability();
    }
    this.durabilityChanged.emit(out);
  }
}
