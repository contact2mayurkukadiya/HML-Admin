import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantcategoryComponent } from './resturantcategory.component';

describe('ResturantcategoryComponent', () => {
  let component: ResturantcategoryComponent;
  let fixture: ComponentFixture<ResturantcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturantcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturantcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
