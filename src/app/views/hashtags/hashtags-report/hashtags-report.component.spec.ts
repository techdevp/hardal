import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagsReportComponent } from './hashtags-report.component';

describe('HashtagsReportComponent', () => {
  let component: HashtagsReportComponent;
  let fixture: ComponentFixture<HashtagsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
