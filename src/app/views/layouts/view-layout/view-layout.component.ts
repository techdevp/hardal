import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.scss']
})
export class ViewLayoutComponent implements OnInit {
  access_token: any;
  imageUrl: any;
  data: any;
  layout_details: any;
  layout_id: any;


  constructor(private _location: Location, private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.route.params.subscribe((id: any) => {
      this.layout_id = id.id;
    })
    this.layoutService.getLayout(this.layout_id, this.access_token)
      .then((data: any) => {
        this.layout_details = data.data;
        if (!this.layout_details.location) {
          this.layout_details.location = 'undefined'
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
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
}
