import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStickerPageComponent } from './edit-sticker-page.component';

describe('EditStickerPageComponent', () => {
  let component: EditStickerPageComponent;
  let fixture: ComponentFixture<EditStickerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStickerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStickerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
