import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerPagesComponent } from './sticker-pages.component';

describe('StickerPagesComponent', () => {
  let component: StickerPagesComponent;
  let fixture: ComponentFixture<StickerPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StickerPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
