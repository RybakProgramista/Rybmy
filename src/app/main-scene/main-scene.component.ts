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
  test!: PIXI.Sprite;
  mousePos!: {x: number, y: number};

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    // Tworzenie instancji aplikacji Pixi
    this.app = new PIXI.Application();

    // Dodanie widoku Pixi do kontenera w HTML
    this.app.init({ width: 800, height: 600, background : "0xffffff" }).then(()=>{
      this.mainScene.nativeElement.appendChild(this.app.canvas);
      
      PIXI.Assets.load("../assets/Sprites/temp.png").then(temp =>{
        this.test = new PIXI.Sprite(temp);
        this.test.position.set(this.app.canvas.width / 2, this.app.canvas.height / 2);
        this.test.pivot.set(50, 50);
        this.app.stage.addChild(this.test);
      });
});
  }
}