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
  fishOn!: boolean;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Tworzenie instancji aplikacji Pixi
    this.app = new PIXI.Application();

    // Dodanie widoku Pixi do kontenera w HTML
    this.app.init({ width: window.innerWidth, height: window.innerHeight /2 , background : "0x0032FF" }).then(()=>{
      this.mainScene.nativeElement.appendChild(this.app.canvas);
      this.loadSprite("spławik.png");
      this.nextState = "zarzuć";
      
      this.app.ticker.add(() => {
        this.update();
      });
    });
  }
  interact() : void{
    if(this.nextState == "zarzuć"){ //zarzucenie
      this.nextState = "ciągnij";
      this.changeSpriteVisibility("spławik", true);
    }
    else if(this.nextState == "ciągnij"){
      if(this.fishOn){
        console.log("Złowiłeś karasia");
        this.fishOn = false;
      }
      else{
        this.changeSpriteVisibility("spławik", false);

      }
      this.nextState = "zarzuć";
    }
  }
  loadSprite(path : string): void{ //funkcja do ładowania spriteu na scenę
    PIXI.Assets.load("../assets/Sprites/" + path).then(temp =>{
      let loadedSprite = new PIXI.Sprite(temp);
      loadedSprite.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);
      loadedSprite.pivot.set(50, 50);
      loadedSprite.label = "spławik";
      loadedSprite.visible = false;
      this.app.stage.addChild(loadedSprite);
    });
  }
  changeSpriteVisibility(name : string, newVisibility : boolean) : void{
    for(let x : number = 0; x < this.app.stage.children.length; x++){
      if(this.app.stage.getChildAt(x).label == name){
        this.app.stage.getChildAt(x).visible = newVisibility;
        return;
      }
    }
  }
  random(min : number, max : number):number{ //random dla leniwych fiutów jak ja
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  update() : void{ //WAŻNE GÓWNO FUNKCJA CO SIĘ ROBI CO TICKA
    if(this.nextState == "ciągnij"){
      if(this.random(0, 1000) == 69){
        this.fishOn = true;
        this.changeSpriteVisibility("spławik", false);
      }
    }
  }
}