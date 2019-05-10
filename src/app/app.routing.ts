import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Authentication } from './auth-guard.service';
// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Dashboard'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Layouts'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'layouts',
        loadChildren: './views/layouts/layouts.module#LayoutsModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Posts'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'posts',
        loadChildren: './views/posts/posts.module#PostsModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Admin Users'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'admin-users',
        loadChildren: './views/admin-users/admin-users.module#AdminUsersModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Hashtags'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'hashtags',
        loadChildren: './views/hashtags/hashtags.module#HashtagsModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Users'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'users',
        loadChildren: './views/users/users.module#UsersModule'
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Stickers'
    },
    canActivate: [Authentication],
    children: [
      {
        path: 'sticker',
        loadChildren: './views/stickers/stickers.module#StickersModule'
      }
    ]
  },
  {
    path: '',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: 'login',
        loadChildren: './views/login/login.module#LoginModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
