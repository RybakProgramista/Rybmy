import { GameObject } from "../GameObject/gameobject";

export class GameObjectsManager {
    private static instance : GameObjectsManager;
    private gameobjects : Array<GameObject>;

    private constructor() {
        this.gameobjects = new Array<GameObject>();
    }
    /**
     * Funkcja odpowiedzialna za zrobienie z obiektu, obiektu typu Singletone
     * @returns zwraca istniejącą już instancję tej klasy
     */
    public static getInstance() : GameObjectsManager{
        if(!GameObjectsManager.instance){
            GameObjectsManager.instance = new GameObjectsManager();
        }
        return GameObjectsManager.instance;
    }
    /**
     * Szuka obiektu, znajdującego się w grze
     * @param name - nazwa szukanego obiektu
     * @returns - zwraca obiekt, typu GameObject
     */
    public findGameObject(name : string) : GameObject{
        let temp = new GameObject();
        for(let x = 0; x < this.gameobjects.length; x++){
            if(this.gameobjects[x].getName() == name){
                temp = this.gameobjects[x];
            }
        }
        return temp;
    }
    /**
     * Dodaje nowy obiekt do gry
     * @param newObj - obiekt, który ma zostać dodany
     */
    public addGameObject(newObj : GameObject) : void{
        this.gameobjects.push(newObj);
    }
  }