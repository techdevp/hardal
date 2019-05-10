import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-report-users',
  templateUrl: './report-users.component.html',
  styleUrls: ['./report-users.component.scss']
})
export class ReportUsersComponent implements OnInit {

  users: any;
  user_image_url: any;
  successMessage: any;
  display = 'none';
  count: number = 0;
  search_count: number = 0;
  access_token: any;
  total_count: number = 0;
  edit: boolean = false;
  setLimit: boolean = true;
  data: any;
  isEdit: any = [];
  nameEdit: any = [];
  usernameEdit: any = [];
  isBadge: any = [];
  badge: any = [];
  badge_gold: any = [];
  badge_grey: any = [];
  error_msg: any;
  admin_type: any;
  search_text: any;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private _user: UsersService, public router: Router) {
    this.user_image_url = GlobalVariable.USER_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.admin_type = this.data.user.admin_type;
    this.spinnerService.show();
    this._user.getReportedUsers(this.access_token, this.count)
      .then((data: any) => {
        this.spinnerService.hide();
        this.users = data.data;
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.total_count = data.count;
        console.log(data);
        this.users.forEach((item: any, index: any) => {
          this.badge[index] = item.badge_number;
        })
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() {
  }

  searchUser(data: any) {
    this.spinnerService.show();
    if (this.search_text) {
      this._user.searchReportedUser(this.search_count, data, this.access_token, '')
        .then((data: any) => {
          console.log(data)
          if (data.status == 401) {
            console.log(data.status)
            this.error_msg = 'Failed to authenticate token.';
            setTimeout(() => {
              this.error_msg = '';
            }, 3000)
          } else {
            if (data && data.data && data.data.length) {
              this.users = data.data;
              this.users.forEach((item: any, index: any) => {
                this.badge[index] = item.badge_number;
              });
              this.search_count = data.count;
            } else {
              this.users = [];
              this.total_count = 0;
              this.error_msg = 'No users found !!';
              setTimeout(() => {
                this.error_msg = '';
              }, 3000);

            }
          }
          this.spinnerService.hide();
          this.usernameEdit = [];
          this.nameEdit = [];
          // this.autoCompleteService.setDynamicList(this.artists);
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      this.count = 0;
      this._user.getReportedUsers(this.access_token, this.count)
        .then((data: any) => {
          this.spinnerService.hide();
          this.users = data.data;
          this.total_count = data.count;
          console.log(data);
          this.users.forEach((item: any, index: any) => {
            this.badge[index] = item.badge_number;
          })
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }
  updateuser(userdata: any, status: any) {
    let data = { status: status };
    // let data = { is_verified: false };
    let id = userdata.to._id;
    this.spinnerService.show();
    this._user.updateUsername(id, data, this.access_token)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Failed to authenticate token.';
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        else {
          let index = this.users.findIndex(x => x._id == userdata._id)
          this.users[index].to.status = status;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.error_msg = 'An error occured while ' + status;
        setTimeout(() => {
          this.error_msg = '';
        }, 3000)
        console.log(error);
      });
  }

  verifyEmail(userdata: any) {
    this.spinnerService.show();
    this._user.verifyAccount(userdata)
      .then((data: any) => {
        this.spinnerService.hide();
        if (data.status == 401) {
          this.error_msg = 'Failed to authenticate token.';
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        else {
          this.successMessage = 'Email verification sent successfully!';
          let index = this.users.findIndex(x => x._id == userdata)
          this.users[index].is_verified = '';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.error_msg = 'An error occured while verifying email';
        setTimeout(() => {
          this.error_msg = '';
        }, 3000)
        console.log(error);
      });
  }

  deleteRecord(id) {
    console.log(id)
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      let index = this.users.findIndex(x => x._id == id);

      if (index !== -1) {
        this.users.splice(index, 1);
      }
      console.log(index);

      this._user.deleteUserRecord(id)
        .then((data: any) => {
          console.log(data)

          this.successMessage = "Record deleted successfully!";
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

        })
        .catch((error: any) => {
          console.log(error)
        });
      return true;
    }
    return false;
  }

  goNext() {

    if (this.search_text) {
      this.search_count = this.search_count + 10;
      this.spinnerService.show();
      this._user.searchReportedUser(this.search_count, this.search_text, this.access_token, '')
        .then((data: any) => {
          this.spinnerService.hide();
          if (data.data && data.data.length) {
            this.users = data.data;
            this.users.forEach((item: any) => {
              if (item.badge_number == 1) {
                this.badge_grey[item._id] = true;
              }
              if (item.badge_number == 2) {
                this.badge_gold[item._id] = true;
              }
            })
          }
          else {
            // this.error_msg = 'No users found !!';
            // setTimeout(() => {
            //   this.error_msg = '';
            // }, 3000);
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      this.count = this.count + 10;
      if (this.count < this.total_count) {
        this.spinnerService.show();
        this._user.getReportedUsers(this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide();
            this.users = data.data;
            this.total_count = data.count;
            console.log(data);
            this.users.forEach((item: any, index: any) => {
              this.badge[index] = item.badge_number;
            })
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
    }
  }
  goBack() {
    if (this.count > 0 || this.search_count > 0) {
      this.spinnerService.show();
      if (this.search_text) {
        this.search_count = this.search_count - 10;
        this._user.searchUser(this.search_count, this.search_text, this.access_token, '',10)
          .then((data: any) => {
            this.spinnerService.hide();
            if (data.data && data.data.length) {
              this.users = data.data;
            }
            else {
              // this.error_msg = 'No users found !!';
              // setTimeout(() => {
              //   this.error_msg = '';
              // }, 3000);
            }

            // this.autoCompleteService.setDynamicList(this.artists);
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else {
        this.count = this.count - 10;
        this._user.getReportedUsers(this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide();
            this.users = data.data;
            this.total_count = data.count;
            console.log(data);
            this.users.forEach((item: any, index: any) => {
              this.badge[index] = item.badge_number;
            })
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
    }
  }

}
