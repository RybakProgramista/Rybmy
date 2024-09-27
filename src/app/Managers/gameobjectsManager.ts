import { GameObject } from "../GameObject/gameobject";

export class GameObjectsManager {
    private static instance : GameObjectsManager;
    private static exists : boolean;
    private static gameobjects : Array<GameObject>;

    constructor() {
      if (GameObjectsManager.exists) {
        return GameObjectsManager.instance;
      }
      GameObjectsManager.gameobjects = new Array<GameObject>();
      GameObjectsManager.exists = true;
      GameObjectsManager.instance = this;
      return this;
    }
    public findGameObject(name : string) : GameObject | null{
        for(let x = 0; x <= GameObjectsManager.gameobjects.length; x++){
            if(GameObjectsManager.gameobjects[x].getName() == name){
                return GameObjectsManager.gameobjects[x];
            }
        }
        return null;
    }

    public addGameObject(newObj : GameObject) : void{
        GameObjectsManager.gameobjects.push(newObj);
    }
  }