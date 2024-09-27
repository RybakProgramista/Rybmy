import { GameObject } from "../GameObject/gameobject";

export class GameObjectsManager {
    private static instance : GameObjectsManager;
    private gameobjects : Array<GameObject>;

    private constructor() {
        this.gameobjects = new Array<GameObject>();
    }

    public static getInstance() : GameObjectsManager{
        if(!GameObjectsManager.instance){
            GameObjectsManager.instance = new GameObjectsManager();
        }
        return GameObjectsManager.instance;
    }

    public findGameObject(name : string) : GameObject | null{
        console.log(this.gameobjects);
        console.log(this.gameobjects.length);
        for(let x = 0; x < this.gameobjects.length; x++){
            if(this.gameobjects[x].getName() == name){
                return this.gameobjects[x];
            }
        }
        return null;
    }

    public addGameObject(newObj : GameObject) : void{
        this.gameobjects.push(newObj);
    }
  }