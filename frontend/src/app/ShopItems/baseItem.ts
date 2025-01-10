import { Item, itemState } from "./item";

export class BaseItem extends Item{
    private durability : number;
    constructor(name : string, durability : number, value : number, currState : itemState, imageURL : string){
        super(name, value ?? -1, currState, imageURL);
        this.durability = durability;
        if(this.durability <= -1){
            console.error("Item cannot have durability less than 0 you dumb fuck")
        }
    }
    public getDurability() : number{
        return this.durability;
    }
}