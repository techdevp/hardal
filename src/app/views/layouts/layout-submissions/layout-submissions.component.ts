import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-layout-submissions',
  templateUrl: './layout-submissions.component.html',
  styleUrls: ['./layout-submissions.component.scss']
})
export class LayoutSubmissionsComponent implements OnInit {
  layout: any;
  status: any;
  data: any;
  access_token: any;
  new_layout: any;
  original_layout: any;
  search_text: any;
  submission: boolean = false;
  image: any;
  files: any;
  layout_details: any;
  category: any;
  countries: any;
  imageUrl: any;
  selected: any = [];
  selected_layout: number = 0;
  search_total: number = 0;
  search_count: number = 0;
  total_count: number = 0;
  view_layout: any;
  count: number = 0;
  species: any;
  selectedCategory: any;
  admin_type: any;
  layout_count: any;
  selected_status: any;
  error_msg: any;
  // edit: any = []


  constructor(private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService) {
    this.countries = GlobalVariable.COUNTRIES;
    this.status = ['Pending', 'Active', 'Rejected', 'Archived'];
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.admin_type = this.data.user.admin_type;
    this.spinnerService.show();
    this.layoutService.layoutCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.selected_status = 'Pending'
    this.layoutService.layout('Pending', this.access_token, this.count)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          // setTimeout(() => {
          //   this.error_msg = '';
          // }, 3000)
        }
        this.layout = data.data;
        this.total_count = data.count;
        this.selectedCategory = "Pending";
        this.original_layout = data.data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getCategories(this.access_token)
      .then((data: any) => {
        this.category = data.data
      })
      .catch((error: any) => {
        console.log(error)
      });
    this.layoutService.getAllSpecies(this.access_token)
      .then((data: any) => {
        this.species = data.data
      })
      .catch((error: any) => {
        console.log(error)
      });

  }

  ngOnInit() { }
  getAllLayout() {
    this.layoutService.layout(this.selectedCategory, this.access_token, this.count)
      .then((data: any) => {
        if (data && data.data && data.data.length) {
          this.layout = data.data;
          this.total_count = data.count;
          this.original_layout = data.data;
        }
        if (data && data.data && !data.data.length) {
          this.error_msg = "No Layouts Found !!";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
          if (this.count > 0) {
            this.count = this.count - 10;
          }
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  searchLayout(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return;
    }
    else {
      let obj = {
        text: data,
        status: this.selectedCategory
      }
      this.spinnerService.show();
      this.search_count = 0;
      this.layoutService.searchLayout(obj, this.access_token, this.search_count)
        .then((data: any) => {
          if (data.data.length) {
            this.layout = data.data;
            this.search_total = data.count;
            this.total_count = data.count;
          }
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          console.log(error);
          this.spinnerService.hide()
        });
    }
  }

  findNext() {
    if (this.search_text) {
      this.search_count = this.search_count + 10;
      if (this.search_total > this.search_count) {
        this.spinnerService.show();
        let obj = {
          text: this.search_text
        };
        this.layoutService.searchLayout(obj, this.access_token, this.search_count)
          .then((data: any) => {
            if (data.data.length) {
              this.layout = data.data;
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        this.search_count = this.search_count - 10;
      }
    }
    else {
      this.count = this.count + 10;
      this.getAllLayout();
    }
  }

  findPrev() {
    if (this.count > 0 || this.search_count > 0) {
      if (this.search_text) {
        this.search_count = this.search_count - 10;
        let obj = {
          text: this.search_text
        };
        this.spinnerService.show();
        this.layoutService.searchLayout(obj, this.access_token, this.search_count)
          .then((data: any) => {
            if (data.data.length) {
              this.layout = data.data;
            }

            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        this.count = this.count - 10;
        this.getAllLayout();
      }
    }
  }
  checkBlur(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return
    }
  }

  selectLayout(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.layout[index].checked = true;
      this.selected_layout = this.selected_layout + 1;
    }
    else {
      this.layout[index].checked = false;
      this.selected_layout = this.selected_layout - 1;
    }
  }

  getPageDetail(data: any) {
    this.search_text = '';
    this.selected_status
    this.layoutService.layout(data, this.access_token, this.count)
      .then((data: any) => {
        this.layout = data.data;
        this.total_count = data.count;
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  changeSpcies(data: any) {
    let index = this.species.findIndex(x => x._id == data)
    this.layout_details.speciesId._id = data;
    this.layout_details.speciesId.name = this.species[index].name;
  }

  addNewCategory(data: any) {
    var obj = {
      name: data
    }
    if (data.length) {
      let length = (data.length > 0 ? (data.length - 1) : data.length);
      let index = this.category.findIndex(x => x.name == data[length]);
      if (index >= 0) {
        let index1 = this.layout_details.categoryId.findIndex(x => x.name == data[length]);
        if (index1 == -1) {
          this.layout_details.categoryId.push(this.category[index])
        }
      }
    }

  }

  removeCategory(index: any) {
    this.layout_details.categoryId.splice(index, 1)
  }

  setCountry(data: any) {
    this.layout_details.location = data;
  }

  viewSubmission(id: any, index: any) {
    this.spinnerService.show();
    this.view_layout = index;
    this.submission = !this.submission;
    this.layoutService.getLayout(id, this.access_token)
      .then((data: any) => {
        this.layout_details = data.data;
        if (!this.layout_details.location) {
          this.layout_details.location = 'undefined'
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  onFileSelect(event: any, index: any) {
    if (event.target.files.length) {
      this.spinnerService.show();
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        const formData: any = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          this.image[index] = e.target.result;
          let file = event.target.files[0];
          formData.append("files", file);
          this.layoutService.uploadLayoutImage(this.access_token, formData)
            .then((data: any) => {
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

  editFileSelect(event: any, index: any) {
    if (event.target.files.length) {
      this.spinnerService.show();
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        const formData: any = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          let file = event.target.files[0];
          formData.append("files", file);
          this.layoutService.uploadLayoutImage(this.access_token, formData)
            .then((data: any) => {
              this.layout_details.photo = data.data[0].filename;
              this.spinnerService.hide();
              //  this.new_image.push(data.data.files)
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

  editLayout() {
    this.spinnerService.show();
    this.layoutService.editLayout(this.access_token, this.layout_details, this.layout_details._id)
      .then((data: any) => {
        this.layout[this.view_layout] = data.data
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  downloadImage(data: any) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = data;
    a.download = "dsf";
    a.click();
    document.body.removeChild(a);
  }

  changeStatus(data: any) {
    if (data) {
      this.layout_details.status = data;
      let obj = {
        status: data
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout_details._id)
        .then((data: any) => {
          this.layout[this.view_layout] = data.data
          this.layout.splice(this.view_layout, 1);
          this.submission = !this.submission;
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
        img{
          max-width:100px;
        }
        tr,td,th{
          min-width:100%;
        }
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    }
    else {
      alert("Please select elements to print")
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
      alert("Please select layout to download.")
    }
  }

}
