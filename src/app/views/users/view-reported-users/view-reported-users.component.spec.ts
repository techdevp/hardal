import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedUsersComponent } from './view-reported-users.component';

describe('ViewReportedUsersComponent', () => {
  let component: ViewReportedUsersComponent;
  let fixture: ComponentFixture<ViewReportedUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportedUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportedUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
