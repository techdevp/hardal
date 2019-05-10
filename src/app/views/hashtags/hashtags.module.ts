import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { OrderByPipe } from "../../services/orderby";
import { NgxPaginationModule } from 'ngx-pagination';

import { HashtagsComponent } from './hashtags.component';
import { HashtagsRoutingModule } from './hashtags-routing.module';
import { HashtagsPostComponent } from './hashtags-post/hashtags-post.component';
import { TtListComponent } from './tt-list/tt-list.component';
import { HashtagsReportComponent } from './hashtags-report/hashtags-report.component';
import { HashtagsReportDetailComponent } from './hashtags-report-detail/hashtags-report-detail.component';
import { NewHashtagComponent } from './new-hashtag/new-hashtag.component';
import { AllHashtagsComponent } from './all-hashtags/all-hashtags.component';
@NgModule({
  imports: [
    HashtagsRoutingModule,
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  declarations: [HashtagsComponent,
    HashtagsPostComponent,
    TtListComponent,
    HashtagsReportComponent,
    HashtagsReportDetailComponent,
    NewHashtagComponent,
    AllHashtagsComponent,
    OrderByPipe],
  providers: [
    Ng4LoadingSpinnerService
  ]
})
export class HashtagsModule { }
