import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLayoutCategoryComponent } from './new-layout-category.component';

describe('NewLayoutCategoryComponent', () => {
  let component: NewLayoutCategoryComponent;
  let fixture: ComponentFixture<NewLayoutCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLayoutCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLayoutCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
