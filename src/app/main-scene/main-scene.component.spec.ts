import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSceneComponent } from './main-scene.component';

describe('MainSceneComponent', () => {
  let component: MainSceneComponent;
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
});
