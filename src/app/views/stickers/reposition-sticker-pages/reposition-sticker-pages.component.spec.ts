import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositionStickerPagesComponent } from './reposition-sticker-pages.component';

describe('RepositionStickerPagesComponent', () => {
  let component: RepositionStickerPagesComponent;
  let fixture: ComponentFixture<RepositionStickerPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositionStickerPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositionStickerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
