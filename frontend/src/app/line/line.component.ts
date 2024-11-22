import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import { Ticker } from 'pixi.js';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.css'
})
export class LineComponent implements AfterViewInit{
  @Input() durabilityPercent : number = 100;
  lineTicker! : Ticker;
  constructor(private eel: ElementRef){}
  ngAfterViewInit(): void {
    this.lineTicker = new Ticker();
    this.lineTicker.add(() =>{
      this.eel.nativeElement.style.setProperty("--cos", this.durabilityPercent + "%");
    });
    this.lineTicker.start();
  }
}
