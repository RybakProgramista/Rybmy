import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';

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
  nextState!: string;
  gameobjectList: Map<string, PIXI.Sprite> = new Map<string, PIXI.Sprite>();
  fishOn!: boolean;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Tworzenie instancji aplikacji Pixi
    this.app = new PIXI.Application();

    // Dodanie widoku Pixi do kontenera w HTML
    this.app.init({ width: window.innerWidth, height: window.innerHeight /2 , background : "0x0032FF" }).then(()=>{
      this.mainScene.nativeElement.appendChild(this.app.canvas);
      this.nextState = "zarzuć";      
    });
  }
  interact() : void{
    if(this.nextState == "zarzuć"){
      this.nextState = "ciągnij";

      this.loadSprite("spławik.png")
      this.app.ticker.add(() => {
        if(this.random(0, 100) == 69){
          this.removeSprite("spławik");
          this.fishOn = true;
          console.log("TNIJ");
          this.app.ticker.stop();
        }
      });
    }
    else if(this.nextState == "ciągnij"){
      this.app.ticker.stop();
      if(this.fishOn){
        console.log("Złowiłeś karasia");
        this.fishOn = false;
      }
      else{
        this.removeSprite("spławik");
      }
      this.nextState = "zarzuć";
    }
  }
  loadSprite(path : string): void{ //funkcja do ładowania spriteu na scenę
    PIXI.Assets.load("../assets/Sprites/" + path).then(temp =>{
      let loadedSprite = new PIXI.Sprite(temp);
      loadedSprite.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);
      loadedSprite.pivot.set(50, 50);
      this.app.stage.addChild(loadedSprite);
      this.gameobjectList.set(path.split(".")[0], loadedSprite);
    });
  }
  removeSprite(name : string){ //usuwanie spritea ze sceny
    let sprt : PIXI.Sprite = this.gameobjectList.get(name) ?? new PIXI.Sprite();
    this.app.stage.removeChild(sprt);
    this.gameobjectList.delete(name);
  }
  random(min : number, max : number):number{ //random dla leniwych fiutów jak ja
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}