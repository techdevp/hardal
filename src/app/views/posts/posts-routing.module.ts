import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { ReportedPostsComponent } from './reported-posts/reported-posts.component';

const routes: Routes = [
  {
    path: '',
    component: PostsComponent,
    data: {
      title: 'Posts'
    }
  },
  {
    path: 'all-posts',
    component: AllPostsComponent,
    data: {
      title: 'All Posts'
    }
  },
  {
    path: 'reported-posts',
    component: ReportedPostsComponent,
    data: {
      title: 'Reported Post'
    }
  },
  {
    path: 'view-post/:id',
    component: ViewPostComponent,
    data: {
      title: 'View Post'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
