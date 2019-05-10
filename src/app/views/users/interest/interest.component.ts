import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services/users/users.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],

})
export class InterestComponent implements OnInit {
  interests: any;
  categories: any;
  selectedCategory: any = '0';
  emptyInterest: any = 'Please choose category to display interests';
  noInterest: any;
  addInterest: boolean = false;
  category: any = '0';
  new_interest: any;
  new_interest_es: any;
  new_interest_tr: any;
  new_interest_pt: any;
  successMessage: any;
  loader: boolean = false;
  add_category: boolean = false;
  new_category: any; new_category_pt: any; new_category_tr: any; new_category_es: any;
  view_categories: boolean = false;
  category_title: any;
  error_msg: any;

  isEdit: any = [];
  @ViewChild('interestForm') public exist: NgForm;
  @ViewChild('categoryForm') public categoryForm: NgForm;
  constructor(
    private user: UsersService,
  ) {
    this.getCategories();
  }

  ngOnInit() {

  }
  cancelCategory(category: any) {
    this.isEdit[category._id] = false;
  }
  edit(category: any) {
    this.isEdit[category._id] = true;
    this.category_title = category;
    console.log(this.isEdit[category._id])
    console.log(category)
  }
  onSelect(data: any) {
    console.log(data);
  }
  deleteCategory(id: any, category: any) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      let index = this.categories.findIndex(x => x._id == id);
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
      console.log(index);

      this.user.deleteCategory(id)
        .then((data: any) => {
          console.log(data)

          this.successMessage = "Category deleted successfully!";
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

        })
        .catch((error: any) => {
          console.log(error)
        });
      return true;
    }
    return false;

  }
  editCategory(id: any, name: any, category: any) {
    if (name == undefined) {
      this.error_msg = 'Field cannot be empty !'
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      this.isEdit[category._id] = false;
      return false;

    }
    this.user.editCategory(id, name)
      .then((data: any) => {
        console.log(data)
        this.isEdit[category._id] = false;
        this.getCategories();
        this.successMessage = "Category has been edited!";
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  deleteInterest(id, interest) {
    var choice = confirm('Do you really want to delete this record?');
    if (choice === true) {
      let index = this.interests.findIndex(x => x._id == id);
      if (index !== -1) {
        this.interests.splice(index, 1);
      }
      console.log(index);

      this.user.deleteInterest(id)
        .then((data: any) => {
          console.log(data)

          this.successMessage = "interest deleted successfully!";
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);

        })
        .catch((error: any) => {
          console.log(error)
        });
      return true;
    }
    return false;
  }
  editInterest(interest) {
    this.isEdit[interest._id] = true;
    this.category_title = interest;
    console.log(this.isEdit[interest._id])
  }
  cancelInterest(interest) {
    this.isEdit[interest._id] = false;
  }
  updatedInterest(id, data, interest) {
    if (name == undefined) {
      this.error_msg = 'Field cannot be empty !'
      setTimeout(() => {
        this.error_msg = '';
      }, 3000);
      this.isEdit[interest._id] = false;
      return false;
    }
    console.log(data)
    this.user.editInterest(id, data)
      .then((data: any) => {
        console.log(data)
        this.isEdit[interest._id] = false;
        this.showInterest();
        this.successMessage = "Interest has been updated successfully!";
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      })
      .catch((error: any) => {
        console.log(error)
      });
  }
  addNewInterest() {
    this.addInterest = true;
  }
  cancelNewInterest() {
    this.addInterest = false;
  }
  cancelNewCategory() {
    this.add_category = false;
  }
  addNewCategory() {
    this.add_category = true;
  }
  saveInterest() {
    if (!this.new_interest) {
      alert("Interest english name is missing");
      return;
    }
    if (!this.new_interest_es) {
      alert("Interest spanish name is missing");
      return;
    }

    if (!this.new_interest_tr) {
      alert("Interest turkish name is missing");
      return;
    }
    if (!this.new_interest_pt) {
      alert("Interest portuguese name is missing");
      return;
    }
    var data = {
      name: this.new_interest,
      name_es: this.new_interest_es,
      name_tr: this.new_interest_tr,
      name_pt: this.new_interest_pt,
      categoryId: this.category
    };
    console.log(data)
    this.user.addInterest(data)
      .then((data: any) => {
        console.log(data)
        this.successMessage = "Interest has been added!";
        if (this.selectedCategory == this.category) {
          this.interests.push(data);
        }
        this.exist.form.reset();
        this.category = '0';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  saveCategory() {
    if (!this.new_category) {
      alert('Category english name is missing');
      return;
    }
    if (!this.new_category_es) {
      alert('Category spanish name is missing');
      return;
    }
    if (!this.new_category_pt) {
      alert('Category portuguese name is missing');
      return;
    }
    if (!this.new_category_tr) {
      alert('Category turkish name is missing');
      return;
    }
    var data = {
      name: this.new_category,
      name_es: this.new_category_es,
      name_tr: this.new_category_tr,
      name_pt: this.new_category_pt,
    };
    this.user.addCategory(data)
      .then((data: any) => {
        console.log(data)
        this.categories.push(data);
        this.successMessage = "Category has been added!";
        this.categoryForm.form.reset();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  getInterests() {
    this.user.getUserInterests()
      .then((data: any) => {
        console.log(data);
      })
      .catch((err: any) => {
        console.log(err);

      });
  }

  getCategories() {
    this.user.getInterestCategories()
      .then((data: any) => {
        console.log(data);
        this.categories = data;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  viewCategories() {
    this.view_categories = !this.view_categories;
  }
  showInterest() {
    if (this.selectedCategory || this.selectedCategory != '0') {
      this.loader = true;
      this.user.getUserInterestByCategory(this.selectedCategory)
        .then((data: any) => {
          console.log(data)
          this.loader = false;
          this.interests = data;
          this.emptyInterest = '';
          if (this.interests.length) {
            this.noInterest = 'No interests found in this category';
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      this.emptyInterest = 'Please choose category to display interests';
    }
  }
}
