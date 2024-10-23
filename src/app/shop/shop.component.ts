import { Component, Output, EventEmitter, numberAttribute } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';

type typEkwipunku = "Wędka" | "Kołowrotek" | "Żyłka";
const equipmentTypeArray : typEkwipunku[] = ["Wędka", "Kołowrotek", "Żyłka"];

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent{
  currIds: Map<typEkwipunku, number> = new Map(
    [
      ["Wędka", 0],
      // ["Kołowrotek", 0],
      // ["Żyłka", 0]
    ]
  )

  cash : number = 0;

  itemList : Map<typEkwipunku, Array<Item>> = new Map(
    [
      ["Wędka", new Array<BaseItem>(
        new BaseItem("Bambus", 50, 0),
        new BaseItem("Zafirrka", 80, 20)
      )]
    ]
  );
  @Output() onDurabilityChanged = new EventEmitter<number>();
  calculateMaxDurability() : void{
    let outVal : number = 0;

    for(let x = 0; x < this.currIds.size ; x++){
      console.log(this.getItemOfTypeAtID(equipmentTypeArray[x]) as BaseItem);
      outVal += (this.getItemOfTypeAtID(equipmentTypeArray[x]) as BaseItem).getDurability();
    }
    
    this.onDurabilityChanged.emit(outVal);
  }
  checkItemState(type : typEkwipunku) : string{
    let returnVal : string;
    let temp = this.getItemOfTypeAtID(type);

    if(temp.getIsBought()){
      if(temp.getIsEquipped()){
        returnVal = "EQUIPPED";
      }
      else{
        returnVal = "EQUIP";
      }
    }
    else{
      returnVal = temp.getVal() + "zł"; 
    }

    return returnVal;
  }

  changeItem(type : typEkwipunku, val : number) : void{
    let newID = (this.currIds.get(type) ?? 0) + val;
    console.log(newID);
    if(newID >= (this.itemList.get(type)?.length ?? 0)){
      newID = 0;
    }
    else if(newID < 0){
      newID = (this.itemList.get(type)?.length ?? 0) - 1;
    }
    this.currIds.set(type, newID);
    console.log(newID);
  }

  getItemOfTypeAtID(type : typEkwipunku, id? : number) : Item{ //jeśli puste to pobiera obecnie wybrany
    let itemListForType = this.itemList.get(type) ?? [];
    let currIdForType =  id ?? this.currIds.get(type) ?? 0;

    return itemListForType[currIdForType];
  }

  useItem(type : typEkwipunku) : void{
    let temp = this.checkItemState(type);
    let currItem = this.getItemOfTypeAtID(type);
    if(temp == "EQUIP"){
      currItem.changeIsEquipped(true);
      this.calculateMaxDurability();
    }
    else if(temp.endsWith("zł") && this.cash >= Number.parseInt(temp.substring(0, temp.length - 2))){
      currItem.buy();
      this.cash -= currItem.getVal();
    }
  }
}
