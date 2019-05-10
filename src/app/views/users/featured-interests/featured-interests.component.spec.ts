import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedInterestsComponent } from './featured-interests.component';

describe('FeaturedInterestsComponent', () => {
  let component: FeaturedInterestsComponent;
  let fixture: ComponentFixture<FeaturedInterestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeaturedInterestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturedInterestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
