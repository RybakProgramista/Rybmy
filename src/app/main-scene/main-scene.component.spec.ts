import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSceneComponent } from './main-scene.component';

import { sqlite3 } from 'sqlite3';




describe('MainSceneComponent', () => {
  let component: MainSceneComponent, sqlite3;
  let fixture: ComponentFixture<MainSceneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSceneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainSceneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get connection with db', () => {
    var fs = require('fs');
    let db = new sqlite3.Database('mydatabase', (err) => {
      if (err){
        return console.error(err.message);
      }
      console.log('Connected to the in-memory SQlite database.');
    });
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
  });
});
