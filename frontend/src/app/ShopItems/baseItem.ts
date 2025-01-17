import { Item, itemState } from "./item";

export class BaseItem extends Item{
    constructor(name : string, value : number, currState : itemState){
        super(name, value ?? -1, currState);
    }






}