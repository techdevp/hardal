import { Component, OnInit, TemplateRef } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../../app.global';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'app-archived-layouts',
  templateUrl: './archived-layouts.component.html',
  styleUrls: ['./archived-layouts.component.scss']
})
export class ArchivedLayoutsComponent implements OnInit {
  layout: any;
  data: any;
  access_token: any;
  layout_count: any;
  selected: any = [];
  selected_layout: number = 0;
  search_total: number = 0;
  search_count: number = 0;
  count: number = 0;
  total_count: number = 0;
  imageUrl: any;
  original_layout: any;
  layout_id: any = [];
  modalRef: BsModalRef;
  show_msg: any;
  error_msg: any;
  search_text: any;



  constructor(private modalService: BsModalService,
    private spinnerService: Ng4LoadingSpinnerService,
    private layoutService: LayoutService,
    private router: Router) {
    this.spinnerService.show();
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
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
    this.layoutService.archivedLayout(this.access_token, this.count)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.layout = data.data;
        if (data.data && !data.data.length) {
          this.error_msg = "No Layouts Found !!";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        };
        this.total_count = data.count;
        this.original_layout = data.data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  ngOnInit() { }
  getAllLayout() {
    this.layoutService.archivedLayout(this.access_token, this.count)
      .then((data: any) => {
        if (data.data && !data.data.length) {
          this.error_msg = "No Layouts Found !!";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
          if (this.count > 0) {
            this.count = this.count - 10;
          }
        };
        if (data.data && data.data.length) {
          this.layout = data.data;
          this.total_count = data.count;
          this.original_layout = data.data;
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  openModal(template: TemplateRef<any>) {
    if (this.layout_id && this.layout_id.length) {
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Please select layouts to delete.")
    }
  }

  viewLayout(id: any) {
    this.router.navigate(['layouts/view-layout', id]);
  }

  searchLayout(data: any) {
    if (!data) {
      this.getAllLayout();
      return
    };
    let obj = {
      text: data,
      status: 'Archived'
    };
    this.spinnerService.show();
    this.layoutService.searchLayout(obj, this.access_token, this.search_count)
      .then((data: any) => {
        if (data.data.length) {
          this.layout = data.data;
          this.search_total = data.count;
          this.show_msg = ''
          this.total_count = data.count;
        }
        else {
          this.layout = [];
          this.error_msg = "No Records Found !!";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        this.spinnerService.hide()
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide()
      });
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

  changeHighlighted(id: any, index: any) {
    this.spinnerService.show();
    this.layout[index].highlighted = !this.layout[index].highlighted;
    // this.editLayout(this.layout[index], index);
    let obj = {
      highlighted: this.layout[index].highlighted
    }
    this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
      .then((data: any) => {
        this.spinnerService.hide();
        // this.layout.splice(index, 1)
        this.layout[index] = data.data
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

  }

  changeStatus(id: any, data: any, index: any) {
    if (data) {
      this.spinnerService.show();
      this.layout[index].status = data;
      //  this.editLayout(this.layout[index], index);
      let obj = {
        status: this.layout[index].status
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
        .then((data: any) => {
          this.spinnerService.hide();
          this.layout.splice(index, 1)
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }

  editLayout(layout: any, index: any) {
    this.spinnerService.show();
    this.layoutService.editLayout(this.access_token, layout, layout._id)
      .then((data: any) => {
        this.spinnerService.hide();
        this.layout.splice(index, 1)
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  selectLayout(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.layout[index].checked = true;
      this.layout_id.push(this.layout[index]._id)
      this.selected_layout = this.selected_layout + 1;
    }
    else {
      this.layout[index].checked = false;
      let index_id = this.layout_id.findIndex(x => x == this.layout[index]._id)
      this.layout_id.splice(index_id, 1)
      this.selected_layout = this.selected_layout - 1;
    }
  }

  deleteLayout() {
    this.modalRef.hide();
    if (this.layout && this.layout.length) {
      if (this.layout_id && this.layout_id.length) {
        let formdata = {
          layoutsId: this.layout_id
        }
        this.spinnerService.show();
        this.layoutService.deleteLayout(formdata, this.access_token)
          .then((data: any) => {
            this.layout.forEach((item: any, index: any) => {
              let index1 = this.layout.findIndex(x => x._id == this.layout_id[index])
              this.selected[index1] = false;
            })
            for (let i = 0; i < this.layout_id.length; i++) {
              let index = this.layout.findIndex(x => x._id == this.layout_id[i])
              // this.layout[index].status = 'Active'
              this.selected[index] = false;
              this.selected_layout = this.selected_layout - 1;
              this.layout.splice(index, 1)
            }
            this.layout_id = [];
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        alert('Please select layouts to delete.')
      }
    }
    else {
      // alert("Please save layout first to publish.")
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
        td,tr,th{
          width:100%;
        }
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

    } else {
      alert("Please select layout to download.")
    }
  }
}
