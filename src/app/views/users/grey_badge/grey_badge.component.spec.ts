import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GreyComponent } from './grey_badge.component';

describe('GreyComponent', () => {
  let component: GreyComponent;
  let fixture: ComponentFixture<GreyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GreyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GreyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
