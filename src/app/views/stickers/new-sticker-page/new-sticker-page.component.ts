import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { OrderByPipe } from "../../../services/orderby";
import { Pipe } from '@angular/core';

@Component({
  selector: 'app-new-sticker-page',
  templateUrl: './new-sticker-page.component.html',
  styleUrls: ['./new-sticker-page.component.scss']
})
export class NewStickerPageComponent implements OnInit {
  page_id: any;
  edit_sticker = [];
  published_arr = [];
  unpublished_arr = [];
  show_msg: any;
  page_info: any;
  table_array = [];
  arr = [];
  files = [];
  formdata: any;
  created_data = [];
  table_data = [];
  info_msg: any;
  selected_sticker: boolean = false;
  sticker_url = GlobalVariable.STICKER_IMAGE_URL;
  page_name: any;
  page_name_es: any;
  page_name_tr: any;
  page_name_pt: any;
  constructor(public _user: UsersService) { }

  ngOnInit() {
  }
  doActive(id, status) {
    this._user.activeSticker(id, true)
      .then((data: any) => {
        console.log(data)
        this.getStickers(this.page_id);
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
        this.getStickers(this.page_id);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  swapDownCreate(id: any) {
    console.log(id)
    let index = this.table_data.findIndex(x => x._id == id);

    if ((index + 1) != this.table_data.length) {
      let anyobj = this.table_data[index];
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

    if (index != 0) {
      let temp_obj = this.table_data[index];
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
  createPage(pagename) {
    if (!this.page_name) {
      alert("Please enter sticker page english name.");
      return false;
    }
    if (!this.page_name_es) {
      alert("Please enter sticker page spanish name.");
      return false;
    }
    if (!this.page_name_tr) {
      alert("Please enter stricker page turkish name.");
      return false;
    }
    if (!this.page_name_pt) {
      alert("Please enter stricker page portuguese name.");
      return false;
    }
    let data = {
      name: this.page_name,
      name_es: this.page_name_es,
      name_tr: this.page_name_tr,
      name_pt: this.page_name_pt,

    }
    this._user.newPage(data)
      .then((data: any) => {
        this.page_id = data._id;
        this.show_msg = "Page Created successfully !"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
        this.page_name = '';
        this.page_name_es = '',
          this.page_name_tr = '',
          this.page_name_pt = '',
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
  doneCreate() {

    if (this.page_id == '') {
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

  publishSticker() {
    console.log(this.created_data)
    if (this.arr.length != 0) {
      alert("First Save the images before publish !")
      return false;
    }
    console.log(this.table_array)
    if (this.table_data.length < 8) {
      alert("Minimum 8 stickers are mandatory !")

      return false;
    }
    if (this.table_array.length == 0) {
      alert("Previous Changes Saved! Select new Stickers to publish")
      return false;
    }
    this._user.publishStickers(this.page_id)
      .then((edit: any) => {
        console.log(edit)
        console.log(edit)
        this.show_msg = "Changes Published!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);
        this.selected_sticker = false;
        this.getStickers(this.page_id)
        this.table_array = [];
        this.arr = [];
        this.files = [];
        this.edit_sticker = [];
        this.published_arr = [];
        this.unpublished_arr = [];
      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  getStickers(page_id) {
    console.log(page_id)
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
        this.table_data = this.edit_sticker;
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
}
