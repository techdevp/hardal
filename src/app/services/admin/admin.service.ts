import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminService {

  constructor(private http: Http) { }

  getAdminUsers(count: any, token: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.get(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/admin_users?token=' + token + '&skip=' + count)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  addAdminUsers(data: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/auth/add_google_user', data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }
  updateAdminUsers(id: any, data: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.put(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/' + id, data)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err);
          });
    });
  }

  getDetails(id) {
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

}
