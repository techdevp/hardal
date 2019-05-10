import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../app.global';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  show_msg: any;
  users: any;
  access_token: any;
  data: any;
  count: number = 0;
  error_msg: any;
  successMessage: any;
  errormsg: any;

  constructor(private adminService: AdminService, private spinnerService: Ng4LoadingSpinnerService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.adminService.getAdminUsers(this.count, this.access_token)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.users = data.data;
        console.log("users", this.users)
      })
      .catch((error: any) => {
        this.spinnerService.hide()
      });
  }

  ngOnInit() { }

  changeType(id: any, index: any) {
    let formdata = {
      // account_type: 0
      admin_type: 4
    }
    this.adminService.updateAdminUsers(id, formdata)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        if (data.status == 200) {
          this.users.splice(index, 1)
          this.successMessage = "User successfully removed from admin.";
          setTimeout(() => {
            this.successMessage = '';
          }, 3000)
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide()
      });
  }

}
