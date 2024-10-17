import { Item } from "./item";

export class BaseItem extends Item{
    private durability : number;
    constructor(name : string, value : number, durability : number){
        super(name, value);
        this.durability = durability;
    }
    public getDurability() : number{
        return this.durability;
    }
}