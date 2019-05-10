import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from '../../../app.global';

@Component({
  selector: 'app-new-layout-category',
  templateUrl: './new-layout-category.component.html',
  styleUrls: ['./new-layout-category.component.scss']
})
export class NewLayoutCategoryComponent implements OnInit {
  files: any
  image: any = [];
  category_name: any;
  category_name_es: any;
  category_name_tr: any;
  category_name_pt: any;
  artist: any = [];
  data: any;
  access_token: any;
  category: any;
  countries: any;
  new_image: any = [];
  category_id: any = [];
  selecteCountry: any;
  selected: any = [];
  count: number = 0;
  layout_id: any = []
  selected_layout: number = 0;
  layout: any = [];
  filesize: any;
  species: any;
  selectedSpecies: any = [];
  imageUrl: any;
  image_box: any;
  drop_div: any = [false, false, false, false, false, false, false, false, false];
  selected_user: any = [];
  artists: any;
  focused_in: any = [false, false, false, false, false, false, false, false, false];
  layout_count: any;
  error_msg: any;

  constructor(private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService) {
    this.image_box = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.spinnerService.show()
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = (this.data ? this.data.user.token : '');
    this.layoutService.layoutCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getAllSpecies(this.access_token)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.species = data.data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
    this.countries = GlobalVariable.COUNTRIES;
  }

  ngOnInit() { }

  setCountry(data: any) {
    this.selecteCountry = data
  }


  selectArtisan(data: any, i: any, value: any, index: any) {
    this.selected_user[index] = '';
    this.layoutService.searchUser(data, this.access_token)
      .then((data: any) => {
        this.artists = data.data;
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  focusedIn(index: any) {
    this.artists = [];
    let index2 = this.drop_div.findIndex(x => x == true);
    this.drop_div[index] = true;
    if (index != index2) {
      this.drop_div[index2] = false;
    }
    this.focused_in[index] = true;
  }

  focusedOut(index: any) {
    let index2 = this.focused_in.findIndex(x => x == true);
    // console.log("out", index, index2);
    //
    // if (index2 > 0) {
    //   console.log(" user selected")
    //   this.drop_div[index] = false;
    //   this.focused_in[index2] = false;
    // }
  }

  slectedUser(data: any, index: any, index2: any) {
    this.selected_user[index2] = data._id;
    this.drop_div[index2] = false;
    this.selected[index2] = data.username
    this.selected

  }
  selectSpecies(data: any, index: any) {
    this.selectedSpecies[index] = data;
  }
  onFileSelect(event: any, index: any) {
    if (event.target.files.length) {
      this.spinnerService.show()
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        //  this.arr.push(this.files[i])
        const formData: any = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          let file = event.target.files[0];
          this.image[index] = e.target.result;
          formData.append("files", file);
          this.layoutService.uploadLayoutImage(this.access_token, formData)
            .then((data: any) => {
              let obj = {
                photo: data.data[0].filename,
                fileSize: data.data[0].filesize
              }
              if (!this.new_image[index]) {

                this.new_image.push(obj);
              }
              else {
                this.new_image[index] = obj;
              }
              this.image[index] = obj;
              this.spinnerService.hide()

            })
            .catch((error: any) => {
              console.log(error);
              this.spinnerService.hide()
            });
        }
      });
    }
    else {
      alert('Choose images to proceed !');
    }
  }

  createCategory() {
    if (!this.category_name) {
      alert("Please enter category english name.");
      return;
    }
    if (!this.category_name_es) {
      alert("Please enter category spanish name.");
      return;
    }
    if (!this.category_name_tr) {
      alert("Please enter category turkish name.");
      return;
    }
    if (!this.category_name_pt) {
      alert("Please enter category portuguese name.");
      return;
    }
    if (!this.selecteCountry) {
      alert("Please select country name.");
      return;
    }
    if (!this.selectedSpecies) {
      alert("Please select species name.");
      return;
    }
    if (this.new_image.length < 1) {
      alert("Please upload atleast 1 image.");
      return;
    }
    for (var i = 0; i < this.image.length; i++) {
      if (this.image[i] && !this.selectedSpecies[i]) {
        let j = i + 1;
        alert("Please select species for layout " + j);
        return;
      }
    }

    for (var i = 0; i < this.image.length; i++) {
      if (this.image[i] && !this.selected[i]) {
        let j = i + 1;
        alert("Please select artist username for layout " + j);
        return;
      }
      else if (this.image[i] && !this.selected_user[i]) {
        let j = i + 1;
        alert("Please select the valid username for layout " + j);
        return;
      }
    }
    // for (var i = 0; i < this.new_image.length; i++) {
    //   if (!this.selectedSpecies[i]) {
    //     let j = i + 1;
    //     alert("Please select species for layout " + j);
    //     return;
    //   }
    // }
    // for (var i = 0; i < this.new_image.length; i++) {
    //   console.log(this.selected_user)
    //   if (!this.selected[i]) {
    //     let j = i + 1;
    //     alert("Please select artist username for layout " + j);
    //     return;
    //   }
    //   else if (!this.selected_user[i]) {
    //     let j = i + 1;
    //     alert("Please select the valid username for layout " + j);
    //     return;
    //   }
    // }

    let formdata = {
      name: this.category_name,
      name_es: this.category_name_es,
      name_tr: this.category_name_tr,
      name_pt: this.category_name_pt,
      location: this.selecteCountry
    }
    this.spinnerService.show();
    // if (this.selected_user.length == this.new_image.length) {
    this.layoutService.createCategory(formdata, this.access_token)
      .then((dataa: any) => {
        if (dataa.status != 422) {
          this.category_id.push(dataa.data._id)
          // for (var i = 0; i < this.new_image.length; i++) {
          //   if (this.selected_user[i]) {
          for (var i = 0; i < this.image.length; i++) {
            if (this.image[i]) {
              let formdata = {
                photo: this.image[i].photo,
                categoryId: this.category_id[this.count],
                speciesId: this.selectedSpecies[i],
                location: this.selecteCountry,
                // artist: '5b07eca0a3c2ce4e382096b4',
                artist: this.selected_user[i],
                filesize: this.image[i].fileSize,
                status: "Draft"
              }
              this.layoutService.createLayout(formdata, this.access_token)
                .then((data: any) => {
                  if (data.status == 200) {
                    this.layout.push(data.data);
                    this.image = [];
                    this.new_image = [];
                    this.selected = [];
                    this.selected_user = [];
                    this.selectedSpecies[i] = 'undefined';
                    this.selecteCountry = 'undefined';

                  }
                  else {
                    alert(data.message)
                  }
                  this.spinnerService.hide();
                })
                .catch((error: any) => {
                  console.log(error);
                  this.spinnerService.hide();
                });
            }
            // else {
            //   alert("please select artist name.");
            //   this.spinnerService.hide();
            //   return;
            // }
          }
          this.count = this.count + 1;
          this.image = [];
          this.new_image = [];
          this.category_name = '';
          this.category_name_es = '',
            this.category_name_tr = '',
            this.category_name_pt = '',
            this.selected = [];
          this.selected_user = [];
        }
        else {
          alert(dataa.message);
          this.spinnerService.hide();
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    // }
    // else {
    //   alert("Please select artist username");
    //   this.spinnerService.hide();
    // }
  }

  selectLayout(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.layout[index].checked = true;
      this.layout_id.push(this.layout[index]._id)
      this.selected_layout = this.selected_layout + 1;
    }
    else {
      this.layout[index].checked = false;
      let index_id = this.layout_id.findIndex(x => x._id == this.layout[index]._id)
      this.layout_id.splice(index_id, 1)
      this.selected_layout = this.selected_layout - 1;
    }
  }

  publishLayout() {
    if (this.layout && this.layout.length) {
      if (this.layout_id && this.layout_id.length) {
        let formdata = {
          layoutsId: this.layout_id
        }
        this.spinnerService.show();
        this.layoutService.publishLayout(formdata, this.access_token)
          .then((data: any) => {
            for (let i = 0; i < this.layout_id.length; i++) {
              let index = this.layout.findIndex(x => x._id == this.layout_id[i])
              this.layout[index].status = 'Active';
              this.selected[index] = false;
              this.selected_layout = this.selected_layout - 1;
              this.layout.splice(index, 1)
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        alert('Please select layouts to publish.');
      }
    }
    else {
      alert("Please save layout first to publish.");
    }
  }

  cancel() {
    this.image = [];
    this.category_name = '';
    this.category_name_es = '';
    this.category_name_tr = '';
    this.category_name_pt = '';
    this.new_image = [];
    this.selected_user = []
  }

  changeStatus(id: any, data: any, index: any) {
    if (id) {
      this.spinnerService.show();
      this.layout[index].status = data;
      let obj = {
        status: this.layout[index].status
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
        .then((data: any) => {
          this.layout[index] = data.data;
          this.layout.splice(index, 1)
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }

  print(): void {
    if (this.selected_layout > 0) {
      let printContents, popupWin;
      printContents = document.getElementById('print-section1').innerHTML;
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
    else {
      alert("Please select layouts to print")
    }
  }

  download() {
    if (this.selected_layout > 0) {
      var new_arr = [];
      var arrData = typeof this.layout != 'object' ? JSON.parse(this.layout) : this.layout;
      var CSV = '';
      for (var i = 0; i < arrData.length; i++) {
        if (arrData[i].checked) {
          new_arr.push({ "ID": arrData[i]._id, "FILESIZE": arrData[i].filesize, "CREATED DATE": arrData[i].created })
        }
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
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'ActiveEvent_data.csv');
      tempLink.click();
    } else {
      alert("Please select layout to download.")
    }
  }
}
