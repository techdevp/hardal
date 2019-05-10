import { Component, OnInit } from '@angular/core';
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Pipe, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tt-list',
  templateUrl: './tt-list.component.html',
  styleUrls: ['./tt-list.component.scss']
})
export class TtListComponent implements OnInit {
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

  constructor(private ref: ChangeDetectorRef, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService, ) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.order = 'true';
    this.orderby = 'created';
    this.spinnerService.show();
    this.hashtagservice.allHashtag(this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.hashtags = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() { }

}
