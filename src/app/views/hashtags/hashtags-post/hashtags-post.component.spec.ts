import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagsPostComponent } from './hashtags-post.component';

describe('HashtagsPostComponent', () => {
  let component: HashtagsPostComponent;
  let fixture: ComponentFixture<HashtagsPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagsPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
