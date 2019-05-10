import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../services/users/users.service';
import { GlobalVariable } from '../../app.global';
import { OrderByPipe } from "../../services/orderby";
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-stickers',
  templateUrl: './stickers.component.html',

  styleUrls: ['./stickers.component.scss']

})
@Pipe({ name: 'orderBy', pure: false })
export class StickersComponent implements OnInit {
  count: number = 0;
  max: number = 10;
  order: string = '';
  local_pag = [];
  fillcolor: boolean = false;
  orderby: any;
  arr = [];
  unpublished_arr = [];
  temp_array = [];
  published_arr = [];
  files: any;
  gotIndex: any;
  created_data: any;
  filename2: any;
  filesToUpload: Array<File> = [];
  selected_file: any;
  selected: boolean = false;
  selected_page: any;
  filesToUploadSticker: Array<File> = [];
  selected_file_sticker: any;
  editedData: any;
  index: any;
  selected_sticker: boolean = false;
  sticker_url: any;
  alertMessage: any;
  hide_more: boolean = false;
  formdata: any;
  page_id: any;
  filename: any;
  page_info: any;
  edit_page: boolean = false;
  show_sticker: boolean = true;
  all_sticker: boolean = true;
  pageDetail: boolean = false;
  new_sticker: boolean = false;
  create_Page: boolean = false;
  page: any;
  filename_edited: any;
  edit_sticker: any;
  blank: any = [];
  files_array = [];
  url: any;
  table_array = [];
  id: any;
  selectedPage: any;
  show_msg: any;
  info_msg: any;
  all_stickers: any = [];
  table_data = [];
  updated_data: any;
  temp_obj: any;
  status: any;
  constructor(public _user: UsersService) {
    console.log("m in constructor")

  }
  // print(): void {
  //   let printContents, popupWin;
  //   printContents = document.getElementById('print-section').innerHTML;
  //   popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
  //   popupWin.document.open();
  //   popupWin.document.write(`
  //     <html>
  //       <head>
  //         <title>Print tab</title>
  //         <style>
  //         //........Customized style.......
  //         </style>
  //       </head>
  //   <body onload="window.print();window.close()">${printContents}</body>
  //     </html>`
  //   );
  //   popupWin.document.close();
  // }
  goNext() {
    if (this.max < this.all_stickers.length) {
      this.local_pag = [];
      console.log("count", this.count)
      console.log("max", this.max)
      this.count = this.count + 10;

      this.max = this.max + 10;
      for (let i = this.count; i < this.max; i++) {
        this.local_pag.push(this.all_stickers[i])
      }
    }
  }
  // this._user.getAllUserslimit(this.count)
  //   .then((data: any) => {
  //     this.all_stickers = data;
  //     console.log(this.all_stickers);
  //   })
  //   .catch((error: any) => {
  //
  //   });

  goBack() {
    this.local_pag = [];
    if (this.count > 10) {
      this.count = this.count - 10;
      this.max = this.max - 10;
      for (let i = this.count; i < this.max; i++) {
        this.local_pag.push(this.all_stickers[i])
      }
    }
    // if (this.count > 0) {
    //   this.count = this.count - 10;
    //   this._user.getAllUserslimit(this.count)
    //     .then((data: any) => {
    //       this.all_stickers = data;
    //       console.log(this.all_stickers);
    //     })
    //     .catch((error: any) => {
    //
    //     });
    // }
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
  setByDecId(event) {

    this.order = 'desc'
    this.orderby = '_id'

  }
  setByIncId(event) {

    this.order = 'asc'
    this.orderby = '_id'
  }
  setByDecSize() {
    this.order = 'desc'
    this.orderby = 'filesize'
  }
  setByIncSize() {
    this.order = 'asc'
    this.orderby = 'filesize'
  }
  getAll() {
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data
        console.log(this.all_stickers)

        for (let i = 0; i <= this.all_stickers.length; i++) {
          if (this.all_stickers[i].filesize < 1024) {
            this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';


          } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
            this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.all_stickers[i].filesize > 1048576) {
            this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }
        this.order = 'filesize'
        this.orderby = "asc"
      })
      .catch((error: any) => {
        console.log(error)
      }); ''
  }
  showActive() {
    this.temp_array = [];
    this.all_stickers = [];

    this._user.getAllStickers()
      .then((data: any) => {
        this.temp_array = data
        console.log(this.temp_array)

        for (let i = 0; i < this.temp_array.length; i++) {

          if (this.temp_array[i].filesize < 1024) {
            this.temp_array[i].filesize = this.temp_array[i].filesize + 'bytes';


          } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.temp_array[i].filesize > 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1) + 'MB';
          }

        }
        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == true) {
            this.all_stickers.push(this.temp_array[j])
          }
        }
        console.log(this.all_stickers)
        this.orderby = 'filesize'
        this.order = 'desc'
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  showPassive() {
    this.temp_array = [];
    this.all_stickers = [];

    this._user.getAllStickers()
      .then((data: any) => {
        this.temp_array = data
        console.log(this.temp_array)

        for (let i = 0; i < this.temp_array.length; i++) {

          if (this.temp_array[i].filesize < 1024) {
            this.temp_array[i].filesize = this.temp_array[i].filesize + 'bytes';


          } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.temp_array[i].filesize > 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1) + 'MB';
          }

        }
        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == false) {
            this.all_stickers.push(this.temp_array[j])
          }
        }
        console.log(this.all_stickers)
        this.orderby = 'filesize'
        this.order = 'asc'
      })
      .catch((error: any) => {
        console.log(error)
      });
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
    this.order = 'desc'
    this.orderby = '_id'
  }
  setByIncIdPage(event) {
    this.order = 'asc'
    this.orderby = '_id'
  }
  setByDecSizePage() {
    this.order = 'desc'
    this.orderby = 'filesize'
  }
  setByIncSizePage() {
    this.order = 'asc'
    this.orderby = 'filesize'
  }
  getAllPage() {
    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.selected_file_sticker = data;

        for (let i = 0; i <= this.selected_file_sticker.length; i++) {
          if (this.selected_file_sticker[i].filesize < 1024) {
            this.selected_file_sticker[i].filesize = this.selected_file_sticker[i].filesize + 'bytes';


          } else if (this.selected_file_sticker[i].filesize > 1024 && this.selected_file_sticker[i].filesize < 1048576) {
            this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.selected_file_sticker[i].filesize > 1048576) {
            this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }
        this.order = 'filesize'
        this.orderby = "asc"
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  showActivePage() {
    this.temp_array = [];
    this.selected_file_sticker = [];
    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.temp_array = data;

        for (let i = 0; i < this.temp_array.length; i++) {
          if (this.temp_array[i].filesize < 1024) {
            this.temp_array[i].filesize = this.temp_array[i].filesize + 'bytes';


          } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.temp_array[i].filesize > 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }

        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == true) {
            this.selected_file_sticker.push(this.temp_array[j])
          }
        }
        this.orderby = "created";
        this.order = "asc";
        console.log(this.selected_file_sticker)

      })
      .catch((error: any) => {
        console.log(error)
      });

  }
  showPassivePage() {
    this.temp_array = [];
    this.selected_file_sticker = [];
    this._user.getStickers(this.page_id)
      .then((data: any) => {
        this.temp_array = data;

        for (let i = 0; i < this.temp_array.length; i++) {
          if (this.temp_array[i].filesize < 1024) {
            this.temp_array[i].filesize = this.temp_array[i].filesize + 'bytes';


          } else if (this.temp_array[i].filesize > 1024 && this.temp_array[i].filesize < 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.temp_array[i].filesize > 1048576) {
            this.temp_array[i].filesize = (this.temp_array[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }

        for (let j = 0; j < this.temp_array.length; j++) {
          if (this.temp_array[j].status == false) {
            this.selected_file_sticker.push(this.temp_array[j])
          }
        }
        this.orderby = "created"
        this.order = "asec"
        console.log(this.selected_file_sticker)

      })
      .catch((error: any) => {
        console.log(error)
      });

  }

  ngOnInit() {
    this.order = 'asec'
    this.orderby = 'filesize'
    this._user.getAllStickers()
      .then((data: any) => {
        this.all_stickers = data
        for (let j = this.count; j < this.max; j++) {
          this.local_pag.push(this.all_stickers[j])
        }
        console.log("local", this.local_pag)
        console.log(this.all_stickers)

        for (let i = 0; i <= this.all_stickers.length; i++) {
          if (this.all_stickers[i].filesize < 1024) {
            this.all_stickers[i].filesize = this.all_stickers[i].filesize + 'bytes';


          } else if (this.all_stickers[i].filesize > 1024 && this.all_stickers[i].filesize < 1048576) {
            this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.all_stickers[i].filesize > 1048576) {
            this.all_stickers[i].filesize = (this.all_stickers[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }
        for (let j = this.count; j < this.max; j++) {
          this.local_pag.push(this.all_stickers[j])
        }
        console.log("local", this.local_pag)
      })
      .catch((error: any) => {
        console.log(error)
      });
    this._user.getPageInfo()
      .then((data: any) => {
        this.page_info = data;
      })
      .catch((error: any) => {
        console.log(error)
      });
    this.sticker_url = GlobalVariable.STICKER_IMAGE_URL;
  }
  deleteCreated(id: any, pageid: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.table_data.findIndex(x => x._id == id);
      this.table_data.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.table_array.splice(index, 1)
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
  deleteEdit(id: any, pageid: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.edit_sticker.findIndex(x => x._id == id);
      this.edit_sticker.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.table_array.splice(index, 1)
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
  deleteNew(id: any, pageid: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.table_data.findIndex(x => x._id == id);
      this.table_data.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.table_array.splice(index, 1)
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
  deleteSticker(id: any, pageid: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.selected_file_sticker.findIndex(x => x._id == id);
      this.selected_file_sticker.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
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
  swapDownAll(id: any) {
    console.log(id)
    let index = this.all_stickers.findIndex(x => x._id == id);
    let anyobj = this.all_stickers[index];
    if (this.all_stickers[index] != this.all_stickers.length) {
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
  swapUpNew(id: any) {
    console.log(id)
    let index = this.table_data.findIndex(x => x._id == id);
    let temp_obj = this.table_data[index];
    if (index != 0) {
      this.table_data[index] = this.table_data[index - 1]
      this.table_data[index - 1] = temp_obj
    }
    else {
      return false;
    }
    console.log(this.table_data)
    // this._user.swapUpstair(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }
  swapDownNew(id: any) {
    // console.log(id)
    // let index = this.table_data.findIndex(x => x._id == id);
    //
    // if (index + 1) != this.table_data.length) {
    //   let anyobj = this.table_data[index];
    //   this.table_data[index] = this.table_data[index + 1]
    //   this.table_data[index + 1] = anyobj
    // }
    // else {
    //   return false;
    // }
    // console.log(this.table_data)
    // this._user.swapDown(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }
  swapUpAll(id: any) {
    console.log(id)
    let index = this.all_stickers.findIndex(x => x._id == id);

    if (index != 0) {
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
  swapDownEdit(id: any) {
    console.log(id)
    let index = this.edit_sticker.findIndex(x => x._id == id);

    if (this.edit_sticker[index] != this.edit_sticker.length) {
      let anyobj = this.edit_sticker[index];
      this.edit_sticker[index] = this.edit_sticker[index + 1]
      this.edit_sticker[index + 1] = anyobj
    }
    else {
      return false;
    }
    console.log(this.edit_sticker)
    // this._user.swapDown(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }

  swapUpPage(id: any) {
    console.log(id)
    let index = this.selected_file_sticker.findIndex(x => x._id == id);
    console.log(index)
    if (index != 0) {
      let temp_obj = this.selected_file_sticker[index];
      this.selected_file_sticker[index] = this.selected_file_sticker[index - 1]
      this.selected_file_sticker[index - 1] = temp_obj
    }
    else {
      return false;
    }
    console.log(this.selected_file_sticker)
    this._user.swapUpstair(id)
      .then((data: any) => {
        console.log(data)

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  swapDownCreate(id: any) {
    console.log(id)
    let index = this.table_data.findIndex(x => x._id == id);
    let anyobj = this.table_data[index];
    if (this.table_data[index] != this.table_data.length) {
      this.table_data[index] = this.table_data[index + 1]
      this.table_data[index + 1] = anyobj
    }
    else {
      return false;
    }
    console.log(this.table_data)
    // this._user.swapDown(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }
  swapUpCreate(id: any) {
    console.log(id)
    let index = this.table_data.findIndex(x => x._id == id);
    let temp_obj = this.table_data[index];
    if (index != 0) {
      this.table_data[index] = this.table_data[index - 1]
      this.table_data[index - 1] = temp_obj
    }
    else {
      return false;
    }
    console.log(this.table_data)
    // this._user.swapUpstair(id)
    //   .then((data: any) => {
    //     console.log(data)
    //
    //   })
    //   .catch((error: any) => {
    //     console.log(error)
    //   });
  }
  swapDownPage(id: any) {
    console.log(id)
    let index = this.selected_file_sticker.findIndex(x => x._id == id);
    console.log("down", index)
    if ((index + 1) != this.selected_file_sticker.length) {
      let anyobj = this.selected_file_sticker[index];
      this.selected_file_sticker[index] = this.selected_file_sticker[index + 1]
      this.selected_file_sticker[index + 1] = anyobj
      console.log(this.selected_file_sticker)
      this._user.swapDown(id)
        .then((data: any) => {
          console.log(data)

        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    else {
      return false;
    }

  }
  swapUpEdit(id: any) {
    console.log(id)
    let index = this.edit_sticker.findIndex(x => x._id == id);

    if (index != 0) {
      let temp_obj = this.edit_sticker[index];
      this.edit_sticker[index] = this.edit_sticker[index - 1]
      this.edit_sticker[index - 1] = temp_obj
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
  deleteSticker2(id) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      let index = this.all_stickers.findIndex(x => x._id == id);
      this.all_stickers.splice(index, 1)
      this._user.deleteSticker(id)
        .then((data: any) => {
          console.log(data)
          this.show_msg = "Sticker deleted successfully"
          setTimeout(() => {
            this.show_msg = '';
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
    return false
  }
  deletePage(id) {
    var choice = confirm('Do you really want to delete this Page?');
    if (choice === true) {
      console.log(id)
      let index = this.page_info.findIndex(x => x._id == id);
      this.page_info.splice(index, 1)
      this._user.deletePage(id)
        .then((data: any) => {
          this.pageDetail = false;
          this.all_sticker = true;
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
  allSticker() {
    this.all_sticker = true;
    this.pageDetail = false;
    this.new_sticker = false;
    this.create_Page = false;
    this.edit_page = false;
  }
  createPageSticker() {
    this.table_data = [];
    this.table_array = [];
    this.page = '';
    this.page_id = '';
    this.arr = [];
    this.files = [];
    this.created_data = [];
    this.edit_sticker = [];
    this.hide_more = false;
    this.selected_sticker = false;
    this.all_sticker = false;
    this.create_Page = true;
    this.new_sticker = false;
    this.pageDetail = false;
    this.edit_page = false;
  }
  editPage() {
    this.page_id = '';
    this.arr = [];
    this.files = [];
    this.created_data = [];
    this.edit_sticker = [];
    this.table_array = [];
    this.published_arr = [];
    this.unpublished_arr = [];
    this.page_id = '';
    this.selectedPage = '';
    this.selected_page = '';
    this.edit_page = true;
    this.all_sticker = false;
    this.create_Page = false;
    this.pageDetail = false;
    this.new_sticker = false;
    this.table_array = [];
    this.arr = [];
    this.files = [];
  }
  newSticker() {
    this.table_data = []
    this.page_id = '';
    this.arr = [];
    this.files = [];
    this.created_data = [];
    this.edit_sticker = [];
    this.table_array = [];
    this.page_id = '';
    this.selectedPage = '';
    this.selected_page = '';
    this.all_sticker = false;
    this.new_sticker = true;
    this.create_Page = false;
    this.pageDetail = false;
    this.edit_page = false;
    this.published_arr = [];
    this.unpublished_arr = [];
  }
  getPageDetail(id) {
    this.page_id = id;
    console.log(id)
    this.create_Page = false;
    this.all_sticker = false;
    this.new_sticker = false;
    this.pageDetail = true;
    this.show_sticker = true;
    this.edit_page = false;
    this.orderby = 'filesize'
    this.order = 'asec'
    this._user.getStickers(id)
      .then((data: any) => {
        this.selected_file_sticker = data;

        for (let i = 0; i <= this.selected_file_sticker.length; i++) {
          if (this.selected_file_sticker[i].filesize < 1024) {
            this.selected_file_sticker[i].filesize = this.selected_file_sticker[i].filesize + 'bytes';


          } else if (this.selected_file_sticker[i].filesize > 1024 && this.selected_file_sticker[i].filesize < 1048576) {
            this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1024).toFixed(1) + 'KB';


          } else if (this.selected_file_sticker[i].filesize > 1048576) {
            this.selected_file_sticker[i].filesize = (this.selected_file_sticker[i].filesize / 1048576).toFixed(1) + 'MB';
          }
        }
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  getPage(data: any) {
    console.log("getdata", data)
    this.table_array = [];
    this.page_id = data
    let index = this.page_info.findIndex(x => x._id == data);
    this.selected_page = this.page_info[index].name;
    this.getStickers(data);
  }
  getStickers(page_id) {
    console.log(page_id)
    this.edit_sticker = [];
    this.published_arr = [];
    this.unpublished_arr = [];
    this._user.getStickers(page_id)
      .then((edit: any) => {
        this.edit_sticker = edit;
        console.log("ksngk", this.edit_sticker)
        for (let i = 0; i < this.edit_sticker.length; i++) {
          console.log(i)
          if (this.edit_sticker[i].status == false) {
            this.unpublished_arr.push(this.edit_sticker[i])

          }
          else if (this.edit_sticker[i].status == true) {
            this.published_arr.push(this.edit_sticker[i])
          }
        }
        console.log(this.published_arr)
        console.log(this.unpublished_arr)
        console.log(this.edit_sticker)
        if (this.edit_sticker.length == 0) {
          this.info_msg = "No Stickers Availaible"
        }
        else {
          this.info_msg = "";
        }
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  cancelCreate() {
    this.selected_sticker = false;
    this.table_array = [];
    this.arr = [];
    this.created_data = [];
    this.hide_more = false;
  }
  publishEdit() {
    if ((this.unpublished_arr.length == 0) && (this.arr.length == 0)) {
      return false;
    }

    console.log(this.page_id)
    console.log(this.created_data)
    this._user.publishStickers(this.page_id)
      .then((edit: any) => {
        console.log(edit)
        this.show_msg = "Data updated successfully"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
        if (this.arr.length != 0) {

        }
        else {
          this.table_array = [];
        }
        this.hide_more = false;

        this.arr = [];
        this.files = [];
        this.published_arr = [];
        this.unpublished_arr = [];
        this.getStickers(this.page_id)
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  publishNewSticker() {
    console.log(this.created_data)
    if (this.arr.length != 0) {
      alert("First Save the images before publish !")
      return false;
    }
    console.log(this.table_array)

    if (this.page_id == '') {
      return false;
    }
    this._user.publishStickers(this.page_id)
      .then((edit: any) => {
        console.log(edit)
        this.show_msg = "Changes Published!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);

        this.selected_sticker = false;
        this.hide_more = false;
        this.table_array = [];
        this.arr = [];
        this.files = [];
        this.edit_sticker = [];
        this.published_arr = [];
        this.unpublished_arr = [];
        this.getStickers(this.page_id)
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  publishSticker() {
    console.log(this.created_data)
    if (this.arr.length != 0) {
      alert("First Save the images before publish !")
      return false;
    }
    console.log(this.table_array)
    if (this.table_data.length < 8) {
      alert("Minimum 8 stickers are mandatory !")
      this.hide_more = false;
      return false;
    }
    if (this.table_array.length == 0) {
      alert("Previous Changes Saved! Select new Stickers to publish")
      return false;
    }
    this._user.publishStickers(this.page_id)
      .then((edit: any) => {
        console.log(edit)
        this.show_msg = "Changes Published!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
        this.selected_sticker = false;
        this.hide_more = false;
        this.table_array = [];
        this.arr = [];
        this.files = [];
        this.edit_sticker = [];
        this.published_arr = [];
        this.unpublished_arr = [];
        this.getStickers(this.page_id)
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  doneEdit() {
    if (this.arr.length == 0) {
      alert("Select Stickers to save!")
      return false;
    }
    if (this.arr.length > 10) {
      this.arr = [];
      this.table_array = [];
      this.selected_sticker = false;
      alert("Maximum you can upload 10 images in one publish!")
      return false;
    }
    const formData: any = new FormData();
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].type != "image/png") {
        this.arr = [];
        this.table_array = [];
        this.selected_sticker = false;
        alert("Please upload only in *PNG format")
        return false;
      }

      if (this.arr[i].size > '500000') {
        this.arr = [];
        this.table_array = [];
        this.selected_sticker = false;
        alert("Please upload Stickers with size less than 500 KB")
      }
      formData.append("files", this.arr[i]);
      this.formdata = formData;
    }
    this._user.uploadSticker(this.page_id, this.formdata)
      .then((data: any) => {
        console.log(data)
        this.unpublished_arr = [];
        this.published_arr = [];
        this.getStickers(data[0].pageId)
        this.selected_sticker = true;
        this.hide_more = false;
        this.created_data = data;
        this.arr = [];

        for (let i = 0; i < this.created_data.length; i++) {
          this.edit_sticker.push(this.created_data[i])
        }
        console.log(this.table_data)
        console.log(this.created_data)
        this.show_msg = "Stickers Saved!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  doneCreate() {
    if (this.new_sticker == true && this.page_id == '') {
      this.arr = [];
      this.table_array = [];
      this.selected_sticker = false;
      alert("Select Page before publish !")
      return false;
    }
    if (this.create_Page == true && this.page_id == '') {
      this.table_array = [];
      this.arr = [];
      this.files = [];
      this.selected_sticker = false;
      alert("Create Page before upload !")
      return false;
    }
    if (this.arr.length == 0) {
      alert("Select Stickers to save!")
      return false;
    }
    if (this.arr.length > 10) {
      this.arr = [];
      this.table_array = [];
      this.files = [];
      this.selected_sticker = false;
      alert("Maximum you can upload 10 images in one publish!")
      return false;
    }
    const formData: any = new FormData();
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i].type != "image/png") {
        this.arr = [];
        this.table_array = [];
        this.selected_sticker = false;
        alert("Please upload only in *PNG format")
        return false;
      }

      if (this.arr[i].size > 500000) {
        this.arr = [];
        this.table_array = [];
        this.selected_sticker = false;
        alert("Please upload Stickers with size less than 500 KB")
      }
      formData.append("files", this.arr[i]);
      this.formdata = formData;
    }
    console.log(this.page_id)
    this._user.uploadSticker(this.page_id, this.formdata)
      .then((data: any) => {
        this.selected_sticker = true;
        this.hide_more = false;
        this.created_data = data;
        this.arr = [];
        for (let i = 0; i < this.created_data.length; i++) {
          this.table_data.push(this.created_data[i])
        }
        console.log(this.table_data)
        console.log(this.created_data)
        this.show_msg = "Stickers Saved!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  fileChangeEventOfSticker(fileInput: any, edit: any) {
    console.log(fileInput, edit)
    let index = this.edit_sticker.findIndex(x => x._id == this.id);
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0])
      const formData: any = new FormData();
      formData.append("files", fileInput.target.files[0]);
      this.formdata = formData;
      this._user.editSticker(this.id, this.formdata)
        .then((data: any) => {
          this.updated_data = data.data_updated
          console.log(this.updated_data)
          this.edit_sticker[index].filename = this.updated_data.filename;

          this.show_msg = "Image Changed successfully !"
          setTimeout(() => {
            this.show_msg = '';
          }, 3000);
        })
        .catch((error: any) => {
          console.log(error)
        });
    }
  }
  diclick(edit: any) {
    console.log(edit)
    this.id = edit;
  }
  onFileSelect(event: any) {
    console.log(event)
    if (event.target.files.length) {
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        this.arr.push(this.files[i])
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          this.table_array.push(e.target.result);
          this.selected_sticker = true;
        }
      });
    }
    else {
      alert('Choose stickers to proceed !');
    }
  }
  getIndex(i) {
    this.gotIndex = i;
  }

  onFileEdit(event, i) {
    console.log(i)
    this.arr.splice(this.gotIndex, 1)
    this.table_array.splice(this.gotIndex, 1)
    if (event.target.files && event.target.files[0]) {
      this.arr.splice(this.gotIndex, 0, event.target.files[0])
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.table_array.splice(this.gotIndex, 0, event.target.result)
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  createPage(pagename) {
    if (pagename == undefined) {
      return false;
    }
    var data = {
      name: pagename
    }
    this._user.newPage(data)
      .then((data: any) => {
        this.page_id = data._id;
        this.show_msg = "Page Created successfully !"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
        this._user.getPageInfo()
          .then((data: any) => {
            this.page_info = data;
          })
          .catch((error: any) => {
            console.log(error)
          });
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

}
