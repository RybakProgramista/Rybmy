import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainSceneComponent } from './main-scene/main-scene.component';
import { LineComponent } from './line/line.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainSceneComponent, LineComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
