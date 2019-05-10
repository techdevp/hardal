import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';


import { PostsComponent } from './posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ReportedPostsComponent } from './reported-posts/reported-posts.component';
import { PostService } from './../../services/posts/post.service';
import { ViewPostComponent } from './view-post/view-post.component';

@NgModule({
  imports: [
    PostsRoutingModule,
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()

  ],
  declarations: [PostsComponent, AllPostsComponent, ReportedPostsComponent, ViewPostComponent],
  providers: [
    PostService, Ng4LoadingSpinnerService
  ]
})
export class PostsModule { }
