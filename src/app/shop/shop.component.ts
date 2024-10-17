import { Component, OnInit } from '@angular/core';
import { Item } from '../ShopItems/item';
import { BaseItem } from '../ShopItems/baseItem';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  currIds : Array<number> = [0, 0, 0, 0, 0];

  cash : number;

  itemList : Array<Array<Item>> = [
    new Array<Item>(
      new BaseItem("Bambus", 0, 50),
      new BaseItem("Zaffirka", 20, 80)
    ),
  ];

  ngOnInit() : void{
    this.currItemId = 0;
    this.cash = 0;
  }

  checkItemState(type : number) : string{
    return this.itemList[type][this.currIds[type]].getIsBought();
  }

  changeItem(type : number, val : number) : void{

  }
}
