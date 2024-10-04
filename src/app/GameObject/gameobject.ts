import * as PIXI from 'pixi.js';

export class GameObject{
    private name : string;
    private sprite : PIXI.Sprite;

    public getName() : string{
        return this.name;
    }
    public getSprite() : PIXI.Sprite{
        return this.sprite;
    }
    public changeSprite(path : string) : void{
        PIXI.Assets.load("../assets/Sprites/" + path).then(temp =>{
            temp.position.set(this.sprite.position.x, this.sprite.position.y);
            this.sprite = temp;
            console.log("załadowało " + path);
          });
    }
    public changeYPos(change : number) : void{
        this.sprite.position.set(
            this.sprite.position.x,
            this.sprite.position.y + change
        );
    }
    public setYPos(newPos : number): void{
        this.sprite.position.set(this.sprite.position.x, newPos);
    }
    constructor(name? : string, sprite? : PIXI.Sprite){
        this.name = name ?? "";
        this.sprite = sprite ?? new PIXI.Sprite();
    }

    public show() : void{
        this.sprite.visible = true;
    }
    public hide() : void{
        this.sprite.visible = false;
    }
}
