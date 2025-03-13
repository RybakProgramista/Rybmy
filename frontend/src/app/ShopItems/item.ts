export type itemState = "Equipped" | "NotBought" | "Bought";

export class Item{

    private name : string;
    private value : number;
    private currState : itemState;

    /**
     * Konstruktor klasy Item
     * @param list - lista wartości, która ma zostać przypisana do obiektu
     */
    constructor(list : any){
        this.name = (list ? list["nazwa"] : "nazwa");
        this.value = (list ? list["cena"] : -1);
        this.currState = (list ? list["isOwned"] : "NotBought");
        if(this.value < 0){
            //console.error("Item cannot be worth less than 0 you dumb fuck");
        }
    }
    /**
     * Funkcja, któa zmienia stan obiektu
     * @param newState - nowy stan obiektu
     */
    public changeCurrState(newState : itemState) : void{
        this.currState = newState;
    }
    /**
     * Funkcja zwracająca nazwę obiektu
     * @returns - zwraca zmienną typu string
     */
    public getName() : string{
        return this.name;
    }
    /**
     * Funkcja zwracająca cenę obiektu
     * @returns - zwraca zmienną typu number
     */
    public getVal() : number{
        return this.value;
    }
    /**
     * Funkcja zwracająca obecny stan obiektu
     * @returns - zwraca zmienną typu itemState
     */
    public getState() : itemState{
        return this.currState;
    }
}