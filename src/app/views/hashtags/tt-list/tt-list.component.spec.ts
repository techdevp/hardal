import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TtListComponent } from './tt-list.component';

describe('TtListComponent', () => {
  let component: TtListComponent;
  let fixture: ComponentFixture<TtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
