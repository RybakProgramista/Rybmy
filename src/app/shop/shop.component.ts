import { Component, Output, EventEmitter, numberAttribute } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';
type typEkwipunku = "Wędka" | "Kołowrotek";
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
      ["Wędka", 0]
    ]
  )

  cash : number = 0;

  itemList : Map<typEkwipunku, Array<Item>> = new Map(
    [
      ["Wędka", new Array<Item>(
        new BaseItem("Bambus", 0, 50),
      )]
    ]
  );
  @Output() onDurabilityChanged = new EventEmitter<number>();
  calculateMaxDurability() : void{
    let outVal : number = 0;

    for(let type = 0; type <= 2; type++){
      for(let id = 0; id <= this.itemList[type].length; id++){
        if(this.itemList[type][id].getIsEquipped()){
          outVal += (this.itemList[type][id] as BaseItem).getDurability();
        }
      }
    }
    
    this.onDurabilityChanged.emit(outVal);
  }
  checkItemState(type : typEkwipunku) : string{
    let returnVal : string;
    let temp = this.itemList.get(type)[this.currIds.get(type)];

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
    this.currIds.set(type, this.currIds.get(type) ?? 0 + val);
  }

  getCurrItemOfType(type : typEkwipunku) : Item{
    return this.itemList[type ?? 0][this.currIds[type]];
  }

  useItem(type : typEkwipunku) : void{
    let temp = this.checkItemState(type);
    let currItem = this.getCurrItemOfType(type);
    if(temp == "EQUIP"){
      currItem.changeIsEquipped(true);
    }
    else if(temp.endsWith("zł") && this.cash >= Number.parseInt(temp.substring(0, temp.length - 2))){
      currItem.buy();
      this.cash -= currItem.getVal();
    }
    this.calculateMaxDurability();
  }
}
