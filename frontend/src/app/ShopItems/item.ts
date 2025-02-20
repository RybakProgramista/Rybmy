export type itemState = "Equipped" | "NotBought" | "Bought";

export class Item{

    private name : string;
    private value : number;
    private currState : itemState;

    constructor(list : any){
        this.name = (list ? list["nazwa"] : "nazwa");
        this.value = (list ? list["cena"] : -1);
        this.currState = (list ? list["isOwned"] : "NotBought");
        if(this.value < 0){
            //console.error("Item cannot be worth less than 0 you dumb fuck");
        }
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