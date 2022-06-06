import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllWallpaperComponent } from './all-wallpaper.component';

describe('AllWallpaperComponent', () => {
  let component: AllWallpaperComponent;
  let fixture: ComponentFixture<AllWallpaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllWallpaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllWallpaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
