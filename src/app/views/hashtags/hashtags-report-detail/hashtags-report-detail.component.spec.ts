import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashtagsReportDetailComponent } from './hashtags-report-detail.component';

describe('HashtagsReportDetailComponent', () => {
  let component: HashtagsReportDetailComponent;
  let fixture: ComponentFixture<HashtagsReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashtagsReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashtagsReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
