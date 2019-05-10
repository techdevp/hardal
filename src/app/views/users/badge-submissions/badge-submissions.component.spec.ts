import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeSubmissionsComponent } from './badge-submissions.component';

describe('BadgeSubmissionsComponent', () => {
  let component: BadgeSubmissionsComponent;
  let fixture: ComponentFixture<BadgeSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgeSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
