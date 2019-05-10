import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-new-layout',
  templateUrl: './new-layout.component.html',
  styleUrls: ['./new-layout.component.scss']
})
export class NewLayoutComponent implements OnInit {
  category: any;
  image: any = [];
  new_image: any = [];
  files: any;
  access_token: any;
  data: any;
  category_id: any;
  layout_name: any;
  layout: any = [];
  imageUrl: any;
  selecteCountry: any;
  countries: any;
  artists: any;
  selected: any = [];
  checkbox: any = [];
  count: number = 0;
  layout_id: any = [];
  selected_layout: number = 0;
  selectedCategory: any;
  species: any;
  selectedSpecies: any = [];
  image_box: any;
  drop_div: any = [];
  selected_user: any = [];
  all: boolean = false;
  layout_count: any;
  error_msg: any;



  constructor(private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService) {
    this.image_box = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.spinnerService.show();
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.layoutService.layoutCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getCategories(this.access_token)
      .then((data: any) => {
        this.category = data.data;
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.layoutService.getAllSpecies(this.access_token)
          .then((data: any) => {
            this.species = data.data;
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.countries = GlobalVariable.COUNTRIES;
  }

  ngOnInit() { }

  onFileSelect(event: any, index: any) {
    if (event.target.files.length) {
      this.spinnerService.show();
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        //  this.arr.push(this.files[i])
        const formData: any = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          this.image[index] = e.target.result;
          let file = event.target.files[0];
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
              this.spinnerService.hide();
            })
            .catch((error: any) => {
              this.spinnerService.hide();
              console.log(error)
            });
        }
      });
    }
    else {
      alert('Choose images to proceed !');
    }
  }

  getPageDetail(data: any) {
    let index = this.category.findIndex(x => x.name == data);
    this.category_id = this.category[index]._id;
  }

  setCountry(data: any) {
    this.selecteCountry = data;
  }

  selectArtisan(data: any, i: any, value: any, index: any) {
    this.selected_user[index] = '';
    this.layoutService.searchUser(data, this.access_token)
      .then((data: any) => {
        this.artists = data.data;
        // this.autoCompleteService.setDynamicList(this.artists);
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  focusedIn(index: any) {
    this.artists = [];
    let index2 = this.drop_div.findIndex(x => x == true);
    if (index != index2) {
      this.drop_div[index2] = false;
    }
    this.drop_div[index] = true;
    // this.focused_in[index] = true;
  }

  focusedOut(index: any) {
    // let index2 = this.focused_in.findIndex(x => x == true);
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
  }

  selectSpecies(data: any, index: any) {
    this.selectedSpecies[index] = data;
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
  setCategory(data: any) {
    // if (data.length > 3) {
    //   alert("You can select maximum 3 categories.");
    //   this.selectedCategory.splice(4, 1)
    //   return;
    // }

  }
  createLayout() {
    if (!this.selectedCategory) {
      alert("Please select category name");
      return;
    }
    if (!this.selecteCountry) {
      alert("Please select country name");
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

    // if (this.selected_user.length == this.image.length) {
    for (var i = 0; i < this.image.length; i++) {
      if (this.image[i]) {
        let formdata = {
          photo: this.image[i].photo,
          categoryId: this.selectedCategory,
          speciesId: this.selectedSpecies[i],
          location: this.selecteCountry,
          // artist: '5b07eca0a3c2ce4e382096b4',
          artist: this.selected_user[i],
          filesize: this.image[i].fileSize,
          status: "Draft"
        }
        this.spinnerService.show();
        this.layoutService.createLayout(formdata, this.access_token)
          .then((data: any) => {
            if (data.status == 200) {
              this.layout.push(data.data);
              this.image = [];
              this.new_image = [];
              this.selected = [];
              this.selected_user = [];
              this.selectedCategory = 'undefined';
              this.selectedSpecies[i] = 'undefined';
              this.selecteCountry = 'undefined';
            }
            else {
              alert(data.message)
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      // else {
      //   alert("Please select artist username");
      //   this.spinnerService.hide();
      // }
    }

    this.image = [];
    this.new_image = [];
    this.selecteCountry = '';
    this.selectedSpecies = ''
    // }
    // else {
    //   alert("Please select artist username.");
    //   this.spinnerService.hide();
    // }
  }

  changeHighlighted(id: any, index: any) {
    this.layout[index].highlighted = !this.layout[index].highlighted;
    // this.editLayout(this.layout[index], index);
    this.spinnerService.show();
    let obj = {
      highlighted: this.layout[index].highlighted
    }
    this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
      .then((data: any) => {
        this.spinnerService.hide();
        this.layout[index] = data.data
        // this.layout.splice(index, 1);
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
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
              // this.layout[index].status = 'Active'
              this.checkbox[index] = false;
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
        alert('Please select layouts to publish.')
      }
    }
    else {
      alert("Please save layout first to publish.")
    }
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
          // this.layout[index] = data.data
          this.layout.splice(index, 1);
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
      alert("Please select layout to print")
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
    }
    else {
      alert("Please select layout to download")
    }

  }
}
