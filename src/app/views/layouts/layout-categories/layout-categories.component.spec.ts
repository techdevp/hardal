import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCategoriesComponent } from './layout-categories.component';

describe('LayoutCategoriesComponent', () => {
  let component: LayoutCategoriesComponent;
  let fixture: ComponentFixture<LayoutCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
