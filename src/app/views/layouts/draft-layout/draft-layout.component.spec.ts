import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftLayoutComponent } from './draft-layout.component';

describe('DraftLayoutComponent', () => {
  let component: DraftLayoutComponent;
  let fixture: ComponentFixture<DraftLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
