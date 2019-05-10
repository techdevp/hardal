import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedLayoutComponent } from './highlighted-layout.component';

describe('HighlightedLayoutComponent', () => {
  let component: HighlightedLayoutComponent;
  let fixture: ComponentFixture<HighlightedLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightedLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
