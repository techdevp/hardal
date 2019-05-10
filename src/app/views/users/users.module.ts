import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { StatsComponent } from './stats/stats.component';
import { AllComponent } from './all/all.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { InterestComponent } from './interest/interest.component';
import { UsersService } from '../../services/users/users.service';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component'
import { YellowComponent } from './yellow_badge/yellow_badge.component';
import { GreyComponent } from './grey_badge/grey_badge.component';
import { ReportUsersComponent } from './report-users/report-users.component';
import { BadgeSubmissionsComponent } from './badge-submissions/badge-submissions.component';
import { ViewReportedUsersComponent } from './view-reported-users/view-reported-users.component';
import { TabsModule } from 'ngx-bootstrap';
import { FeaturedInterestsComponent } from './featured-interests/featured-interests.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewInterestComponent } from './view-interest/view-interest.component';


@NgModule({
  imports: [
    UsersRoutingModule,
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
  ],
  declarations: [
    UsersComponent,
    StatsComponent,
    AllComponent,
    NewUsersComponent,
    InterestComponent,
    ProfileComponent,
    YellowComponent,
    GreyComponent,
    ReportUsersComponent,
    BadgeSubmissionsComponent,
    ViewReportedUsersComponent,
    FeaturedInterestsComponent,
    ChangePasswordComponent,
    ViewInterestComponent,

  ],
  providers: [
    UsersService, Ng4LoadingSpinnerService
  ]
})
export class UsersModule { }
