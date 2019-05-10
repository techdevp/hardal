import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLayoutCategoryComponent } from './edit-layout-category.component';

describe('EditLayoutCategoryComponent', () => {
  let component: EditLayoutCategoryComponent;
  let fixture: ComponentFixture<EditLayoutCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLayoutCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLayoutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
