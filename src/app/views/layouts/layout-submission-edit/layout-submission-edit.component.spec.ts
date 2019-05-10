import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSubmissionEditComponent } from './layout-submission-edit.component';

describe('LayoutSubmissionEditComponent', () => {
  let component: LayoutSubmissionEditComponent;
  let fixture: ComponentFixture<LayoutSubmissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutSubmissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutSubmissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
