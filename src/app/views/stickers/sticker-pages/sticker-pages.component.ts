import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { OrderByPipe } from "../../../services/orderby";
import { Pipe } from '@angular/core';


@Component({
  selector: 'app-sticker-pages',
  templateUrl: './sticker-pages.component.html',
  styleUrls: ['./sticker-pages.component.scss']
})
export class StickerPagesComponent implements OnInit {
  temp_object: any = {
    all: false,
    dec_id: false,
    inc_id: false,
    dec_db: false,
    inc_db: false,
    dec_created_date: false,
    inc_created_date: false,
    user_inc: false,
    user_dec: false,
    edit_date: false,
    used_post_dec: false,
    used_post_inc: false,
    status_active: false,
    status_passive: false,
    platform_dec: false,
    platform_inc: false,
    ios: false,
    android: false,
    browser: false
  };
  page_id: any;
  selected_file_sticker: any;
  page_info: any;
  sticker_url: any;
  show_msg: any;
  table_array = [];
  selected_page: any;
  edit_sticker = [];
  order: String = "true";
  orderby: String = "created"
  temp_array = [];
  anyobj: any;
  temp_obj: any;
  constructor(public _user: UsersService) { }

  ngOnInit() {
    console.log(this.temp_object)
    this._user.getPageInfo()
      .then((data: any) => {
        this.page_info = data;
      })
      .catch((error: any) => {
        console.log(error)
      });
    this.sticker_url = GlobalVariable.STICKER_IMAGE_URL;
  }
  csvPage() {
    var new_arr = [];
    var arrData = typeof this.selected_file_sticker != 'object' ? JSON.parse(this.selected_file_sticker) : this.selected_file_sticker;
    var CSV = '';
    console.log(arrData)
    for (var i = 0; i < arrData.length; i++) {
      new_arr.push({ "ID": arrData[i]._id, "FILESIZE": arrData[i].filesize, "CREATED DATE": arrData[i].created })
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
  setByDecIdPage(event) {
    this.order = "false"
    this.orderby = '_id'
  }
  setByIncIdPage(event) {
    this.order = "true"
    this.orderby = '_id'
  }
  setByDecSizePage() {
    this.order = "false"
    this.orderby = 'filesize'
  }
  setByIncSizePage() {
    this.order = "true"
    this.orderby = 'filesize'
  }
  deletePage(id) {
    var choice = confirm('Do you really want to delete this Page?');
    if (choice === true) {
      console.log(id)
      let index = this.page_info.findIndex(x => x._id == id);
      this.page_info.splice(index, 1)
      this._user.deletePage(id)
        .then((data: any) => {

          console.log(data)
          this.show_msg = "Page deleted successfully"
          setTimeout(() => {
            this.show_msg = '';
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    return false;
  }
  doActive(id, status) {
    this._user.activeSticker(id, true)
      .then((data: any) => {
        console.log(data)
        this.getPageDetail(this.page_id);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  doPassive(id, status) {

    console.log(id, status)
    this._user.deactiveSticker(id, false)
      .then((data: any) => {
        console.log(data)
        this.getPageDetail(this.page_id);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  showActivePage() {
    if (this.temp_object.status_active == true) {
      return false;
    }
    this.temp_array = [];

    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.temp_array = data;

        this.selected_file_sticker = [];
        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == true) {
            this.selected_file_sticker.push(this.temp_array[j])
          }
        }
        this.orderby = "created";
        this.order = "true";
        console.log(this.selected_file_sticker)

      })
      .catch((error: any) => {
        console.log(error)
      });

  }
  showPassivePage() {
    if (this.temp_object.status_passive == true) {
      return false;
    }
    this.temp_array = [];

    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.temp_array = data;
        this.selected_file_sticker = [];
        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == false) {
            this.selected_file_sticker.push(this.temp_array[j])
          }
        }
        this.orderby = "created"
        this.order = "true"
        console.log(this.selected_file_sticker)

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  setByIncDate() {
    this.order = "true"
    this.orderby = 'created'
  }
  setByDecDate() {
    this.order = "false"
    this.orderby = 'created'
  }
  deleteSticker(id: any, pageid: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.selected_file_sticker.findIndex(x => x._id == id);
      this.selected_file_sticker.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.getPageDetail(this.page_id)
          this.show_msg = "Sticker deleted successfully"
          setTimeout(() => {
            this.show_msg = '';
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    return false;
  }
  allStickers() {
    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.selected_file_sticker = data;
        console.log(this.selected_file_sticker)
        // for (let i = 0; i <= this.selected_file_sticker.length; i++) {
        //   if (this.selected_file_sticker[i].filesize < 1024) {
        //     this.selected_file_sticker[i].filesize = this.selected_file_sticker[i].filesize + 'bytes';
        //
        //
        //   } else if (this.selected_file_sticker[i].filesize > 1024 && this.selected_file_sticker[i].filesize < 1048576) {
        //     this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //
        //   } else if (this.selected_file_sticker[i].filesize > 1048576) {
        //     this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }
        this.order = 'created'
        this.orderby = "true"
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  getAllPage(value: any) {
    for (let key in this.temp_object) {
      if (key == value) {
        this.temp_object[key] = true;
      } else {
        this.temp_object[key] = false;
      }
    }
    console.log(this.temp_object);


  }
  swapDownPage(id: any) {
    console.log(id)
    let index = this.selected_file_sticker.findIndex(x => x._id == id);
    console.log("down", index)
    if ((index + 1) != this.selected_file_sticker.length) {
      console.log("down")
      this.anyobj = this.selected_file_sticker[index];
      this.selected_file_sticker[index] = this.selected_file_sticker[index + 1]
      this.selected_file_sticker[index + 1] = this.anyobj
      console.log(this.selected_file_sticker)
      this._user.swapDown(id)
        .then((data: any) => {
          console.log(data)
          // this.getPageDetail(this.page_id)
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    else {
      return false;
    }

  }
  swapUpPage(id: any) {
    console.log(id)
    let index = this.selected_file_sticker.findIndex(x => x._id == id);
    console.log(index)
    if (index != 0) {
      console.log("up")
      this.temp_obj = this.selected_file_sticker[index];
      this.selected_file_sticker[index] = this.selected_file_sticker[index - 1]
      this.selected_file_sticker[index - 1] = this.temp_obj
      console.log(this.selected_file_sticker)
      this._user.swapUpstair(id)
        .then((data: any) => {
          console.log(data)
          // this.getPageDetail(this.page_id)

        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    else {
      return false;
    }
    console.log(this.selected_file_sticker)

  }
  getPageDetail(id) {
    this.page_id = id;
    console.log(id)

    this._user.getStickers(id)
      .then((data: any) => {
        this.selected_file_sticker = data;
        this.edit_sticker = data;
        // for (let i = 0; i <= this.selected_file_sticker.length; i++) {
        //   if (this.selected_file_sticker[i].filesize < 1024) {
        //     this.selected_file_sticker[i].filesize = this.selected_file_sticker[i].filesize + 'bytes';
        //
        //
        //   } else if (this.selected_file_sticker[i].filesize > 1024 && this.selected_file_sticker[i].filesize < 1048576) {
        //     this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //
        //   } else if (this.selected_file_sticker[i].filesize > 1048576) {
        //     this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
}
