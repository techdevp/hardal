import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/layout/layout.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../../app.global';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout-categories',
  templateUrl: './layout-categories.component.html',
  styleUrls: ['./layout-categories.component.scss']
})
export class LayoutCategoriesComponent implements OnInit {
  category: any;
  all_category: any;
  selectedCategory: any;
  data: any;
  access_token: any;
  layout: any = [];
  selected: any = [];
  selected_layout: number = 0;
  original_layout: any;
  imageUrl: any;
  page_count: number;
  pages: any = [];
  current_page: number = 0;
  search_total: number = 0;
  search_count: number = 0;
  count: number = 0;
  index: any;
  total_count: any;
  search_text: any;
  categories: any = [];
  layout_count: any;
  interest_count: any;
  error_msg: any;
  successMessage: any;

  constructor(private layoutService: LayoutService, private spinnerService: Ng4LoadingSpinnerService, private router: Router) {
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.layoutService.layoutCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.interestCount(this.access_token)
      .then((data: any) => {
        this.spinnerService.hide()
        this.interest_count = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
    this.layoutService.getCategories(this.access_token)
      .then((data: any) => {
        this.categories = data.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

    this.layoutService.getAllCategory(this.access_token, this.count)
      .then((data: any) => {
        console.log(data)
        if (data.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
          // setTimeout(() => {
          //   this.error_msg = '';
          // }, 3000)
        }
        this.spinnerService.hide();
        this.category = data.data.catergories;
        this.all_category = data.data.catergories;
        this.original_layout = data.data.catergories;
        this.layout = data.data.catergories;
        this.page_count = Math.ceil(data.data.count / 10);
        this.total_count = data.data.count;
        // this.page_count = 5;
        this.current_page = this.current_page + 1;
        var i = 1;
        while (this.page_count > 0) {
          this.pages.push(i);
          i++;
          this.page_count--;
        }
      })
      .catch((error: any) => {
        this.spinnerService.hide()
        console.log(error)
      });
  }

  ngOnInit() { }

  viewLayout(id: any) {
    this.router.navigate(['layouts/view-layout', id]);
  }
  swapDown1(...name) {
    console.log("...", name)

  }
  swapDown(id: any, index: any, index1: any) {
    this.layout[index1 + 1].position = index;
    this.layout[index1].position = index + 1;
    let formdata1 = {
      position: this.layout[index1].position
    }
    let formdata2 = {
      position: this.layout[index1 + 1].position
    }
    this.spinnerService.show();
    this.layoutService.editCategory(formdata1, this.access_token, this.layout[index1]._id)
      .then((data: any) => {
        if (data.status == 400) {
          this.layoutService.editCategory(formdata2, this.access_token, this.layout[index1 + 1]._id)
            .then((data: any) => {
              if (data.status == 400) {
                let temp = this.layout[index1 + 1];
                this.layout[index1 + 1] = this.layout[index1];
                this.layout[index1] = temp;
                this.successMessage = "You have successfully reorder the categories.";
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000)
              }
              else {
                this.error_msg = "Some issue in categories reordering.";
                setTimeout(() => {
                  this.error_msg = '';
                }, 3000)
              }
            })
            .catch((error: any) => {
              console.log(error);
            });
        }
        else {
          this.error_msg = "Some issue in categories reordering.";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });

  }
  swapUp(id: any, index: any, index1: any) {
    this.layout[index1 - 1].position = index;
    this.layout[index1].position = index - 1;
    let formdata1 = {
      position: this.layout[index1].position
    }
    let formdata2 = {
      position: this.layout[index1 - 1].position
    }

    this.layoutService.editCategory(formdata1, this.access_token, this.layout[index1]._id)
      .then((data: any) => {
        if (data.status == 400) {
          this.layoutService.editCategory(formdata2, this.access_token, this.layout[index1 - 1]._id)
            .then((data: any) => {
              if (data.status == 400) {
                let temp = this.layout[index1 - 1];
                this.layout[index1 - 1] = this.layout[index1];
                this.layout[index1] = temp;
                this.successMessage = "You have successfully reorder the categories.";
                setTimeout(() => {
                  this.successMessage = '';
                }, 3000)
              } else {
                this.error_msg = "Some issue in categories reordering.";
                setTimeout(() => {
                  this.error_msg = '';
                }, 3000)
              }
              this.spinnerService.hide();
            })
            .catch((error: any) => {
              console.log(error);
              this.spinnerService.hide();
            });
        } else {
          this.error_msg = "Some issue in categories reordering.";
          setTimeout(() => {
            this.error_msg = '';
          }, 3000)
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }
  changeHighlighted(id: any, index: any) {
    this.layout[index].highlighted = !this.layout[index].highlighted;
    // this.editLayout(this.layout[index], index);
    let obj = {
      highlighted: this.layout[index].highlighted
    }
    this.spinnerService.show();
    this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
      .then((data: any) => {
        this.spinnerService.hide();
        this.layout[index] = data.data
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });

  }

  changeStatus(id: any, data: any, index: any) {
    if (data) {
      this.layout[index].status = data;
      // this.editLayout(this.layout[index], index);
      this.spinnerService.show();
      let obj = {
        status: this.layout[index].status
      }
      this.layoutService.editLayout(this.access_token, obj, this.layout[index]._id)
        .then((data: any) => {
          this.spinnerService.hide();
          this.layout[index] = data.data
          this.layout.splice(index, 1);
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
  }
  searchCategory(data: any) {
    if (!data) {
      this.layout = this.all_category;
      return
    }
    this.layoutService.searchCategory(data, this.access_token)
      .then((data: any) => {
        if (data.length) {
          this.layout = data;
        }
      })
      .catch((error: any) => {
        console.log(error)
      });
  }

  searchLayout(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return
    };
    let obj = {
      text: data
    }
    this.spinnerService.show();
    this.layoutService.searchLayout(obj, this.access_token, this.search_count)
      .then((data: any) => {
        if (data.data.length) {
          this.layout = data.data;
          this.search_total = data.count;
          this.total_count = data.count;
        }
        this.spinnerService.hide()
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }

  checkBlur(data: any) {
    if (!data) {
      this.layout = this.original_layout;
      return
    }
  }

  editCategory(id: any, data: any, index: any) {
    this.spinnerService.show();
    let index1 = this.layout.findIndex(x => x._id == id);
    let formdata = { status: 'Archived' };
    this.layoutService.editCategory(formdata, this.access_token, id)
      .then((data: any) => {
        // let index = this.layout.findIndex(x => x._id == this.selectedCategory);
        // console.log("index", index)
        this.layout[index1].status = 'Archived';
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        console.log(error);
        this.spinnerService.hide();
      });
  }


  findPrev(value: any) {
    this.search_text = '';
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    } else if (this.count > 0) {
      this.count = this.count - 10;
    }
    else {
      return
    }
    if (this.count >= 0) {
      this.spinnerService.show();
      if (!this.selectedCategory) {
        this.layoutService.getAllCategory(this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide()
            if (data.data.catergories.length) {
              this.layout = data.data.catergories;
              this.current_page = this.current_page - 1;
            }
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else {
        console.log(this.layout.length, this.count)
        this.layoutService.getLayoutByCategory(this.categories[this.index]._id, this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide();
            if (data.data.layouts) {
              this.layout = data.data.layouts;
              this.current_page = this.current_page - 1;
            }
          })
          .catch((error: any) => {
            this.spinnerService.hide()
            console.log(error)
          });
      }
    }
  }

  findNext(value: any) {
    this.search_text = '';
    if (value) {
      this.count = value * 10 - 10;
      this.current_page = value + 1;
    }
    else if (this.count < this.total_count) {
      this.count = this.count + 10;
    }
    else {
      return
    }
    if (this.count < this.total_count) {
      this.spinnerService.show();
      if (!this.selectedCategory) {
        this.layoutService.getAllCategory(this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide()
            if (data.data.catergories.length) {
              this.layout = data.data.catergories;
              this.current_page = this.current_page + 1;
            }
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else {
        this.layoutService.getLayoutByCategory(this.categories[this.index]._id, this.access_token, this.count)
          .then((data: any) => {
            this.spinnerService.hide()
            if (data.data.layouts) {
              this.layout = data.data.layouts;
              this.current_page = this.current_page + 1;
            }
          })
          .catch((error: any) => {
            this.spinnerService.hide()
            console.log(error)
          });
      }
    }
    else {
      this.count = this.count - 10;
    }
  }

  getCurrentPage(data: any) {
    this.spinnerService.show();
    this.count = 0;
    if (data > this.current_page) {
      this.findNext(data);
    }
    else if (data < this.current_page) {
      this.findPrev(data);
    }
    this.spinnerService.hide()

  }

  getPageDetail(data: any) {
    this.count = 0;
    this.current_page = 0;
    this.pages = [];
    this.total_count = 0;
    this.search_text = '';
    this.selected_layout = 0;

    let index = this.categories.findIndex(x => x.name == data);
    this.index = index;
    this.layout = [];
    this.spinnerService.show();
    this.layoutService.getLayoutByCategory(this.categories[index]._id, this.access_token, this.count)
      .then((data: any) => {
        this.spinnerService.hide()
        this.layout = data.data.layouts;
        this.original_layout = data.data.layouts;
        this.page_count = Math.ceil(data.data.count / 10);
        // this.page_count = 5;
        this.total_count = data.data.count;
        this.current_page = this.current_page + 1;
        var i = 1;
        while (this.page_count > 0) {
          this.pages.push(i);
          i++;
          this.page_count--;
        }

      })
      .catch((error: any) => {
        this.spinnerService.hide()
        console.log(error)
      });
    // for (var i = 0; i < this.original_layout.length; i++) {
    //   if (this.original_layout[i].name == data) {
    //     this.layout.push(this.original_layout[i])
    //   }
    // }

    this.spinnerService.hide();
  }

  selectLayout(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.layout[index].checked = true;
      this.selected_layout = this.selected_layout + 1;
    }
    else {
      this.layout[index].checked = false;
      this.selected_layout = this.selected_layout - 1;
    }
  }

  print(): void {
    if (this.selected_layout > 0) {
      let printContents, popupWin;
      printContents = document.getElementById('print-section1').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
        <head>
        <title>Print tab</title>
        <style>
        //........Customized style.......
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    }
    else {
      alert("Please select category to print")
    }
  }

  download() {
    if (this.selected_layout > 0) {
      var new_arr = [];
      var arrData = typeof this.layout != 'object' ? JSON.parse(this.layout) : this.layout;
      var CSV = '';
      for (var i = 0; i < arrData.length; i++) {
        if (arrData[i].checked) {
          new_arr.push({ "ID": arrData[i]._id, "FILESIZE": arrData[i].filesize, "CREATED DATE": arrData[i].created })
        }
      }
      //This condition will generate the Label/Header

      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in new_arr[0]) {
        //Now convert each value to string and comma-seprated
        row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      CSV += row + '\r\n';

      //1st loop is to extract each row
      for (var i = 0; i < new_arr.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in new_arr[i]) {
          row += '"' + new_arr[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
      }

      if (CSV == '') {
        alert("Invalid data");
        return;
      }

      //this trick will generate a temp "a" tag
      var link = document.createElement("a");

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);

      var csv = CSV;
      var blob = new Blob([csv], { type: 'text/csv' });
      var csvURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'ActiveEvent_data.csv');
      tempLink.click();
    } else {
      alert("Please select category to download.")
    }
  }
}
