import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from '../../../app.global';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

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
  category_details: any = [{ name: '', name_es: '', name_tr: '', name_pt: '', location: '' }];
  layout_count: any;

  constructor(private _location: Location, private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.spinnerService.show();
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
    this.route.params.subscribe((id: any) => {
      this.id = id.id;
      if (this.id) {
        this.layoutService.getCategory(this.id, this.access_token)
          .then((data: any) => {
            this.category_details = data.data;
            this.spinnerService.hide()
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide()
          });
      }
    })
  }


  ngOnInit() { }

  backClicked() {
    this._location.back();
  }

}
