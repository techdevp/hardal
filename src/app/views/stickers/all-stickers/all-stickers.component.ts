import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { OrderByPipe } from "../../../services/orderby";
import { Pipe } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-all-stickers',
  templateUrl: './all-stickers.component.html',
  styleUrls: ['./all-stickers.component.scss']
})
@Pipe({ name: 'orderBy', pure: false })
export class AllStickersComponent implements OnInit {
  temp_array = [];

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
  show_msg: any;
  order: String = '';
  orderby: String = "created"
  all_stickers = [];
  sticker_url = GlobalVariable.STICKER_IMAGE_URL;
  constructor(public _user: UsersService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.spinnerService.show();
    this.order = 'true'
    this.orderby = 'created'
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data
        this.spinnerService.hide();
        console.log(this.all_stickers)

        // for (let i = 0; i <= this.all_stickers.length; i++) {
        //   if (this.all_stickers[i].filesize < 1024) {
        //     this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  showActive() {
    if (this.temp_object.status_active == true) {
      return false;
    }
    this.temp_array = [];

    this._user.getAllStickers()
      .then((data: any) => {
        this.temp_array = data
        console.log(this.temp_array)

        // for (let i = 0; i < this.temp_array.length; i++) {
        //   if (this.temp_array[i].filesize < 1024) {
        //     this.temp_array[i].filesize = this.temp_array[i].filesize + 'bytes';
        //
        //   } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
        //     this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //   } else if (this.temp_array[i].filesize > 1048576) {
        //     this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }
        this.all_stickers = [];

        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == true) {
            this.all_stickers.push(this.temp_array[j])
          }
        }
        console.log(this.all_stickers)
        this.orderby = 'created'
        this.order = "true";
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  showPassive() {
    if (this.temp_object.status_passive == true) {
      return false;
    }
    this.temp_array = [];

    this._user.getAllStickers()
      .then((data: any) => {
        this.temp_array = data
        console.log(this.temp_array)

        for (let i = 0; i < this.temp_array.length; i++) {

          if (this.temp_array[i].filesize < 1024) {
            this.temp_array[i].filesize = this.temp_array[i].filesize;


          } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1);


          } else if (this.temp_array[i].filesize > 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1);
          }

        }
        this.all_stickers = [];
        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == false) {
            this.all_stickers.push(this.temp_array[j])
          }
        }
        console.log(this.all_stickers)
        this.orderby = 'created';
        this.order = "true";
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  swapUpAll(id: any) {
    console.log(id)
    let index = this.all_stickers.findIndex(x => x._id == id);

    if (index != 0) {
      console.log("up")
      let temp_obj = this.all_stickers[index];
      this.all_stickers[index] = this.all_stickers[index - 1]
      this.all_stickers[index - 1] = temp_obj
    }
    else {
      return false;
    }
    console.log(this.all_stickers)
    // this._user.swapUpstair(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
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
  swapDownAll(id: any) {
    console.log(id)
    let index = this.all_stickers.findIndex(x => x._id == id);

    if ((index + 1) != this.all_stickers.length) {
      console.log("down")
      let anyobj = this.all_stickers[index];
      this.all_stickers[index] = this.all_stickers[index + 1]
      this.all_stickers[index + 1] = anyobj
    }
    else {
      return false;
    }
    console.log(this.all_stickers)
    // this._user.swapDown(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }

  getAllStickers() {
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data

        console.log(this.all_stickers)

        // for (let i = 0; i <= this.all_stickers.length; i++) {
        //   if (this.all_stickers[i].filesize < 1024) {
        //     this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  doActive(id, status) {
    this._user.activeSticker(id, true)
      .then((data: any) => {
        console.log(data)
        this.getAllStickers();
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
        this.getAllStickers();
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  setByDecId(event) {

    this.order = 'false'
    this.orderby = '_id'

  }
  setByIncId(event) {

    this.order = 'true'
    this.orderby = '_id'
  }
  setByDecSize() {
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data
        this.spinnerService.hide();
        console.log(this.all_stickers)
      })
      .catch((error: any) => {
        console.log(error)
      });
    this.order = 'false'
    this.orderby = 'filesize'
    // for (let i = 0; i <= this.all_stickers.length; i++) {
    //   if (this.all_stickers[i].filesize < 1024) {
    //     this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';
    //
    //
    //   } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
    //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';
    //
    //
    //   } else if (this.all_stickers[i].filesize > 1048576) {
    //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
    //   }
    // }
  }
  setByIncSize() {
    this.order = 'true'
    this.orderby = 'filesize'
  }
  // setByIncDate() {
  //   this.order = 'true'
  //   this.orderby = 'created'
  // }
  // setByDecDate() {
  //   this.order = 'desc'
  //   this.orderby = 'created'
  // }
  getAll() {
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data
        console.log(this.all_stickers)

        // for (let i = 0; i <= this.all_stickers.length; i++) {
        //   if (this.all_stickers[i].filesize < 1024) {
        //     this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';
        //
        //
        //   } else if (this.all_stickers[i].filesize > 1048576) {
        //     this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
        //   }
        // }
        this.order = 'created'
        this.orderby = "true"
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  deleteSticker2(id) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.all_stickers.findIndex(x => x._id == id);
      console.log(index)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.getAllStickers();
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    return false
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
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
  csv() {
    var new_arr = [];
    var arrData = typeof this.all_stickers != 'object' ? JSON.parse(this.all_stickers) : this.all_stickers;
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
}
