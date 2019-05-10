import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSubmissionsComponent } from './layout-submissions.component';

describe('LayoutSubmissionsComponent', () => {
  let component: LayoutSubmissionsComponent;
  let fixture: ComponentFixture<LayoutSubmissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSubmissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
