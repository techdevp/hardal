import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Request } from '@angular/http';
import { GlobalVariable } from '../../app.global';
import 'rxjs/add/operator/map';
@Injectable()

export class AuthService {
  headers: Headers = new Headers();
  data = JSON.parse(window.localStorage.getItem('logindetails'));
  constructor(private http: Http) { }
  login(data: any) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      let postUrl = GlobalVariable.BASE_API_URL + '/auth/signin';
      var login_param;
      login_param = {
        username: data.email,
        password: data.password,
        device_type: "browser",
      }

      let options = new RequestOptions({
        method: RequestMethod.Post,
        url: postUrl,
        headers: headers,
        body: login_param,
      });
      this.http.request(new Request(options))
        .map(res => res.json())
        .subscribe(
          data => {
            if (data.user.email == 'hadalmedia@gmail.com') {
              data.user.is_root = true;
            }
            else {
              data.user.is_root = false;
            }
            window.localStorage.setItem('logindetails', JSON.stringify(data));
            resolve(data);
          },
          err => {
            reject(err);
          }
        );

    });
  }

  googleLogin(value: any) {
    console.log("service", value)
    let formData = {
      access_token: value
    }
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + '/auth/sign_google', formData)
        .subscribe((res: any) => {
          var data = res.json();
          window.localStorage.setItem('logindetails', JSON.stringify(data));
          resolve(data);
        },
          (err: any) => {
            reject(err.json());
          });
    });
  }
  forgotPassword(value: any) {
    return new Promise((resolve: any, reject: any) => {
      this.http.post(GlobalVariable.BASE_API_URL + GlobalVariable.GET_ALL_USERS + '/forget_password', value)
        .subscribe((res: any) => {
          var data = res.json();
          resolve(data);
        },
          (err: any) => {
            reject(err.json());
          });
    });
  }

}
