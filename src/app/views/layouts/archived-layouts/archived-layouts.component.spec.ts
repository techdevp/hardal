import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedLayoutsComponent } from './archived-layouts.component';

describe('ArchivedLayoutsComponent', () => {
  let component: ArchivedLayoutsComponent;
  let fixture: ComponentFixture<ArchivedLayoutsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivedLayoutsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedLayoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
