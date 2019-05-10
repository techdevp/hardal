import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';

@Injectable()
export class LayoutService {

  constructor(private http: Http) { }

  allLayout(token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  layoutCount(token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/layout_counts?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  interestCount(token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.INTEREST + '/interest_count?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  layout(data: any, token: any, count: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/find_by_status/' + data + '?token=' + token + '&skip=' + count)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  highlightedLayout(token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/highlighted?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  archivedLayout(token: any, skip: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/find_by_status/Archived?token=' + token + '&skip=' + skip)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getLayout(data: any, token: any) {

    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/' + data + '?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  editLayout(token: any, data: any, id: any) {

    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/' + id + '?token=' + token, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  searchLayout(data: any, token: any, skip: any) {
    let queryParams = '';
    if (data.status) {
      queryParams += '&status=' + data.status;
    }
    if (data.highlighted) {
      queryParams += '&highlighted=' + true;
    }

    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/' + data.text + '/search' + '?token=' + token + '&skip=' + skip + queryParams)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  searchCategory(data: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/' + data + '/search' + '?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getLayoutByCategory(data: any, token: any, count: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/' + data + '/layouts' + '?token=' + token;
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

  searchUser(data: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'users/' + data + '/search' + '?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }


  uploadLayoutImage(token: any, formdata: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + "layouts/upload?token=" + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  uploadCategoryImage(pageID: any, formdata: any) {
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

  createCategory(formdata: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getAllCategory(token: any, count: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts' + '?token=' + token;
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

  getCategories(token: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/all' + '?token=' + token;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers
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
  getCategory(id: any, token: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/' + id + '?token=' + token;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers
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

  getAllSpecies(token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'categories_species?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  createLayout(formdata: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + 'layouts?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  publishLayout(formdata: any, token: any) {

    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/publish?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }
  deleteLayout(formdata: any, token: any) {
    ;
    let options = new RequestOptions({
      body: formdata
    });
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/publish?token=' + token, options)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  publishCategory(formdata: any, token: any) {

    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/publish?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getAllLayout(token: any, count: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'layouts/all?token=' + token + '&skip=' + count)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  editCategory(formdata: any, token: any, id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/' + id + '?token=' + token, formdata)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  deleteCategory(token: any, id: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + '/api/' + 'categories_layouts/' + id + '?token=' + token)
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
