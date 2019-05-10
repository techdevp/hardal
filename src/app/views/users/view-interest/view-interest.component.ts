import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from '../../../app.global';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-interest',
  templateUrl: './view-interest.component.html',
  styleUrls: ['./view-interest.component.scss']
})
export class ViewInterestComponent implements OnInit {

  category: any;
  countries: any
  data: any;
  access_token: any;
  selectedCountry: any;
  selectedCategory: any;
  category_name: any;
  count: number = 0;
  category_id: any = [];
  id: any;
  interest_details: any;
  layout_count: any;

  constructor(private _location: Location, private userService: UsersService, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.spinnerService.show();
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.route.params.subscribe((id: any) => {
      this.id = id.id;
      console.log("id", id)
      if (this.id) {
        this.userService.viewInterest(this.id, this.access_token)
          .then((data: any) => {
            console.log("res", data)
            this.interest_details = data;
            this.spinnerService.hide()
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide()
          });
      }
    })
  }

  ngOnInit() {
  }
  backClicked() {
    this._location.back();
  }

}
