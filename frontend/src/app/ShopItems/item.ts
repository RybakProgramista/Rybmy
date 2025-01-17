export type itemState = "Equipped" | "NotBought" | "Bought";

export abstract class Item{

    private name : string;
    private value : number;
    private currState : itemState;

    constructor(name : string, price : number, currState : itemState){
        this.name = name;
        this.value = price;
        this.currState = currState

    }
    public changeCurrState(newState : itemState) : void{
        this.currState = newState;
    }
    public getName() : string{
        return this.name;
    }
    public getVal() : number{
        return this.value;
    }
    public getState() : itemState{
        return this.currState;
    }

}