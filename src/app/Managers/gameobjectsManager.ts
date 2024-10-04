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

    public findGameObject(name : string) : GameObject{
        let temp = new GameObject();
        for(let x = 0; x < this.gameobjects.length; x++){
            if(this.gameobjects[x].getName() == name){
                temp = this.gameobjects[x];
            }
        }
        return temp;
    }

    public addGameObject(newObj : GameObject) : void{
        this.gameobjects.push(newObj);
    }
  }