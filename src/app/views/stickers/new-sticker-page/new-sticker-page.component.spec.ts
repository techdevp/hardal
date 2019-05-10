import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStickerPageComponent } from './new-sticker-page.component';

describe('NewStickerPageComponent', () => {
  let component: NewStickerPageComponent;
  let fixture: ComponentFixture<NewStickerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStickerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
