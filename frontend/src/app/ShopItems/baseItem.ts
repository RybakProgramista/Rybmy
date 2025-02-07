import { Item, itemState } from "./item";

export class BaseItem extends Item{
    

    constructor(list: any){
        let name: string// = list["nazwa"]
        let currState: itemState// = list["isOwned"]
        let value: number// = list["cena"]

        if(list){
            name = list["nazwa"]
            currState = list["isOwned"]
            value = list["cena"]
        }
        else{
            name = "";
            currState = "NotBought";
            value = 0;
        }
        super(name, value ?? -1, currState);
    }
}