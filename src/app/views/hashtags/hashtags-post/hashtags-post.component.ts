import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-hashtags-post',
  templateUrl: './hashtags-post.component.html',
  styleUrls: ['./hashtags-post.component.scss']
})
export class HashtagsPostComponent implements OnInit {
  posts: any;
  access_token: any;
  data: any;
  hashtags: any = [];
  index: any;
  count: number = 0;
  name: any;
  p: number = 1;
  collection: any[];
  page_count: number;
  pages: any = [];
  post_details: any;
  current_page: number = 0;
  total: number;

  constructor(public route: ActivatedRoute, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.post_details = JSON.parse(window.localStorage.getItem('postdetails'));
    this.access_token = this.data.user.token;

    console.log(this.post_details)
    this.hashtags.push(this.post_details);
    let value = this.post_details.name.split("#");
    this.name = value[1];
    console.log("name", this.name);
    this.spinnerService.show();
    this.hashtagservice.allHashtagPost(this.name, this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        this.posts = data.posts;
        this.collection = data;
        this.count = this.posts.length;
        console.log(Math.ceil(data.total_records / 10));
        this.total = 1000;
        this.page_count = Math.ceil(data.total_records / 10);
        this.current_page = this.current_page + 1;
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

  ngOnInit() {
    this.getPage(1);
  }
  getPage(page: number) {
    console.log(page)
    this.p = page;
  }

  findPrev() {
    console.log("find prev")
    if (this.count > 10) {
      this.spinnerService.show();
      this.count = this.posts.length;
      this.hashtagservice.allHashtagPost(this.name, this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          if (data.posts.length) {
            this.posts = data.posts;
            this.count = this.posts.length;
            this.current_page = this.current_page - 1;
          }
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }

  }
  findNext() {
    this.spinnerService.show();
    this.hashtagservice.allHashtagPost(this.name, this.access_token, this.count)
      .then((data: any) => {
        console.log("data", data);
        this.spinnerService.hide()
        if (data.posts.length) {
          this.posts = data.posts;
          this.count = this.count + this.posts.length;
          this.current_page = this.current_page + 1;
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

  }

  getCurrentPage(data: any) {
    console.log(data)
    this.spinnerService.show();
    if (data > this.current_page) {
      this.findNext();
    }
    else if (data < this.current_page) {
      this.findPrev()
    }
    this.spinnerService.hide()

  }

}
