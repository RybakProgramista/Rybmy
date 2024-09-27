import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameObjectsManager } from '../Managers/gameobjectsManager';
import { GameObject } from '../GameObject/gameobject';

@Component({
  selector: 'app-main-scene',
  standalone: true,
  imports: [],
  templateUrl: './main-scene.component.html',
  styleUrl: './main-scene.component.css'
})
export class MainSceneComponent implements OnInit, AfterViewInit  {
  @ViewChild('mainScene', { static: true }) mainScene!: ElementRef;
  app!: PIXI.Application;
  currState!: string;
  fishOn!: boolean;
  pullingFish! : boolean;
  gameObjManager! : GameObjectsManager;

  idleSplawikY! : number;
  pullOutSplawikY! : number;

  constructor() {}

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    // Tworzenie instancji aplikacji Pixi
    this.app = new PIXI.Application();
    // Dodanie widoku Pixi do kontenera w HTML
    this.app.init({ width: window.innerWidth, height: window.innerHeight /2 , background : "0x0032FF" }).then(()=>{
      this.mainScene.nativeElement.appendChild(this.app.canvas);
      this.gameObjManager = GameObjectsManager.getInstance();

      this.loadSprite("spławik.png", this.app.canvas.width / 2, this.app.canvas.height / 2, false);
      this.currState = "zarzuć";

      this.idleSplawikY = window.innerWidth / 2;
      this.pullOutSplawikY = this.idleSplawikY - 10;

      this.app.ticker.add(() => {
        this.update();
      });
    });
  }
  interact() : void{
    if(this.currState == "zarzuć"){ //zarzucenie
      this.currState = "ciągnij";
      this.gameObjManager.findGameObject("spławik")?.show();
    }
    else if(this.currState == "ciągnij"){
      if(!this.fishOn){
        this.currState = "zarzuć";
        this.gameObjManager.findGameObject("spławik")?.hide();
      }
    }
  }
  changePulling(newState : boolean) : void{
    if(this.fishOn){
      this.pullingFish = newState;
    }
  }
  loadSprite(path : string, x : number, y : number, isVisible : boolean): void{ //funkcja do ładowania spriteu na scenę
    PIXI.Assets.load("../assets/Sprites/" + path).then(temp =>{
      let loadedSprite = new PIXI.Sprite(temp);
      loadedSprite.position.set(x, y);
      loadedSprite.pivot.set(50, 50);
      loadedSprite.visible = isVisible;
      this.app.stage.addChild(loadedSprite);
      this.gameObjManager.addGameObject(new GameObject(path.split(".")[0], loadedSprite));
      console.log("załadowało " + path);
    });
  }
  random(min : number, max : number):number{ //random dla leniwych fiutów jak ja
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  fishPulledOut() : void{ //ryba złowiona
    console.log("Złowiłeś karasia");
    this.gameObjManager.findGameObject("spławik")?.hide();
    this.currState = "zarzuć";
    this.fishOn = false;
  }
  update() : void{ //WAŻNE GÓWNO FUNKCJA CO SIĘ ROBI CO TICKA
    if(this.currState == "ciągnij"){
      if(this.random(0, 100) == 69){
        this.fishOn = true;
        this.gameObjManager.findGameObject("spławik")?.hide();
      }
    }

    if(this.fishOn){ //ciągnięcie ryby
      if(this.pullingFish){

      }
      else{

      }
    }
  }
}