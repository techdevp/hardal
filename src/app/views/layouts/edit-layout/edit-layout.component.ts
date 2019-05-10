import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { GlobalVariable } from '../../../app.global';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-layout',
  templateUrl: './edit-layout.component.html',
  styleUrls: ['./edit-layout.component.scss']
})
export class EditLayoutComponent implements OnInit {
  access_token: any;
  imageUrl: any;
  data: any;
  layout_details: any;
  layout_id: any;
  // edit: boolean = false;
  countries: any;
  category: any;
  species: any;
  files: any;
  artists: any = [];
  username: any;
  drop_div: boolean = false;
  selected_user: any;
  layout_count: any;


  constructor(private _location: Location, private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute) {
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.countries = GlobalVariable.COUNTRIES;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.route.params.subscribe((id: any) => {
      this.layout_id = id.id;
    });
    this.layoutService.layoutCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getLayout(this.layout_id, this.access_token)
      .then((data: any) => {
        this.layout_details = data.data;
        if (!this.layout_details.location) {
          this.layout_details.location = 'undefined'
        }
        this.username = this.layout_details.artist.username;
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getCategories(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide();
        this.category = data.data
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getAllSpecies(this.access_token)
      .then((data: any) => {
        this.species = data.data;
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
  setCountry(data: any) {
    this.layout_details.location = data;
  }

  addNewCategory(data: any) {
    var obj = {
      name: data
    }
    if (data.length) {
      let length = (data.length > 0 ? (data.length - 1) : data.length);
      let index = this.category.findIndex(x => x.name == data[length]);
      if (index >= 0) {
        let index1 = this.layout_details.categoryId.findIndex(x => x.name == data[length]);
        if (index1 == -1) {
          this.layout_details.categoryId.push(this.category[index])
        }
      }
    }
  }

  removeCategory(index: any) {
    this.layout_details.categoryId.splice(index, 1)
  }

  changeSpcies(data: any) {
    let index = this.species.findIndex(x => x._id == data)
    this.layout_details.speciesId._id = data;
    this.layout_details.speciesId.name = this.species[index].name;
  }

  searchArtisan(data: any, value: any, index: any) {
    this.layoutService.searchUser(data, this.access_token)
      .then((data: any) => {
        this.artists = data.data;
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  selectedUser(data: any, index: any, index2: any) {
    if (data._id) {
      this.selected_user = data._id;
    }
    this.username = data.username
  }

  editLayout() {
    console.log(this.layout_details.artist.username, this.username)
    if (!this.selected_user && this.layout_details.artist.username != this.username) {
      alert("Please select the valid username.");
      return;
    }
    if (this.selected_user && this.layout_details.artist.username != this.username) {
      this.layout_details.artist = this.selected_user;
    }
    this.spinnerService.show();
    this.layoutService.editLayout(this.access_token, this.layout_details, this.layout_details._id)
      .then((data: any) => {
        this.layout_details = data.data;
        this.selected_user = '';
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  downloadImage(data: any) {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.href = data;
    a.download = "dsf";
    a.click();
    document.body.removeChild(a);
  }

  editFileSelect(event: any, index: any) {
    if (event.target.files.length) {
      this.spinnerService.show();
      let files = event.target.files;
      this.files = Array.prototype.slice.call(files);
      this.files.forEach((f: any, i: any) => {
        var f = files[i];
        const formData: any = new FormData();
        var reader = new FileReader();
        reader.readAsDataURL(f);
        reader.onload = (e: any) => {
          let file = event.target.files[0];
          formData.append("files", file);
          this.layoutService.uploadLayoutImage(this.access_token, formData)
            .then((data: any) => {
              this.layout_details.photo = data.data[0].filename;
              this.spinnerService.hide();
              //  this.new_image.push(data.data.files)
            })
            .catch((error: any) => {
              this.spinnerService.hide();
              console.log(error)
            });
        }
      });
    }
    else {
      alert('Choose images to proceed !');
    }
  }

  changeStatus(data: any) {
    if (data) {
      this.layout_details.status = data;
      let obj = {
        status: data
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout_details._id)
        .then((data: any) => {
          this.layout_details = data.data
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }

}
