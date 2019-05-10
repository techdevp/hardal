import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { OrderByPipe } from "../../../services/orderby";
import { Pipe } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-edit-sticker-page',
  templateUrl: './edit-sticker-page.component.html',
  styleUrls: ['./edit-sticker-page.component.scss']
})
export class EditStickerPageComponent implements OnInit {
  page_info: any;
  sticker_url: any;
  table_array: any;
  page_id: any;
  selected_page: any;
  edit_sticker = [];
  published_arr = [];
  unpublished_arr = [];
  info_msg: any;
  gotIndex: any;
  id: any;
  formdata: any;
  updated_data: any;
  show_msg: any;
  files: any;
  arr = [];
  selected_sticker: boolean = false;
  created_data = [];
  table_data = [];
  page_name: any;
  page_name_es: any;
  page_name_tr: any;
  page_name_pt: any;

  constructor(public _user: UsersService, private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this._user.getPageInfo()
      .then((data: any) => {
        this.page_info = data;
      })
      .catch((error: any) => {
        console.log(error)
      });
    this.sticker_url = GlobalVariable.STICKER_IMAGE_URL;
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
  getPage(data: any) {
    console.log("getdata", data)
    this.table_array = [];
    this.page_id = data
    let index = this.page_info.findIndex(x => x._id == data);
    this.selected_page = this.page_info[index].name;
    this.page_name = this.page_info[index].name;
    this.page_name_es = this.page_info[index].name_es;
    this.page_name_pt = this.page_info[index].name_pt;
    this.page_name_tr = this.page_info[index].name_tr;
    this.getStickers(data);
  }
  updatePage() {
    let index = this.page_info.findIndex(x => x._id == this.page_id);
    let data = this.page_info[index];
    console.log("data", data);
    if (!this.page_id) {
      alert("Please select page name.");
      return false;
    }
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
    let formdata = {
      name: this.page_name,
      name_es: this.page_name_es,
      name_tr: this.page_name_tr,
      name_pt: this.page_name_pt,

    }
    this._user.updatePage(formdata, this.page_id)
      .then((data: any) => {
        console.log(data);
        this.show_msg = "Stricker Page name updated successfully !!"
        setTimeout(() => {
          this.show_msg = '';
        }, 3000);


      })
      .catch((error: any) => {
        console.log(error)
      });
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

    if ((index + 1) != this.edit_sticker.length) {
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

  deletePage(id) {
    if (!this.page_id) {
      alert("Please select page name.");
      return false;
    }
    var choice = confirm('Do you really want to delete this Page?');
    if (choice === true) {
      console.log(id)
      let index = this.page_info.findIndex(x => x._id == id);
      this.page_info.splice(index, 1)
      this._user.deletePage(id)
        .then((data: any) => {
          this.selected_page = '';
          this.edit_sticker = [];
          this.published_arr = [];
          this.unpublished_arr = [];
          console.log(data);
          this.page_name = '';
          this.page_name_es = '';
          this.page_name_tr = '';
          this.page_name_pt = '';
          this.page_id = '';
          this.show_msg = "Page deleted successfully. !!"
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
  fileChangeEventOfSticker(fileInput: any, edit: any) {
    console.log(fileInput, edit)
    let index = this.edit_sticker.findIndex(x => x._id == this.id);
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput.target.files[0])
      const formData: any = new FormData();
      formData.append("files", fileInput.target.files[0]);
      this.formdata = formData;
      this.spinnerService.show();
      this._user.editSticker(this.id, this.formdata)
        .then((data: any) => {
          this.spinnerService.hide();
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
  doneEdit() {
    if (!this.page_id) {
      alert("Please select page name.");
      return false;
    }
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

      if (this.arr[i].size > 500000) {
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
  publishEdit() {
    if ((this.unpublished_arr.length == 0) && (this.arr.length == 0)) {
      return false;
    }

    console.log(this.page_id)

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
}
