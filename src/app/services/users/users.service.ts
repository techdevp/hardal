import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';
@Injectable()
export class UsersService {
  data: any;
  access_token: any;

  constructor(private http: Http) {
    this.data = JSON.parse(window.localStorage.getItem('logindetails'));

    this.access_token = (this.data ? this.data.user.token : '');
  }

  activeSticker(id: any, status: any) {
    var data = {
      status: status
    }
    return new Promise((resolve: any, reject: any) => {

      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id + '/update', data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  deactiveSticker(id: any, status: any) {
    var data = {
      status: status
    }
    return new Promise((resolve: any, reject: any) => {

      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id + '/update', data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  changePassword(data: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/change_password?token=' + token, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        }, (err: any) => {
          var error = err;
          reject(error.json());
        });
    });
  }
  checkUsername(username: any) {
    let data = {
      username: username
    }
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.CHECK_USERNAME, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        }, (err: any) => {
          var error = err;
          reject(error);
        });
    });
  }
  updateUsername(id: any, data: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + "?token=" + token, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        }, (err: any) => {
          var error = err.json();
          reject(error);
        })
    });
  }


  verifyAccount(user_id: any) {
    let data = { id: user_id }
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/send_reverify', data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        }, (err: any) => {
          var error = err.json();
          reject(error);
        })
    });
  }
  getReportedUsers(token: any, count: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_REPORTED_USERS + '?token=' + token + '&skip=' + count)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getUserInterests() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getTopInterests() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/common')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  viewInterest(id: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/' + id + '?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }


  getStickers(pageId: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.CREATE_PAGE_URL + '/' + pageId + '/stickers')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  publishStickers(pageId) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/page/' + pageId + '/publish')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  deleteSticker(id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  deletePage(id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + GlobalVariable.CREATE_PAGE_URL + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  updatePage(data: any, id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.CREATE_PAGE_URL + '/' + id, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  swapUpstair(id) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id + '/change_order/up')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  swapDown(id) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id + '/change_order/down')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  swapStcikers(id, data) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + id + '/update', data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }


  getAllStickers() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  uploadSticker(pageID: any, formdata: any) {
    return new Promise((resolve: any, reject: any) => {

      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/1/' + pageID + '/upload', formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  editSticker(pageID: any, formdata: any) {

    return new Promise((resolve: any, reject: any) => {

      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.STICKER_UPLOAD + '/' + pageID, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  newPage(pageData: any) {

    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.CREATE_PAGE_URL, pageData)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });

  }
  getPageInfo() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.CREATE_PAGE_URL)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }
  deleteCategory(id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + GlobalVariable.GET_INTEREST_CATEGORY + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  deleteInterest(id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  editInterest(id: any, data: any) {

    // var data;
    // data = {
    //   name: name
    //
    // }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/' + id;
      let options = new RequestOptions({
        method: RequestMethod.Put,
        url: postUrl,
        headers: headers,
        body: data,
        params: id
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  changeInterestPosition(id: any, data: any) {

    // var data;
    // data = {
    //   name: name
    //
    // }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/change_position';
      let options = new RequestOptions({
        method: RequestMethod.Put,
        url: postUrl,
        headers: headers,
        body: data,
        params: id
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  editCategory(id: any, data: any) {

    // var data;
    // data = {
    //   name: name
    //
    // }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_INTEREST_CATEGORY + '/' + id;
      let options = new RequestOptions({
        method: RequestMethod.Put,
        url: postUrl,
        headers: headers,
        body: data,
        params: id
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  addInterest(interest: any) {
    return new Promise((resolve: any, reject: any) => {

      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST, interest)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  searchCommonInterest(search: any, token: any) {
    return new Promise((resolve: any, reject: any) => {

      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/' + search + '/search?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  addCategory(category: any) {
    return new Promise((resolve: any, reject: any) => {
      var data;
      data = {
        name: category.name,
      }
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.GET_INTEREST_CATEGORY, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getUserInterestByCategory(id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_INTEREST_BY_CATEGORY + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getInterestCategories() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_INTEREST_CATEGORY)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getAllUsers(limit:any) {
    let queryParams='';
    if (limit) {
      queryParams += '?limit=' + limit;
    }
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS+queryParams)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  visitUserProfile(id) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getFollower(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/followers';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }

      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  getFollowings(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/followings';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }


      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  muteUser(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/mute';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }


      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  unMuteUser(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/un_mute';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  blockUser(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/block';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  unBlockUser(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id + '/un_block';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  reportUser(id) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + 'api/reported_users/create'
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: { token: this.access_token }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }


  searchUser(count: any, data: any, token: any, badge: any,limit:any) {
    let queryParams = '';
    if (badge) {
      queryParams += '&badge=' + badge;
    }
    // if (limit) {
    //   queryParams += '&limit=' + limit;
    // }
    console.log("CONUT IN SERVICE:",count)
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'users/' + data + '/search_user' + '?token=' + token + queryParams;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: {
          "skip": count,
          "limit":limit
        }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  searchReportedUser(count: any, data: any, token: any, badge: any) {
    let queryParams = '';
    if (badge) {
      queryParams += '&badge=' + badge;
    }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_REPORTED_USERS + '/' + data + '/search' + '?token=' + token + queryParams;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: {
          "skip": count
        }
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  deleteUserRecord(id) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getAllUserslimit(count: any,limit:any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: {
          "skip": count,
          "limit":limit
        }

      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  getUserByBadge(count: any, badge: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/user_by_type';
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,
        params: {
          "skip": count,
          "badge_number": badge
        }

      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  savePostLimit(id, post) {
    var data;
    data = {
      posts_allowed: post
    }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id;
      let options = new RequestOptions({
        method: RequestMethod.Put,
        url: postUrl,
        headers: headers,
        body: data,
        params: id
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }
  updateBadge(id, badge_rate) {
    var data;
    data = {
      badge_number: badge_rate
    }
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id;
      let options = new RequestOptions({
        method: RequestMethod.Put,
        url: postUrl,
        headers: headers,
        body: data,
        params: id
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            resolve(data);
          },
          err => {
            reject(err);
          }
        );
    });
  }

  editPagePosition(formdata: any, token: any, id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + '/api/' + 'page_sticker/' + id + '?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
}
