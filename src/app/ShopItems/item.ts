export abstract class Item{

    private name : string;
    private value : number;
    private isBought : boolean;
    private isUsed : boolean;

    constructor(name : string, value : number){
        this.name = name;
        this.value = value;
        this.isBought = false;
        this.isUsed = false;
    }

    public getName() : string{
        return this.name;
    }
    public getVal() : number{
        return this.value;
    }
    public getIsBought() : boolean{
        return this.isBought;
    }
    public getIsUsed() : boolean{
        return this.isUsed;
    }

    public buy() : void{
        this.isBought = true;
    }
    public changeIsUsed(newState : boolean) : void{
        this.isUsed = newState;
    }
}