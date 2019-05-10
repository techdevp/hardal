import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UsersService } from '../../../services/users/users.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_id: any;
  users: any;
  cover_pic: any;
  profile_pic: any;
  display = 'none';
  follower: boolean = false;
  following: boolean = false;
  loader: boolean = false;
  loader_model: boolean = false;
  following_result: any;
  follower_result: any;
  imageurl: any;
  error_msg: any;
  no_follower: any;
  username: any;
  drop: boolean = false;
  expanded: boolean = false;
  mute: any;

  constructor(private _location: Location, private spinnerService: Ng4LoadingSpinnerService, public route: ActivatedRoute, public _user: UsersService) {
    this.imageurl = GlobalVariable.USER_IMAGE_URL;
    this.loader = true;
    this.route.params.subscribe((id: any) => {
      console.log(id.id)
      this.user_id = id.id;
    })
    this._user.visitUserProfile(this.user_id)
      .then((data: any) => {
        this.users = data.user;
        this.cover_pic = GlobalVariable.USER_IMAGE_URL + this.users.cover;
        this.profile_pic = GlobalVariable.USER_IMAGE_URL + this.users.photo;
        this.loader = false;
        console.log(this.users);
      })
      .catch((error: any) => {
      });


  }

  ngOnInit() { }


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

  muteUser(data: any) {
    console.log("mute", data)
    this.loader = true;
    if (data == "mute") {
      this._user.muteUser(this.user_id)
        .then((data: any) => {
          this.loader = false;
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
        });
    }

  }
  unMuteUser() {
    this.loader = true;
    this._user.unMuteUser(this.user_id)
      .then((data: any) => {
        this.loader = false;
      })
      .catch((error: any) => {
      });
  }
  reportUser() {
    this.loader = true;
    this._user.reportUser(this.user_id)
      .then((data: any) => {
        this.loader = false;
      })
      .catch((error: any) => {
      });
  }
  blockUser() {
    this.loader = true;
    this._user.blockUser(this.user_id)
      .then((data: any) => {

        this.loader = false;

      })
      .catch((error: any) => {
      });
  }
  unblockUser() {
    this.loader = true;
    this._user.unBlockUser(this.user_id)
      .then((data: any) => {

        this.loader = false;

      })
      .catch((error: any) => {
      });
  }
  openModalFollowers() {
    this.follower = true;
    this.following = false;
    this.display = 'block';
    this.loader_model = true;
    this._user.getFollower(this.user_id)
      .then((data: any) => {
        this.follower_result = data.users;
        console.log(this.follower_result)
        this.loader_model = false;
        if (this.follower_result.length == 0) {
          this.no_follower = "No followers !"

        }
      })
      .catch((error: any) => {
      });
  }
  openDrop() {
    this.drop = !this.drop;
  }
  openModalFollowing() {
    this.follower = false;
    this.following = true;
    this.display = 'block';
    this.loader_model = true;
    this._user.getFollowings(this.user_id)
      .then((data: any) => {
        this.following_result = data.users;
        this.loader_model = false;
        console.log(this.following_result)
        if (this.following_result.length == 0) {
          this.error_msg = "No followings !"

        }
      })
      .catch((error: any) => {
      });
  }
  onCloseHandled() {
    this.display = 'none';
  }
}
