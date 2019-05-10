import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  @Input() rating: number;

  users: any;
  user_image_url: any;
  successMessage: any;
  errorMessage: any;
  username_error: any;
  display = 'none';
  count: number = 0;
  search_count: number = 0;
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
  default: any;
  access_token: any;
  search_text: any;
  admin_type: any;
  limit:Number=10;
  sizeOptions:any=[10,20,50,100,1000,2000,5000]


  constructor(private _user: UsersService, public router: Router, private spinnerService: Ng4LoadingSpinnerService, ) {
    this.user_image_url = GlobalVariable.USER_IMAGE_URL;
    this.getUsers();
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.admin_type = this.data.user.admin_type;
  }

  ngOnInit() { }

  checkBlur(data: any) {
    if (!data) {
      this.getUsers();
      this.search_text = '';
      return
    }
  }
  searchUser(data: any) {
    this.spinnerService.show();
    console.log("this.search_count",this.search_count)
    this._user.searchUser(this.search_count, data, this.access_token, '',this.limit)
      .then((data: any) => {
        console.log(data)
        if (data.status == 401) {
          console.log(data.status)
          this.error_msg = 'Failed to authenticate token.';
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        } else if (data && data.data.length) {
          this.users = data.data;
          this.users.forEach((item: any) => {
            if (item.badge_number == 1) {
              this.badge_grey[item._id] = true;
            }
            if (item.badge_number == 2) {
              this.badge_gold[item._id] = true;
            }
          });
          this.search_count=data.data.length;
        }
        else {
          this.error_msg = "No users found !!.";
          this.users = [];
          setTimeout(()=>{
            this.error_msg=''
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

  verifyEmail(userdata: any) {
    this.spinnerService.show();
    this._user.verifyAccount(userdata)
      .then((data: any) => {
        console.log(data)
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

  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('MyTbl').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
  goToProfile(usr) {
    this.router.navigate(['users/profile', usr._id]);
  }
  updateUrl(event, i) {
    console.log(event, i)
    this.users[i].default = './assets/img/avatars/ic_addnew_dummy@3x.png'
  }
  goToReports(user) {
    this.router.navigate(['users/view-report-user']);
  }
  getUsers() {
    this.spinnerService.show();
    this._user.getAllUsers(this.limit)
      .then((data: any) => {
        this.spinnerService.hide();
        this.users = data;
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
        this.spinnerService.hide()
      });
  }
  goNext() {

    if (this.search_text && this.search_count>10) {
      this.spinnerService.show();
      this.search_count = this.search_count + 10;
      this._user.searchUser(this.search_count, this.search_text, this.access_token,'',this.limit)
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
          // this.autoCompleteService.setDynamicList(this.artists);
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else if(!this.search_text) {
        this.spinnerService.show();
      this.count = this.count + 10;
      this._user.getAllUserslimit(this.count,this.limit)
        .then((data: any) => {
          this.users = data;
          this.users.forEach((item: any) => {
            if (item.badge_number == 1) {
              this.badge_grey[item._id] = true;
            }
            if (item.badge_number == 2) {
              this.badge_gold[item._id] = true;
            }
          })
          console.log(this.users);
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }
  goBack() {
    if (this.count > 0 || this.search_count > 0) {
      console.log("this.search_count",this.search_count)
      if (this.search_text && this.search_count>10) {
        this.spinnerService.show();
        this.search_count = this.search_count - 10;
        this._user.searchUser(this.search_count, this.search_text, this.access_token, '',this.limit)
          .then((data: any) => {
            if (data.data && data.data.length) {
              this.users = data.data;
              this.spinnerService.hide();
            }
            // this.autoCompleteService.setDynamicList(this.artists);
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else if(!this.search_text) {
          this.spinnerService.show();
        this.count = this.count - 10;
        this._user.getAllUserslimit(this.count,this.limit)
          .then((data: any) => {
            this.spinnerService.hide();
            this.users = data;
            console.log(this.users);
          })
          .catch((error: any) => {
            this.spinnerService.hide();
          });
      }
    }
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

  ratingMeasure(user, rating) {
    console.log(user, rating)
    console.log(user, rating)
    if (rating == 1) {

      this.badge_gold[user._id] = false;
      this.badge_grey[user._id] = true;

    }
    else if (rating == 2) {

      this.badge_gold[user._id] = true;
      this.badge_grey[user._id] = false;
    }
    else {

      this.badge_gold[user._id] = false;
      this.badge_grey[user._id] = false;
    }

    this.rating = rating;
    this._user.updateBadge(user._id, rating)
      .then((data: any) => {
        console.log('result', data);
        let index = this.users.findIndex(x => x._id == user._id);
        this.users[index].badge_number = rating;
        // this.getUsers();
        this.successMessage = "Profile Updated Successfully!";
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
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
  editUsername(user) {
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
  csv() {
    var new_arr = [];
    var arrData = typeof this.users != 'object' ? JSON.parse(this.users) : this.users;
    var CSV = '';
    console.log(arrData)
    for (var i = 0; i < arrData.length; i++) {
      new_arr.push({ "Username": arrData[i].username, "Name": arrData[i].name, "Email": arrData[i].email, "Post Allowed": arrData[i].posts_allowed,"Followers":arrData[i].followers_count,"Followings":arrData[i].followings_count,"Posts":arrData[i].posts.length, "Reports": arrData[i].reported_count })
    }
    //This condition will generate the Label/Header

    var row = "";

    //This loop will extract the label from 1st index of on array
    for (var index in new_arr[0]) {
      //Now convert each value to string and comma-seprated
      row += index + ',';
    }
    row = row.slice(0, -1);
    //append Label row with line break
    CSV += row + '\r\n';

    //1st loop is to extract each row
    for (var i = 0; i < new_arr.length; i++) {
      var row = "";
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in new_arr[i]) {
        row += '"' + new_arr[i][index] + '",';
      }
      row.slice(0, row.length - 1);
      //add a line break after each row
      CSV += row + '\r\n';
    }

    if (CSV == '') {
      alert("Invalid data");
      return;
    }

    //this trick will generate a temp "a" tag
    var link = document.createElement("a");

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);

    var csv = CSV;
    var blob = new Blob([csv], { type: 'text/csv' });
    var csvURL = window.URL.createObjectURL(blob);
    console.log(csvURL)
    var tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'ActiveEvent_data.csv');
    tempLink.click();

  }

  setPageLimit(limit:any){
     console.log("limit",limit);
     if(limit>0 && !this.search_text){
       this.limit=limit
       this.getUsers();
     }else if(limit>0 && this.search_text){
       this.limit=limit;
       this.searchUser(this.search_text);
     }
     if(!limit){
       this.limit=10;
       this.getUsers();
     }
  }
}
