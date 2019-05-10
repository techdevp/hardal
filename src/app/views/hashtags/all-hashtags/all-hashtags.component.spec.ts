import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllHashtagsComponent } from './all-hashtags.component';

describe('AllHashtagsComponent', () => {
  let component: AllHashtagsComponent;
  let fixture: ComponentFixture<AllHashtagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllHashtagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllHashtagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
