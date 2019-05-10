import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';

import { UsersComponent } from './users.component';
import { AllComponent } from './all/all.component';
import { NewUsersComponent } from './new-users/new-users.component';
import { InterestComponent } from './interest/interest.component';
import { ProfileComponent } from './profile/profile.component';
import { YellowComponent } from './yellow_badge/yellow_badge.component';
import { GreyComponent } from './grey_badge/grey_badge.component';
import { BadgeSubmissionsComponent } from './badge-submissions/badge-submissions.component';
import { ReportUsersComponent } from './report-users/report-users.component';
import { ViewReportedUsersComponent } from './view-reported-users/view-reported-users.component';
import { FeaturedInterestsComponent } from './featured-interests/featured-interests.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ViewInterestComponent } from './view-interest/view-interest.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: UsersComponent,
        data: {
          title: 'Users'
        }
      },
      {
        path: 'all-users',
        component: AllComponent,
        data: {
          title: 'All Users'
        }
      },
      {
        path: 'new-users',
        component: NewUsersComponent,
        data: {
          title: 'New Users'
        }
      },
      {
        path: 'interests',
        component: InterestComponent,
        data: {
          title: 'Interests'
        }
      },
      {
        path: 'view-interest/:id',
        component: ViewInterestComponent,
        data: {
          title: 'View Interest'
        }
      },
      {
        path: 'featured-interests',
        component: FeaturedInterestsComponent,
        data: {
          title: 'Featured Interests'
        }
      },
      {
        path: 'view-report-user',
        component: ViewReportedUsersComponent,
        data: {
          title: 'View Reports'
        }
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        data: {
          title: 'Profile'
        }

      },
      {
        path: 'yellow-badge',
        component: YellowComponent,
        data: {
          title: 'Yellow Badge'
        }
      },
      {
        path: 'grey-badge',
        component: GreyComponent,
        data: {
          title: 'Grey Badge'
        }
      },
      {
        path: 'badge-submissions',
        component: BadgeSubmissionsComponent,
        data: {
          title: 'Badge Submissions'
        }
      },
      {
        path: 'report-users',
        component: ReportUsersComponent,
        data: {
          title: 'Report Users'
        }
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        data: {
          title: 'Change password'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
