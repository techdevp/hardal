import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowComponent } from './yellow_badge.component';

describe('StatsComponent', () => {
  let component: YellowComponent;
  let fixture: ComponentFixture<YellowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YellowComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
