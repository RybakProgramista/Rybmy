import * as PIXI from 'pixi.js';

export class GameObject{
    private name : string;
    private sprite : PIXI.Sprite;
    /**
     * Funkcja zwracająca nazwę obiektu w grze
     * @returns - zwraca zmienną typu string
     */
    public getName() : string{
        return this.name;
    }
    /**
     * Funkcja zwracająca Spritea, przypisanego do obiektu w grze
     * @returns - zwraca obiekt typu Sprite z biblioteki PIXI
     */
    public getSprite() : PIXI.Sprite{
        return this.sprite;
    }
    /**
     * Funkcja zmieniająca Spritea, przypisanego do obiektu w grze
     * @param path - ścieżka do nowego Spritea, poczynając od folderu Sprites
     */
    public changeSprite(path : string) : void{
        PIXI.Assets.load("../assets/Sprites/" + path).then(temp =>{
            temp.position.set(this.sprite.position.x, this.sprite.position.y);
            this.sprite = temp;
            console.log("załadowało " + path);
          });
    }
    /**
     * Funkcja zmieniająca pozycję Y Spritea obiektu w grze
     * @param change - wartość o ile ma się zmienić pozycja Y
     */
    public changeYPos(change : number) : void{
        this.sprite.position.set(
            this.sprite.position.x,
            this.sprite.position.y + change
        );
    }
    /**
     * Funkcja ustawiająca nową pozycę Y Spritea obiektu w grze
     * @param newPos - nowa pozycja Y
     */
    public setYPos(newPos : number): void{
        this.sprite.position.set(this.sprite.position.x, newPos);
    }
    /**
     * Funkcja ustawiająca nowy rozmiar dla Spritea obiektu w grze
     * @param newSize - nowy rozmiar
     */
    public setSize(newSize : number) : void{
        this.sprite.setSize(newSize);
    }
    /**
     * Konstruktor klasy GameObject
     * @param name - nazwa obiektu w grze
     * @param sprite - Sprite przypisany do obiektu w grze
     */
    constructor(name? : string, sprite? : PIXI.Sprite){
        this.name = name ?? "";
        this.sprite = sprite ?? new PIXI.Sprite();
    }
    /**
     * Funkcja, która zmienia widoczność Spritea przypisanego do obiektu w grze na true
     */
    public show() : void{
        this.sprite.visible = true;
    }
    /**
     * Funkcja, która zmienia widoczność Spritea przypisanego do obiektu w grze na false
     */
    public hide() : void{
        this.sprite.visible = false;
    }
}
