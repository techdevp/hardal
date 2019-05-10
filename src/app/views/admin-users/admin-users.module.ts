import { NgModule } from '@angular/core';;
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpModule } from '@angular/http';

import { AuthService } from '../../services/auth/auth.service';
import { AdminService } from '../../services/admin/admin.service';
import { AdminUsersComponent } from './admin-users.component';
import { AdminModuleRoutingModule } from './admin-users.routing';
import { AddAdminComponent } from './add-admin/add-admin.component'

@NgModule({
  imports: [
    AdminModuleRoutingModule,
    FormsModule,
    HttpModule,
    CommonModule,
    Ng4LoadingSpinnerModule.forRoot(),

  ],
  declarations: [AdminUsersComponent, AddAdminComponent],
  providers: [AuthService, Ng4LoadingSpinnerService, AdminService]
})
export class AdminUsersModule { }
