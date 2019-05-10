import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';

@Injectable()
export class HashtagService {

  constructor(private http: Http) { }

  allHashtag(token: any, count: any) {
    console.log("inside servce", )
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'hashtags/all?token=' + token;
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

  searchHashtag(data: any, token: any) {
    console.log("inside servce", )
    return new Promise((resolve: any, reject: any) => {
      let queryParams = "";
      if (data.name) {
        queryParams += '&search=' + data.name;
      }
      if (data.location) {
        queryParams += '&location=' + data.location;
      }
      if (data.search_date) {
        queryParams += '&date=' + data.search_date;
      }
      this.http.get(GlobalVariable.BASE_API_URL + '/api/' + 'hashtags/search?token=' + token + queryParams)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
          console.log(data)
        },
        (err: any) => {
          reject(err);
        });
    });
  }

  createHashtag(data: any, token: any) {
    console.log("inside servce", )
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/api/' + 'hashtags/?token=' + token, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
          console.log(data)
        },
        (err: any) => {
          reject(err);
        });
    });
  }

  editHashtag(data: any, token: any, id: any) {
    console.log("inside servce", )
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + '/api/' + 'hashtags/' + id + '?token=' + token, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
          console.log(data)
        },
        (err: any) => {
          reject(err);
        });
    });
  }

  deleteHashtag(data: any, token: any) {
    console.log("inside servce", )
    return new Promise((resolve: any, reject: any) => {
      this.http.delete(GlobalVariable.BASE_API_URL + '/api/' + 'hashtags/' + data + '?token=' + token)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
          console.log(data)
        },
        (err: any) => {
          reject(err);
        });
    });
  }

  allHashtagPost(data: any, token: any, count: any) {
    console.log("inside servce", count)
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/api/' + 'posts/find_by_hashtag/' + data + '?token=' + token;
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

}
