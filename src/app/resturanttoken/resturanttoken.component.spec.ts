import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturanttokenComponent } from './resturanttoken.component';

describe('RestauranttokenComponent', () => {
  let component: ResturanttokenComponent;
  let fixture: ComponentFixture<ResturanttokenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResturanttokenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResturanttokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
