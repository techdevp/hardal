import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { HashtagService } from '../../../services/hashtag/hashtag.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-hashtags-report-detail',
  templateUrl: './hashtags-report-detail.component.html',
  styleUrls: ['./hashtags-report-detail.component.scss']
})
export class HashtagsReportDetailComponent implements OnInit {
  reports: any;
  access_token: any;
  data: any;
  hashtags: any = [];
  count: number = 0;

  constructor(public route: ActivatedRoute, private hashtagservice: HashtagService, private spinnerService: Ng4LoadingSpinnerService) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.route.params.subscribe((data: any) => {
      console.log(data)
      this.hashtags.push(data);
      this.hashtagservice.allHashtagPost(data._id, this.access_token, this.count)
        .then((data: any) => {
          console.log("data", data);
          this.spinnerService.hide()
          this.reports = data.data;
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    })
  }

  ngOnInit() {
  }

}
