import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-yellow_badge',
  templateUrl: './yellow_badge.component.html',
  styleUrls: ['./yellow_badge.component.scss']
})
export class YellowComponent implements OnInit {
  @Input() rating: number;

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
  badge_grey: any = [];
  badge_gold: any = [];
  error_msg: any;
  search_text: any;
  admin_type: any;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private _user: UsersService, public router: Router) {
    this.user_image_url = GlobalVariable.USER_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.admin_type = this.data.user.admin_type;
    this.getUsers();
  }

  ngOnInit() { }

  goToProfile(usr) {
    this.router.navigate(['users/profile', usr._id]);
  }
  goToReports(user) {
    this.router.navigate(['users/reports']);
  }
  getUsers() {
    this.spinnerService.show()
    this._user.getUserByBadge(this.count, 2)
      .then((data: any) => {
        this.spinnerService.hide();
        this.users = data.data.users;
        this.total_count = data.data.count;
        console.log(this.users);
        this.users.forEach((item: any) => {
          if (item.badge_number == 1) {
            this.badge_grey[item._id] = true;
          }
          if (item.badge_number == 2) {
            this.badge_gold[item._id] = true;
          }
        })

      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }
  goNext() {
    console.log("total", this.total_count)
    if (this.count < this.total_count && this.total_count != this.count) {
      this.count = this.count + 10;
      this.spinnerService.show();
      this._user.getUserByBadge(this.count, 2)
        .then((data: any) => {
          this.spinnerService.hide();
          if (data.data && data.data.users && data.data.users.length) {
            if (data.data && data.data.users && data.data.users.length) {
              this.users = data.data.users;
              this.users.forEach((item: any) => {
                if (item.badge_number == 1) {
                  this.badge_grey[item._id] = true;
                }
                if (item.badge_number == 2) {
                  this.badge_gold[item._id] = true;
                }
              })
            }
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }
  checkBlur(data: any) {
    if (!data) {
      this.getUsers();
      this.search_text = '';
      return
    }
  }

  goBack() {
    if (this.count > 0 && this.total_count != this.count) {
      this.spinnerService.show();
      this.count = this.count - 10;
      this._user.getUserByBadge(this.count, 2)
        .then((data: any) => {
          this.spinnerService.hide();
          if (data.data && data.data.users && data.data.users.length) {
            this.users = data.data.users;
            this.users.forEach((item: any) => {
              if (item.badge_number == 1) {
                this.badge_grey[item._id] = true;
              }
              if (item.badge_number == 2) {
                this.badge_gold[item._id] = true;
              }
            })
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();;
          console.log(error)
        });
    }
  }

  searchUser(data: any) {
    this.spinnerService.show();
    this._user.searchUser(this.search_count, data, this.access_token, 2,10)
      .then((data: any) => {
        console.log(data)
        if (data.status == 401) {
          console.log(data.status)
          this.error_msg = 'Failed to authenticate token.';
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        } else {
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

  updateUsername(userdata: any, username: any, form: any, i: any) {
    if (!username) {
      this.error_msg = "*Please enter Username."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    else if (!username.match(/^[a-zA-Z0-9_]*$/)) {
      this.error_msg = "*Username must contain a-z,A-Z,0-9 and _ "
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    else if (username.length < 2) {
      this.error_msg = "*Username must contain atleast 2 characters."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    else if (username.length > 16) {
      this.error_msg = "*Username must contain atmost 16 characters."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    this.spinnerService.show();
    this._user.checkUsername(username)
      .then((res: any) => {
        this.error_msg = '';
        let data = { username: username };
        let id = userdata._id;
        let token = userdata.token;
        this._user.updateUsername(id, data, this.access_token)
          .then((data: any) => {
            this.spinnerService.hide();
            if (data.status == 401) {
              console.log(data.status)
              this.error_msg = 'Failed to authenticate token.';
              setTimeout(() => {
                this.error_msg = '';
              }, 3000)
            }
            else {
              this.usernameEdit[i] = !this.usernameEdit[i]
              this.successMessage = 'Username updated successfully!';
              let index = this.users.findIndex(x => x._id == userdata._id)
              this.users[index].username = username;
              setTimeout(() => {
                this.successMessage = '';
              }, 3000);
            }
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            this.error_msg = 'An error occured while updating username';
            setTimeout(() => {
              this.error_msg = '';
            }, 3000)
            console.log(error);
          });
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.error_msg = "This username is already taken.";
        setTimeout(() => {
          this.error_msg = '';
        }, 3000);
        console.log(error);
        return
      })
  }

  updatename(userdata: any, name: any, form: any, i: any) {
    if (!name) {
      this.error_msg = "*Please enter Username."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    else if (name.length < 2) {
      this.error_msg = "*Name must contain atleast 2 characters."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    else if (name.length > 30) {
      this.error_msg = "*Name must contain atmost 30 characters."
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    this.error_msg = '';
    let data = { name: name };
    let id = userdata._id;
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
          this.nameEdit[i] = !this.nameEdit[i]
          this.successMessage = 'Name updated successfully!';
          let index = this.users.findIndex(x => x._id == userdata._id)
          this.users[index].name = name;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        this.error_msg = 'An error occured while updating name';
        setTimeout(() => {
          this.error_msg = '';
        }, 3000)
        console.log(error);
      });
  }

  deleteRecord(id) {
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

  updateuser(userdata: any, status: any) {
    let data = { status: status };
    // let data = { is_verified: false };
    let id = userdata._id;
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
          this.users[index].status = status;
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
  ratingMeasure(user, rating) {
    console.log(user, rating)
    if (rating == 1) {
      this.badge_gold[user._id] = true;
      this.badge_grey[user._id] = false;
    }
    else if (rating == 2) {
      this.badge_gold[user._id] = false;
      this.badge_grey[user._id] = true;
    }

    this.rating = rating;
    this._user.updateBadge(user._id, rating)
      .then((data: any) => {
        // this.badge = data;
        this.successMessage = "Profile Updated Successfully!";
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        let index = this.users.findIndex(x => x._id == user._id);
        this.users.splice(index, 1)
        // console.log(this.badge);
      })
      .catch((error: any) => {
        console.log(error);
      });

  }

  savePostAllowed(user, post) {
    if (!post.match(/^[0-9]*$/)) {
      this.error_msg = "*Post Allowed must be in digits"
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      return false;
    }
    this.isEdit[user._id] = false;
    this.edit = false;
    this._user.savePostLimit(user._id, post)
      .then((data: any) => {
        this.setLimit = data;
        this.successMessage = "Profile Updated Successfully!";
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        console.log(this.setLimit);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  editPosts(user) {
    this.isEdit[user._id] = true;
    this.data = user;
    this.edit = true;
  }

  onCloseHandled() {
    this.display = 'none';
  }

  openModal() {
    this.display = 'block';
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

}
