
import { Component, OnInit, ChangeDetectorRef, TemplateRef } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
import { GlobalVariable } from './../../../app.global';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-draft-layout',
  templateUrl: './draft-layout.component.html',
  styleUrls: ['./draft-layout.component.scss']
})
export class DraftLayoutComponent implements OnInit {

  layout: any;
  all_layout: any;
  data: any;
  access_token: any;
  selected: any = [];
  selected_layout: number = 0;
  search_total: number = 0;
  search_count: number = 0;
  total_count: number = 0;
  count: number = 0;
  imageUrl: any;
  search_text: any;
  print_div: boolean = false;
  show_msg: any;
  layout_id: any = [];
  modalRef: BsModalRef;
  layout_count: any;
  error_msg: any;

  constructor(private modalService: BsModalService,
    private ref: ChangeDetectorRef,
    private layoutService: LayoutService,
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router, ) {
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
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
    this.layoutService.layout('Draft', this.access_token, this.count)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        this.layout = data.data;
        this.total_count = data.count;
        if (data.data && !data.data.length) {
          this.error_msg = "No Layouts Found !!"
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        // this.selectedCategory = "Pending";
        this.all_layout = data.data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

  }

  ngOnInit() { }

  getAllLayout() {
    this.layoutService.layout('Draft', this.access_token, this.count)
      .then((data: any) => {
        if (data.data && !data.data.length) {
          this.error_msg = "No Layouts Found !!"
          if (this.count > 0) {
            this.count = this.count - 10;
          }
        }
        setTimeout(() => {
          this.error_msg = '';
        }, 3000)
        // this.selectedCategory = "Pending";
        if (data && data.length) {
          this.layout = data.data;
          this.all_layout = data.data;
          this.total_count = data.count;
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
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

  searchLayout(data: any) {
    if (!data || data == '') {
      this.layout = this.all_layout;
      this.show_msg = '';
      return
    };
    let obj = {
      text: data,
      status: 'Draft'
    };
    this.search_count = 0;
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
        this.ref.detectChanges();
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
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
      this.layout = this.all_layout;
      return
    }
  }

  createLayout() {
    this.router.navigate(['new-layout-category']);
  }

  changeStatus(id: any, data: any, index: any) {
    if (data) {
      this.layout[index].status = data;
      // this.editLayout(this.layout[index], index);
      this.spinnerService.show();
      let obj = {
        status: this.layout[index].status
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
        .then((data: any) => {
          this.spinnerService.hide();
          // this.layout[index] = data.data
          this.layout.splice(index, 1);
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
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

  editLayout(layout: any, index: any) {
    console.log(layout)
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
              // this.layout[index].status = 'Active'
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
        alert('Please select layouts to publish.')
      }
    }
    else {
      alert("No layouts found to publish.")
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
          td,td,th{
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

    } else {
      alert("Please select layout to download.")
    }
  }

}
