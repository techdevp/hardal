import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';

@Injectable()
export class DashboardService {

  constructor(private http: Http) { }

  totalCount() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/dashboard_counts')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
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

  getTopLayout() {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + '/api/layouts/top')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getTopUsers() {
    return new Promise((resolve: any, reject: any) => {
      // this.http.get(GlobalVariable.BASE_API_URL + '/api/users/top_users')
      this.http.get('http://localhost:3000/api/users/top_users')
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  getDetails() {
    return new Promise((resolve: any, reject: any) => {
      // this.http.get(GlobalVariable.BASE_API_URL + '/api/users/top_users')
      this.http.get('https://gplaystore.p.mashape.com/applicationDetails?id=hardal.media.hardalist&lang=en&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTg1ODgwNDMxMjdiZTEwNTRmOTQyZWUiLCJpYXQiOjE1MzMyNzI0NzQsImV4cCI6MTU2NDgwODQ3NH0.h2PQO2HrP3VC2LTtniuKbkVj4yw571hVpgEHOvUZ24Y')
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
