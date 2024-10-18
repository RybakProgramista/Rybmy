export abstract class Item{

    private name : string;
    private value : number;
    private isBought : boolean;
    private isEquipped : boolean;

    constructor(name : string, value : number){
        this.name = name;
        this.value = value;
        this.isBought = false;
        this.isEquipped = false;
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
    public getIsEquipped() : boolean{
        return this.isEquipped;
    }

    public buy() : void{
        this.isBought = true;
    }
    public changeIsEquipped(newState : boolean) : void{
        this.isEquipped = newState;
    }
}