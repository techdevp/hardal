import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HashtagsComponent } from './hashtags.component';
import { AllHashtagsComponent } from './all-hashtags/all-hashtags.component';
import { HashtagsPostComponent } from './hashtags-post/hashtags-post.component';
import { TtListComponent } from './tt-list/tt-list.component';
import { HashtagsReportComponent } from './hashtags-report/hashtags-report.component';
import { HashtagsReportDetailComponent } from './hashtags-report-detail/hashtags-report-detail.component';
import { NewHashtagComponent } from './new-hashtag/new-hashtag.component';
const routes: Routes = [
  {
    path: '',
    component: HashtagsComponent,
    data: {
      title: 'Hashtags'
    }
  },
  {
    path: 'all-hashtags',
    component: AllHashtagsComponent,
    data: {
      title: 'Hashtags'
    }
  },
  {
    path: 'hashtags-post',
    component: HashtagsPostComponent,
    data: {
      title: 'Hashtags Post'
    }
  },
  {
    path: 'tt-list',
    component: TtListComponent,
    data: {
      title: 'TT List'
    }
  },
  {
    path: 'new-hashtag',
    component: NewHashtagComponent,
    data: {
      title: 'New Hashtag'
    }
  },
  {
    path: 'hashtags-report',
    component: HashtagsReportComponent,
    data: {
      title: 'Hashtags Report'
    }
  },
  {
    path: 'hashtags-report-detail',
    component: HashtagsReportDetailComponent,
    data: {
      title: 'Hashtags Report Detail'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HashtagsRoutingModule { }
