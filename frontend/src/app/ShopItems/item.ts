export type itemState = "Equipped" | "Bought" | "NotBought";

export abstract class Item{

    private name : string;
    private value : number;
    private currState : itemState;
    private imageURL : string;

    constructor(name : string, value : number, currState : itemState, imageURL : string){
        this.name = name;
        this.value = value;
        this.currState = currState;
        if(this.value < 0){
            console.error("Item cannot be worth less than 0 you dumb fuck");
        }
        this.imageURL = imageURL;
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
    public getImageURL() : string{
        return this.imageURL;
    }

}