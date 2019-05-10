import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../../app.global';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-highlighted-layout',
  templateUrl: './highlighted-layout.component.html',
  styleUrls: ['./highlighted-layout.component.scss']
})
export class HighlightedLayoutComponent implements OnInit {
  layout: any;
  data: any;
  access_token: any;
  selected: any = [];
  selected_layout: number = 0;
  search_total: number = 0;
  search_count: number = 0;
  imageUrl: any;
  original_layout: any;
  layout_count: any;
  error_msg: any;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private layoutService: LayoutService, private router: Router) {
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
    this.layoutService.highlightedLayout(this.access_token)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          // setTimeout(() => {
          //   this.error_msg = '';
          // }, 3000)
        }
        this.layout = data;
        this.original_layout = data;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  ngOnInit() {
  }
  viewLayout(id: any) {
    this.router.navigate(['layouts/view-layout', id]);
  }

  searchLayout(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return
    };
    let obj = {
      text: data,
      highlighted: true
    };
    this.spinnerService.show();
    this.layoutService.searchLayout(obj, this.access_token, this.search_count)
      .then((data: any) => {

        if (data.data.length) {
          this.layout = data.data;
          this.search_total = data.count;
          // this.total_count = data.count;
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide()
      });
  }

  checkBlur(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return
    }
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
          this.layout[index] = data.data
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
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
