import { Item, itemState } from "./item";

export class BaseItem extends Item{
    

    constructor(list: any){
        let name: string = list["nazwa"]
        let currState: itemState = list["isOwned"]
        let value: number = list["cena"]
        super(name, value ?? -1, currState);
    }





}