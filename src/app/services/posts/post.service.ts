import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';


@Injectable()
export class PostService {

  constructor(private http: Http) { }

  allPosts(token: any, count: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_POST + '/all_posts?token=' + token;
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

  reportedPosts(token: any, count: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'reported_posts?token=' + token;
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

  getPost(id: any, token: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_POST + '/' + id + '/comments?token=' + token;
      let options = new RequestOptions({
        method: RequestMethod.Get,
        url: postUrl,
        headers: headers,

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
  deletePost(formdata: any, token: any) {
    // ;
    let options = new RequestOptions({
      body: formdata
    });
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + '/api/' + 'posts/delete_posts?token=' + token, options)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);

        },
          (err: any) => {
            reject(err);
          });
    });
  }

  searchPost(count: any, data: any, token: any, badge: any) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/posts/' + data + '/search' + '?token=' + token;
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
  searchReportedPost(count: any, data: any, token: any, badge: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/reported_posts/' + data + '/search' + '?token=' + token;
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

  postCount() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_POST + '/posts_counts')
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
