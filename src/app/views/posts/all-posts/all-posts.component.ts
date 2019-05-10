import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/posts/post.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { GlobalVariable } from './../../../app.global';



@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit {
  imageUrl: any;
  data: any;
  access_token: any;
  posts: any;
  count: number = 0;
  search_count: number = 0;
  selected: any = [];
  action: any = [];
  search_text: any;
  total_count: number = 0;
  current_page: number = 0;
  selected_post: number = 0;
  posts_count: any;
  error_msg: any;
  search_total: any;

  constructor(private postService: PostService, private spinnerService: Ng4LoadingSpinnerService) {
    this.imageUrl = GlobalVariable.LAYOUT_IMAGE_URL;
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));
    this.access_token = this.data.user.token;
    this.spinnerService.show();
    this.getAllPost();
    this.postService.postCount()
      .then((res: any) => {
        console.log(res)
        this.posts_count = res.data;
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  ngOnInit() { }
  getAllPost() {
    this.spinnerService.show();
    this.postService.allPosts(this.access_token, this.count)
      .then((res: any) => {
        console.log(res);
        if (res.status == 401) {
          this.error_msg = 'Your session has been expired please login again to continue.';
        }
        if (res.data && res.data.posts && res.data.posts.length) {
          this.posts = res.data.posts;
          this.total_count = res.data.count;
        }
        if (res.data && res.data.posts && !res.data.posts.length) {
          if (this.count > 0) {
            this.count = this.count - 10
          }
        }
        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error)
      });
  }

  searchPost(data: any) {
    this.spinnerService.show();
    this.search_count = 0;
    if (this.search_text) {
      this.postService.searchPost(this.search_count, data, this.access_token, '')
        .then((data: any) => {
          console.log(data)
          if (data.status == 401) {
            console.log(data.status)
            this.error_msg = 'Failed to authenticate token.';
            setTimeout(() => {
              this.error_msg = '';
            }, 3000)
          }
          else if (data.status == 422) {
            console.log(data.status)
            this.error_msg = data.message + ' !!';
            setTimeout(() => {
              this.error_msg = '';
            }, 3000);
            this.posts = [];
          }
          else {
            this.posts = data.data;
            this.search_total = data.count;
          }
          this.spinnerService.hide();
        })
        .catch((error: any) => {
          this.spinnerService.hide();
          console.log(error)
        });
    }
    else {
      this.getAllPost();
    }
  }

  findNext() {
    console.log(this.search_count, this.search_total)
    if (this.search_text) {
      this.search_count = this.search_count + 10;
      if (this.search_total > this.search_count) {
        this.spinnerService.show();
        this.postService.searchPost(this.search_count, this.search_text, this.access_token, '')
          .then((data: any) => {
            console.log(data)
            if (data.status == 401) {
              console.log(data.status)
              this.error_msg = 'Failed to authenticate token.';
              setTimeout(() => {
                this.error_msg = '';
              }, 3000)
            }
            else if (data.status == 422) {
              console.log(data.status)
              this.error_msg = data.message;
              setTimeout(() => {
                this.error_msg = '';
              }, 3000);
              this.posts = [];
            }
            else {
              this.posts = data.data;
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else {
        this.search_count = this.search_count - 10;
      }
    }
    else {
      this.count = this.count + 10;
      this.getAllPost();
    }
  }
  findPrev() {
    if (this.count > 0 || this.search_count > 0) {
      this.spinnerService.show();
      if (this.search_text) {
        this.search_count = this.search_count - 10;
        this.postService.searchPost(this.search_count, this.search_text, this.access_token, '')
          .then((data: any) => {
            console.log(data)
            if (data.status == 401) {
              console.log(data.status)
              this.error_msg = 'Failed to authenticate token.';
              setTimeout(() => {
                this.error_msg = '';
              }, 3000)
            }
            else if (data.status == 422) {
              console.log(data.status)
              this.error_msg = data.message;
              setTimeout(() => {
                this.error_msg = '';
              }, 3000);
              this.posts = [];
            }
            else {
              this.posts = data.data;
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            this.spinnerService.hide();
            console.log(error)
          });
      }
      else {
        this.count = this.count - 10;
        this.getAllPost();
      }
    }
  }

  selectLayout(event: any, data: any, selected: any, index: any) {
    if (selected) {
      this.posts[index].checked = true;
      this.selected_post = this.selected_post + 1;
    }
    else {
      this.posts[index].checked = false;
      this.selected_post = this.selected_post - 1;
    }
  }


  print(): void {
    if (this.selected_post > 0) {
      let printContents, popupWin;
      printContents = document.getElementById('print-section1').innerHTML;
      popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();
      popupWin.document.write(`
        <html>
        <head>
        <title>Print tab</title>
        <style>
        img{
          max-width:100px;
        }
        tr,td,th{
          width:100%;
        }
        </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
        </html>`
      );
      popupWin.document.close();
    }
    else {
      alert("Please select elements to print")
    }
  }

  download() {
    if (this.selected_post > 0) {
      var new_arr = [];
      var arrData = typeof this.posts != 'object' ? JSON.parse(this.posts) : this.posts;
      var CSV = '';
      console.log(arrData)
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
      console.log(csvURL)
      var tempLink = document.createElement('a');
      tempLink.href = csvURL;
      tempLink.setAttribute('download', 'ActiveEvent_data.csv');
      tempLink.click();

    } else {
      alert("Please select layout to download.")
    }
  }

  // findPrev(value: any) {
  //   this.search_text = '';
  //   if (value) {
  //     this.count = value * 10 - 10;
  //     this.current_page = value + 1;
  //   } else if (this.count > 0) {
  //     this.count = this.count - 10;
  //   }
  //   else {
  //     return
  //   }
  //   if (this.count >= 0) {
  //     this.spinnerService.show();
  //     this.postService.allPosts(this.access_token, this.count)
  //       .then((data: any) => {
  //         this.spinnerService.hide()
  //         if (data.data.posts.length) {
  //           this.posts = data.data.posts;
  //           this.current_page = this.current_page - 1;
  //         }
  //       })
  //       .catch((error: any) => {
  //         this.spinnerService.hide();
  //         console.log(error)
  //       });
  //   }
  // }
  //
  // findNext(value: any) {
  //   this.search_text = '';
  //   if (value) {
  //     this.count = value * 10 - 10;
  //     this.current_page = value + 1;
  //   }
  //   else if (this.count < this.total_count) {
  //     this.count = this.count + 10;
  //   }
  //   else {
  //     return
  //   }
  //   if (this.count < this.total_count) {
  //     this.spinnerService.show();
  //     this.postService.allPosts(this.access_token, this.count)
  //       .then((data: any) => {
  //         this.spinnerService.hide()
  //         if (data.data.posts.length) {
  //           this.posts = data.data.posts;
  //           this.current_page = this.current_page + 1;
  //         }
  //       })
  //       .catch((error: any) => {
  //         this.spinnerService.hide();
  //         console.log(error)
  //       });
  //   }
  //   else {
  //     this.count = this.count - 10;
  //   }
  // }

}
