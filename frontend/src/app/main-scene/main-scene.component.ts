import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, NgZone, Input, Output, EventEmitter } from '@angular/core';
import * as PIXI from 'pixi.js';
import { GameObjectsManager } from '../Managers/gameobjectsManager';
import { GameObject } from '../GameObject/gameobject';

type state = "ZARZUĆ" | "ZATNIJ" | "CIĄGNIJ";

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
  currState!: state;
  fishOn!: boolean;
  pullingFish! : boolean;
  isPodbierable! : boolean;
  isDuringEvent!: boolean;

  gameObjManager! : GameObjectsManager;

  idleSplawikY! : number;
  pullOutSplawikY! : number;
  timer! : number;
  @Input() maxDurability! : number;
  durability! : number;

  updateTicker!: PIXI.Ticker;

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    // Tworzenie instancji aplikacji Pixi
    const divSizes = this.mainScene.nativeElement;
    this.app = new PIXI.Application();
    // Dodanie widoku Pixi do kontenera w HTML
    this.app.init({ width: divSizes.offsetWidth, height: divSizes.offsetHeight , background : "0x0032FF" }).then(()=>{
      this.mainScene.nativeElement.appendChild(this.app.canvas);
      this.gameObjManager = GameObjectsManager.getInstance();
      this.isPodbierable = false;
      this.fishOn = false;
      this.isDuringEvent = false;

      this.timer = 0;
      this.durability = this.maxDurability;

      this.loadSprite("spławik.png", this.app.canvas.width / 2, this.app.canvas.height / 2, false);
      this.currState = "ZARZUĆ";

      this.idleSplawikY = this.app.canvas.height / 2;
      this.pullOutSplawikY = this.idleSplawikY + 200;


      this.ngZone.runOutsideAngular(() => {
        this.updateTicker = new PIXI.Ticker();
        this.updateTicker.add(this.update, this);
        this.updateTicker.start();
      });
    });
  }
  /**
   * Funkcja odpowiadająca za interakcję gracza ze światem gry, zależna od obecnego stanu rozgrywki
   */
  interact() : void{
    if(this.currState == "ZARZUĆ"){ //zarzucenie
      this.durability = this.maxDurability;
      this.durabilityChanged();
      this.currState = "CIĄGNIJ";
      this.gameObjManager.findGameObject("spławik")?.show();
    }
    else if(this.currState == "CIĄGNIJ"){
      if(!this.fishOn){
        this.currState = "ZARZUĆ";
        this.gameObjManager.findGameObject("spławik")?.hide();
      }
    }
    else if(this.currState == "ZATNIJ"){
      this.fishOn = true;
      this.currState = "CIĄGNIJ";
      this.timer = 0;
      //Sprawdzanie co to za ryba
      
    }
  }
  /**
   * Funkcja, która zmienia status ciągnięcia ryby
   * @param newState - nowy status, odpowiadający temu czy ryba jest ciągnięta
   */
  changePulling(newState : boolean) : void{
    if(this.fishOn){
      this.pullingFish = newState;
    }
  }
  /**
   * Funkcja, która wykonuje podebranie ryby
   */
  podbierz() : void{
    if(this.isPodbierable){
      this.fishPulledOut();
    }
  }
  /**
   * Funkcja odpowiedzialna za załadowanie Spritea z folderu Sprites i stworzenie go w świecie gry
   * @param path - ścieżka do Spritea, poczynając od olderu Sprites
   * @param x - pozycja X w świecie gry, na której ma się pojawić Sprite
   * @param y - pozycja Y w świecie gry, na której ma się pojawić Sprite
   * @param isVisible - ustawienbie, czy Sprite ma być widoczny po załadowaniu
   */
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
  /**
   * Funkcja losująca liczbę z zakresu
   * @param min - minimalna wartość
   * @param max - maksymalna wartość
   * @returns zwraca zmienną typu number
   */
  random(min : number, max : number):number{ //random dla leniwych fiutów jak ja
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  /**
   * Funkcja wywoływana po złowieniu ryby
   */
  fishPulledOut() : void{ //ryba złowiona
    alert("Złowiłeś karasia");
    this.gameObjManager.findGameObject("spławik").setYPos(this.idleSplawikY)
    this.isPodbierable = false;
    this.gameObjManager.findGameObject("spławik").hide();
    this.currState = "ZARZUĆ";
    this.fishOn = false;
  }
  /**
   * Funkcja wywoływana po zerwaniu ryby
   */
  fishLost(): void{
    alert("Zerwałeś Zestaw");
    this.gameObjManager.findGameObject("spławik").setYPos(this.idleSplawikY)
    this.isPodbierable = false;
    this.gameObjManager.findGameObject("spławik").hide();
    this.currState = "ZARZUĆ";
    this.fishOn = false;
  }
  /**
   * Funkcja update, która wykonywana jest co ticka
   * @param time 
   */
  update(time : any) : void{ //WAŻNE GÓWNO FUNKCJA CO SIĘ ROBI CO TICKA
    this.gameObjManager.findGameObject("spławik").setSize(this.gameObjManager.findGameObject("spławik").getSprite().position.y / this.idleSplawikY * 64);
    if(this.currState == "CIĄGNIJ" && !this.fishOn){
      if(this.random(0, 69) == 1){ //tutaj trzeba będzie zrobić logikę za szansami na złowienie konkretnej ryby
        this.currState = "ZATNIJ";
        //TU WYŻEJ WSTAW ANIMACJĘ SPRITEA NA BRANIE
      }
    }

    if(this.currState == "ZATNIJ"){
      this.timer += time.deltaTime;
      if(this.timer >= 200){
        this.currState = "CIĄGNIJ";
        this.timer = 0;
      }
    }

    if(this.fishOn){ //ciągnięcie ryby
      if(this.pullingFish){
        this.durability -= time.deltaTime / 1.5;
        if(this.gameObjManager.findGameObject("spławik").getSprite().position.y < this.pullOutSplawikY){
          this.gameObjManager.findGameObject("spławik").changeYPos(time.deltaTime);
          if(this.durability <= 0){ 
            /*
            W przyszłości będą potrzebne dokładniejsze wyliczenia odnośnie zużycia sprzętu. Trzeba będzie jakoś sensownie w tej logice uwzględnić za duży luz na żyłce powodujący stracenie ryby
            Istotną kwestią będą funkcje matematyczne wyliczające takie rzeczy jak prędkość ryby czy też jej siłę na bazie wartości z bazy danych\
            Od chuja i jeszcze trochę szczurowej roboty dla backednowca
            kurwa
            czyli mnie
            Schizofrenia Update
            */
            this.fishLost();
          }
        }
      }
      else{
        this.durability += time.deltaTime;
        if(this.gameObjManager.findGameObject("spławik").getSprite().position.y > this.idleSplawikY){
          this.gameObjManager.findGameObject("spławik").changeYPos(-time.deltaTime * this.random(1, 1.3));
        }
      }
      this.durabilityChanged();
      this.isPodbierable = this.gameObjManager.findGameObject("spławik").getSprite().position.y >= this.pullOutSplawikY - 50;
    }
  }
  @Output() calculatePercentOnDurabilityChanged = new EventEmitter<number>();
  durabilityChanged() : void{
    if(this.durability > this.maxDurability){
      this.durability = this.maxDurability;
    }
    this.calculatePercentOnDurabilityChanged.emit(this.durability / this.maxDurability * 100);
  }
}