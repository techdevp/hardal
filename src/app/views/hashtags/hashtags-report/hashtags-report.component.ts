import { Component, OnInit, Pipe, ChangeDetectorRef } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from "@angular/router";

@Component({
  selector: 'app-hashtags-report',
  templateUrl: './hashtags-report.component.html',
  styleUrls: ['./hashtags-report.component.scss']
})

export class HashtagsReportComponent implements OnInit {
  hashtags: any = [];
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
  count: number = 0;

  constructor(private ref: ChangeDetectorRef, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService, public router: Router) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.order = 'true';
    this.orderby = 'created';
    this.spinnerService.show();
    this.hashtagservice.allHashtag(this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.hashtags = data.data.hashtags;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() { }

  deleteReport(id, index: any) {
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

  viewReport(data: any) {
    this.router.navigate(['hashtags/hashtags-report-detail', data]);
  }
}
