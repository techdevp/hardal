import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from "@angular/router";
import { Pipe } from '@angular/core';
import { GlobalVariable } from '../../../app.global';

@Component({
  selector: 'app-all-hashtags',
  templateUrl: './all-hashtags.component.html',
  styleUrls: ['./all-hashtags.component.scss'],
})
export class AllHashtagsComponent implements OnInit {
  hashtags: any;
  original_hashtags: any;
  access_token: any;
  data: any;
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
  orderby: String = "created";
  page_count: number;
  pages: any = [];
  current_page: number = 0;
  last_page: number = 0;
  count: number = 0;
  index: any;
  total_count: any;
  collection = [];
  countries: any;
  selectedCountry: any;
  search_date: any;
  errmsg: any



  constructor(private ref: ChangeDetectorRef, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService, public router: Router) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.order = 'true';
    this.orderby = 'created';

    this.countries = GlobalVariable.COUNTRIES;
    this.hashtagservice.allHashtag(this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.hashtags = data.data.hashTags;
        this.original_hashtags = data.data.hashTags;
        this.page_count = Math.ceil(data.data.count / 10);
        this.total_count = data.data.count;
        for (let i = 1; i < this.total_count; i++) {
          this.collection.push(`item ${i}`);
        }
        this.current_page = this.current_page + 1;
        this.last_page = this.last_page + 1;
        var i = 1;
        while (this.page_count > 0) {
          this.pages.push(i);
          i++;
          this.page_count--;
          console.log(this.page_count, this.pages)
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() { }

  changeStatus(id: any, index: any, status: any) {
    console.log(index, this.hashtags[index].status);
    let index1 = this.hashtags.findIndex(x => x._id == id)
    if (this.hashtags[index1].status) {
      this.hashtags[index1].status = false;
    }
    else {
      this.hashtags[index1].status = true;
    }
    this.ref.detectChanges();
    console.log(index1, index, this.hashtags[index1])
    this.editHashtag(this.hashtags[index1], index1);
  }

  editHashtag(hashtags: any, index: any) {
    console.log("edit", hashtags)
    this.spinnerService.show();
    this.hashtagservice.editHashtag(hashtags, this.access_token, hashtags._id)
      .then((data: any) => {
        this.spinnerService.hide();
        // this.hashtags[index] = data.data
        console.log("updated", data)
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  findPrev(value: any) {
    console.log("find prev");
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    } else if (this.count > 0) {
      this.count = this.count - 10;
      console.log("count", this.count)
    }
    else {
      return
    }
    if (this.count >= 0) {
      this.spinnerService.show();
      this.hashtagservice.allHashtag(this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          if (data.data.hashTags.length) {
            this.hashtags = data.data.hashTags;
            this.current_page = this.current_page - 1;
            this.last_page = this.last_page - 1;
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }

  findNext(value: any) {
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    }
    else if (this.count < this.total_count) {
      this.count = this.count + 10;
      console.log("count", this.count)
    }
    else {
      return
    }
    if (this.count < this.total_count) {
      this.spinnerService.show();
      this.hashtagservice.allHashtag(this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          if (data.data.hashTags.length) {
            this.hashtags = data.data.hashTags;
            this.current_page = this.current_page + 1;
            this.last_page = this.last_page + 1;
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      this.count = this.count - 10;
    }
  }

  getCurrentPage(data: any) {
    console.log(data, this.current_page, this.last_page)
    this.spinnerService.show();
    this.count = 0;
    if (this.current_page == data) {

      if (data > this.last_page) {
        this.findNext(data);
      }
      else if (data <= this.last_page) {
        this.findPrev(data);
      }
    }
    this.spinnerService.hide()
  }

  searchHashtag(event: any, data: any) {
    if (!data) {
      this.hashtags = this.original_hashtags;
    }

    //  this.hashtags = [];
    let obj = {
      name: data,
      location: this.selectedCountry,
      search_date: this.search_date
    }
    console.log(obj)
    this.hashtagservice.searchHashtag(obj, this.access_token)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        if (data.data.length) {
          this.hashtags = data.data;
        }
        else {
          this.hashtags = [];
          // this.errmsg = "No records found !!"
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  deleteHashtag(id, index: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      console.log(id)
      this.spinnerService.show();
      let index = this.hashtags.findIndex(x => x._id == id);
      console.log(index)
      this.hashtagservice.deleteHashtag(id, this.access_token)
        .then((data: any) => {
          console.log(data, index)
          this.hashtags.splice(index, 1);
          console.log(this.hashtags)
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    return false
  }

  viewPost(data: any) {
    console.log("data", data)
    window.localStorage.setItem('postdetails', JSON.stringify(data))
    this.router.navigate(['hashtags/hashtags-post']);

  }

  setByDecId(event) {
    this.order = 'false'
    this.orderby = '_id'
  }

  setByIncId(event) {
    this.order = 'true'
    this.orderby = '_id'
  }

  getAllPage(value: any) {
    for (let key in this.temp_object) {
      if (key == value) {
        this.temp_object[key] = true;
      } else {
        this.temp_object[key] = false;
      }
    }
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
    var arrData = typeof this.hashtags != 'object' ? JSON.parse(this.hashtags) : this.hashtags;
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
    var link = document.createElement("a");
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
