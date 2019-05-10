import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInterestComponent } from './view-interest.component';

describe('ViewInterestComponent', () => {
  let component: ViewInterestComponent;
  let fixture: ComponentFixture<ViewInterestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInterestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
