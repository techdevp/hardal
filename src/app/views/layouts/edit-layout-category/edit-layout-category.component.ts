import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from '../../../app.global';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-layout-category',
  templateUrl: './edit-layout-category.component.html',
  styleUrls: ['./edit-layout-category.component.scss']
})
export class EditLayoutCategoryComponent implements OnInit {
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
  layout_count: any;
  category_details: any = { name: '', name_es: '', name_tr: '', name_pt: '', location: '' };
  error_msg: any;

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
      if (this.id != ":id") {
        this.layoutService.getCategory(this.id, this.access_token)
          .then((data: any) => {
            this.category_details = data.data;
            this.selectedCategory = this.category_details._id;
            this.category_id.push(this.category_details._id)
            this.spinnerService.hide()
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide()
          });
      }
      else {
        this.selectedCategory = 'undefined';
        this.category_details.name = '';
        this.category_details.name_es = '';
        this.category_details.name_tr = '';
        this.category_details.name_pt = '';
        this.category_details.location = 'undefined';
      }
    })
    this.layoutService.getCategories(this.access_token)
      .then((data: any) => {
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }

        this.category = data.data;
        this.spinnerService.hide()
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide()
      });
    this.countries = GlobalVariable.COUNTRIES;
  }

  ngOnInit() { }

  backClicked() {
    this._location.back();
  }

  getPageDetail(data: any) {
    if (data) {
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
  }

  setCountry(data: any) {
    this.selectedCountry = data
  }

  selectCategory(id: any) {
    if (id) {
      this.layoutService.getCategory(id, this.access_token)
        .then((data: any) => {
          this.category_details = data.data;
          this.spinnerService.hide()
        })
        .catch((error: any) => {
          console.log(error);
          this.spinnerService.hide()
        });
    }
    // console.log("id", id)
    // let index = this.category.findIndex(x => x._id == id);
    // this.category_id = id;
    // this.selectedCountry = this.category[index].location;
    // this.category_name = this.category[index].name
  }

  editCategory() {
    if (this.selectedCategory == 'undefined') {
      alert("Please select category.");
      return;
    }
    if (!this.category_details.name) {
      alert("Please enter category english name");
      return;
    }
    if (!this.category_details.name_es) {
      alert("Please enter category spanish name");
      return;
    }
    if (!this.category_details.name_tr) {
      alert("Please enter category turkish name");
      return;
    }
    if (!this.category_details.name_pt) {
      alert("Please enter category portuguese name");
      return;
    }
    if (!this.category_details.location) {
      alert("Please enter category location");
      return;
    }
    this.spinnerService.show()
    let formdata = {
      name: this.category_details.name,
      name_es: this.category_details.name_es,
      name_tr: this.category_details.name_tr,
      name_pt: this.category_details.name_pt,
      location: this.category_details.location
    }
    if (this.category_details._id) {
      this.selectedCategory = this.category_details._id
    }
    this.layoutService.editCategory(formdata, this.access_token, this.selectedCategory)
      .then((data: any) => {
        if (this.id == ':id') {
          this.selectedCategory = 'undefined';
          this.category_details.name = '';
          this.category_details.name_es = '';
          this.category_details.name_tr = '';
          this.category_details.name_pt = '';
          this.category_details.location = 'undefined';

        }
        // this.selectedCategory = '';
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  changeStatus(status: any) {
    let formdata = {
      status: status
    }
    this.layoutService.editCategory(formdata, this.access_token, this.selectedCategory)
      .then((data: any) => {
        this.category_details.status = status;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  deleteCategory() {
    if (this.selectedCategory == 'undefined') {
      alert("Please select category to remove.");
      return;
    }
    this.spinnerService.show()
    let index = this.category.findIndex(x => x._id == this.selectedCategory)
    this.layoutService.deleteCategory(this.access_token, this.selectedCategory)
      .then((data: any) => {
        this.category.splice(index, 1);
        this.selectedCategory = 'undefined';
        this.category_details.name = '';
        this.category_details.name_es = '';
        this.category_details.name_tr = '';
        this.category_details.name_pt = '';
        this.category_details.location = 'undefined';
        this.spinnerService.hide()
      })
      .catch((error: any) => {
        this.spinnerService.hide()
        console.log(error)
      });
  }


  publishCategory() {
    let index = this.category.findIndex(x => x._id == this.selectedCategory);
    if (this.category[index].status != 'Active') {
      if (this.category_id && this.category_id.length) {
        let formdata = {
          categoryId: this.category_id
        }
        this.spinnerService.show();
        this.layoutService.publishCategory(formdata, this.access_token)
          .then((data: any) => {
            // for (let i = 0; i < this.category_id.length; i++) {
            //   let index = this.category.findIndex(x => x._id == this.category_id[i])
            //   this.category[index].status = 'Active'
            // }
            this.category[index].status = 'Active';
            this.category_details.status = 'Active';
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            console.log(error);
            this.spinnerService.hide();
          });
      }
      else {
        alert('Please select category to publish.')
      }
    }
    else {
      alert('You already published this category.')
    }
  }

  cancel() {
    if (this.selectedCategory) {
      this.category_id = [];
      this.selectedCategory = '';
      this.category_name = '';
      this.selectedCountry = ''
    }
  }

}
