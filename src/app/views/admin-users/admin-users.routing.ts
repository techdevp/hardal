import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUsersComponent } from './admin-users.component';
import { AddAdminComponent } from './add-admin/add-admin.component';


const routes: Routes = [
  {
    path: '',
    component: AdminUsersComponent,
    data: {
      title: 'Admin Users'
    }
  },
  {
    path: 'add-admin/:id',
    component: AddAdminComponent,
    data: {
      title: 'Add Admin Users'
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
