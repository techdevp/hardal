import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {
  access_token: any;
  imageUrl: any;
  data: any;
  post_details: any;
  post_id: any;


  constructor(private _location: Location, private postService: PostService, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.imageUrl = GlobalVariable.POST_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.route.params.subscribe((id: any) => {
      console.log("id", id)
      this.post_id = id.id;
    })
    this.postService.getPost(this.post_id, this.access_token)
      .then((data: any) => {
        console.log("res", data)
        this.post_details = data.data;
        if (!this.post_details.location) {
          this.post_details.location = 'undefined'
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }


  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }
  downloadImage(data: any) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = data;
    a.download = "dsf";
    a.click();
    document.body.removeChild(a);
  }

}
