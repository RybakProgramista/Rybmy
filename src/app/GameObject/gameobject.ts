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
    public changeSprite(sprite : PIXI.Sprite) : void{
        sprite.position.set(this.sprite.position.x, this.sprite.position.y);
        this.sprite = sprite;
    }

    constructor(name : string, sprite : PIXI.Sprite){
        this.name = name;
        this.sprite = sprite;
    }

    public show() : void{
        this.sprite.visible = true;
    }
    public hide() : void{
        this.sprite.visible = false;
    }
}
