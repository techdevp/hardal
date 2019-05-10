import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllLayoutsComponent } from './all-layouts/all-layouts.component';
import { LayoutCategoriesComponent } from './layout-categories/layout-categories.component';
import { LayoutSubmissionsComponent } from './layout-submissions/layout-submissions.component';
import { NewLayoutCategoryComponent } from './new-layout-category/new-layout-category.component';
import { EditLayoutCategoryComponent } from './edit-layout-category/edit-layout-category.component';
import { NewLayoutComponent } from './new-layout/new-layout.component';
import { LayoutsComponent } from './layouts.component';
import { AddLayoutComponent } from './add-layout/add-layout.component';
import { EditLayoutComponent } from './edit-layout/edit-layout.component';
import { HighlightedLayoutComponent } from './highlighted-layout/highlighted-layout.component';
import { LayoutSubmissionEditComponent } from './layout-submission-edit/layout-submission-edit.component';
import { ArchivedLayoutsComponent } from './archived-layouts/archived-layouts.component';
import { DraftLayoutComponent } from './draft-layout/draft-layout.component';
import { ViewLayoutComponent } from './view-layout/view-layout.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
const routes: Routes = [
  {
    path: '',
    component: LayoutsComponent,
    data: {
      title: 'Layouts'
    }
  },
  {
    path: 'all-layout',
    component: AllLayoutsComponent,
    data: {
      title: 'All Layouts'
    }
  },
  {
    path: 'layout-category',
    component: LayoutCategoriesComponent,
    data: {
      title: 'Layouts Categories'
    }
  },
  {
    path: 'layout-submissions',
    component: LayoutSubmissionsComponent,
    data: {
      title: 'Layouts Submissions'
    }
  },
  {
    path: 'highlighted-layout',
    component: HighlightedLayoutComponent,
    data: {
      title: 'Highlighted Layout'
    }
  },
  {
    path: 'new-layout-category',
    component: NewLayoutCategoryComponent,
    data: {
      title: 'New Layout Category'
    }
  },
  {
    path: 'edit-layout-category/:id',
    component: EditLayoutCategoryComponent,
    data: {
      title: 'Edit Layout Category'
    }
  },
  {
    path: 'new-layout',
    component: NewLayoutComponent,
    data: {
      title: 'New Layout'
    }
  },
  {
    path: 'add-layout',
    component: AddLayoutComponent,
    data: {
      title: 'Add Layouts'
    }
  },
  {
    path: 'edit-layout/:id',
    component: EditLayoutComponent,
    data: {
      title: 'Edit Layouts'
    }
  },
  {
    path: 'edit-layout-submission',
    component: LayoutSubmissionEditComponent,
    // data: {
    //   title: 'Edit Layouts'
    // }
  },
  {
    path: 'archived-layouts',
    component: ArchivedLayoutsComponent,
    data: {
      title: 'Archived Layouts'
    }
  },
  {
    path: 'draft-layouts',
    component: DraftLayoutComponent,
    data: {
      title: 'Draft Layouts'
    }
  },
  {
    path: 'view-layout/:id',
    component: ViewLayoutComponent,
    data: {
      title: 'View Layout'
    }
  },
  {
    path: 'view-category/:id',
    component: ViewCategoryComponent,
    data: {
      title: 'View Layout Category'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
