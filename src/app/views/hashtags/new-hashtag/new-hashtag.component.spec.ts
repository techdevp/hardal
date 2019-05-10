import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHashtagComponent } from './new-hashtag.component';

describe('NewHashtagComponent', () => {
  let component: NewHashtagComponent;
  let fixture: ComponentFixture<NewHashtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewHashtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHashtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
