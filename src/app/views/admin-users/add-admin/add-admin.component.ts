import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from '../../../services/admin/admin.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from '../../../app.global';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  selected_role: any = "Select role";
  error_msg: any;
  errormsg: any;
  role: boolean = false;
  admin_type: number = 0;
  successMessage: any;
  id: any;
  user: any;
  title: any;

  constructor(private _location: Location,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private spinnerService: Ng4LoadingSpinnerService) {
    this.route.params.subscribe((id: any) => {
      this.id = id.id;
      if (this.id != "add") {
        this.title = "View Admin";
        this.adminService.getDetails(this.id, )
          .then((data: any) => {
            this.user = data.user;
            this.admin_type = this.user.admin_type;
            if (data.user.admin_type == 2) {
              this.selected_role = "Admin user";
            } else {
              this.selected_role = "Layout admin user"
            }
            this.spinnerService.hide()
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide()
          });
      }
      else {
        this.title = "ADD NEW ADMIN USERS"
      }
    })
  }

  ngOnInit() { }

  setRole(data: any) {
    this.selected_role = data;
    if (data == 'Admin user') {
      this.admin_type = 2;
    }
    else {
      this.admin_type = 3;
    }
    this.errormsg = ''
  }
  backClicked() {
    this._location.back();
  }

  focuesd() {
    this.errormsg = '';
  }
  submitForm(data, form) {
    this.errormsg = '';
    if (!data.email) {
      this.errormsg = "* Please enter email. "
      return false;
    }
    if (form.form.status == "INVALID") {
      this.errormsg = "* Please enter a valid email e.g abc@gmail.com."
      return false;
    }
    var myemail = form.value.email;
    if (!/@gmail.com\s*$/.test(myemail)) {
      this.errormsg = "* Email is not valid google account.";
      return false;;
    }
    if (this.admin_type == 0) {
      this.errormsg = "* Please select the admin role.";
      return false;;
    }
    let formdata = {
      email: form.value.email,
      admin_type: this.admin_type
    }
    this.spinnerService.show();
    this.adminService.addAdminUsers(formdata)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          setTimeout(() => {
            this.errormsg = '';
          }, 3000)
        }
        if (data.status == 200) {
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000)
        }
        form.reset();
      })
      .catch((error: any) => {
        this.spinnerService.hide()
      });
  }
  update(data: any) {
    let formdata = {
      admin_type: this.admin_type
    }
    this.adminService.updateAdminUsers(this.user._id, formdata)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          setTimeout(() => {
            this.errormsg = '';
          }, 3000)
        }
        if (data.status == 200) {
          this.successMessage = data.message;
          this.user.admin_type = this.admin_type;
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
