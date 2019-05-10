import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { OrderByPipe } from "../../../services/orderby";
import { Pipe } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-reposition-sticker-pages',
  templateUrl: './reposition-sticker-pages.component.html',
  styleUrls: ['./reposition-sticker-pages.component.scss']
})
export class RepositionStickerPagesComponent implements OnInit {
  pages: any;
  successMessage: any;
  error_msg: any;
  data: any;
  access_token: any;

  constructor(public _user: UsersService, private spinnerService: Ng4LoadingSpinnerService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
  }

  ngOnInit() {
    this._user.getPageInfo()
      .then((data: any) => {
        this.pages = data;
        console.log("pages", this.pages)
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  swapDownPage(id: any, index: any, index1: any) {
    this.pages[index1 + 1].position = index;
    this.pages[index1].position = index + 1;
    let formdata1 = {
      position: this.pages[index1].position
    }
    let formdata2 = {
      position: this.pages[index1 + 1].position
    }
    this.spinnerService.show();
    this._user.editPagePosition(formdata1, this.access_token, this.pages[index1]._id)
      .then((data: any) => {
        if (data.status == 200) {
          this._user.editPagePosition(formdata2, this.access_token, this.pages[index1 + 1]._id)
            .then((data: any) => {
              if (data.status == 200) {
                let temp = this.pages[index1 + 1];
                this.pages[index1 + 1] = this.pages[index1];
                this.pages[index1] = temp;
                this.successMessage = "You have successfully reorder the stikcer pages.";
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000)
              }
              else {
                this.error_msg = "Some issue in sticker pages reordering.";
                setTimeout(() => {
                  this.error_msg = '';
                }, 3000)
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
        else {
          this.error_msg = "Some issue in sticker pages reordering.";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });

  }
  swapUpPage(id: any, index: any, index1: any) {
    this.pages[index1 - 1].position = index;
    this.pages[index1].position = index - 1;
    let formdata1 = {
      position: this.pages[index1].position
    }
    let formdata2 = {
      position: this.pages[index1 - 1].position
    }

    this._user.editPagePosition(formdata1, this.access_token, this.pages[index1]._id)
      .then((data: any) => {
        console.log("data", data)
        if (data.status == 200) {
          this._user.editPagePosition(formdata2, this.access_token, this.pages[index1 - 1]._id)
            .then((data: any) => {
              if (data.status == 200) {
                let temp = this.pages[index1 - 1];
                this.pages[index1 - 1] = this.pages[index1];
                this.pages[index1] = temp;
                this.successMessage = "You have successfully reorder the sticker pages.";
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000)
              } else {
                this.error_msg = "Some issue in sticker pages reordering.";
                setTimeout(() => {
                  this.error_msg = '';
                }, 3000)
              }
              this.spinnerService.hide();
            })
            .catch((error: any) => {
              console.log(error);
              this.spinnerService.hide();
            });
        } else {
          this.error_msg = "Some issue in sticker pages reordering.";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  doActive(id, status) {
    let formdata = {
      status: !status
    }
    this._user.editPagePosition(formdata, this.access_token, id)
      .then((data: any) => {
        console.log(data);
        let index = this.pages.findIndex(x => x._id == id);
        this.pages[index].status = !status
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  doPassive(id, status) {
    let formdata = {
      status: !status
    }
    this._user.editPagePosition(formdata, this.access_token, id)
      .then((data: any) => {
        console.log(data)
        let index = this.pages.findIndex(x => x._id == id);
        this.pages[index].status = !status
      })
      .catch((error: any) => {
        console.log(error)
      })
  }
}
