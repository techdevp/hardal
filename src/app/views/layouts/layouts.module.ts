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


import { LayoutsComponent } from './layouts.component';
import { LayoutsRoutingModule } from './layouts-routing.module';
import { AddLayoutComponent } from './add-layout/add-layout.component';
import { EditLayoutComponent } from './edit-layout/edit-layout.component';
import { HighlightedLayoutComponent } from './highlighted-layout/highlighted-layout.component';
import { UsersService } from '../../services/users/users.service';
import { AllLayoutsComponent } from './all-layouts/all-layouts.component';
import { LayoutCategoriesComponent } from './layout-categories/layout-categories.component';
import { LayoutSubmissionsComponent } from './layout-submissions/layout-submissions.component';
import { NewLayoutCategoryComponent } from './new-layout-category/new-layout-category.component';
import { EditLayoutCategoryComponent } from './edit-layout-category/edit-layout-category.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { SearchPipe } from '../../search.pipe';
import { LayoutSubmissionEditComponent } from './layout-submission-edit/layout-submission-edit.component';
import { ArchivedLayoutsComponent } from './archived-layouts/archived-layouts.component';
import { DraftLayoutComponent } from './draft-layout/draft-layout.component';
import { ViewLayoutComponent } from './view-layout/view-layout.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

@NgModule({
  imports: [
    LayoutsRoutingModule,
    ChartsModule,
    HttpModule,
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot()

  ],
  declarations: [LayoutsComponent,
    AddLayoutComponent,
    EditLayoutComponent,
    HighlightedLayoutComponent,
    AllLayoutsComponent,
    LayoutCategoriesComponent,
    LayoutSubmissionsComponent,
    NewLayoutCategoryComponent,
    EditLayoutCategoryComponent,
    SearchPipe,
    NewLayoutComponent,
    LayoutSubmissionEditComponent,
    ArchivedLayoutsComponent,
    DraftLayoutComponent,
    ViewLayoutComponent,
    ViewCategoryComponent],
  providers: [
    UsersService, Ng4LoadingSpinnerService
  ]
})
export class LayoutsModule { }
