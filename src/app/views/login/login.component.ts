import { Component, OnInit } from '@angular/core';
import { AuthService as LoginService } from '../../services/auth/auth.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, RouterStateSnapshot } from "@angular/router";
import { FormsModule } from '@angular/forms'
// import { AuthService, SocialUser } from "angular4-social-login";
// import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';

@Component({
  selector: 'views-Login',
  templateUrl: './login.component.html',
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  private loggedIn: boolean;
  userdata: any;
  remeberme: boolean = false;
  data: any;
  errormsg: any;
  submit: boolean = false;

  constructor(public auth: LoginService, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private socialAuthService: AuthService) { }

  ngOnInit() { }

  public socialSignIn() {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log("data", userData);
        this.spinnerService.show();
        this.auth.googleLogin(userData.token)
          .then((res: any) => {
            console.log(res);
            let logindata: any;
            this.submit = false;
            this.userdata = { name: res.user.name, email: res.user.email.toLowerCase() }
            window.localStorage.setItem('token', res.user.token);
            if (res.user.admin_type != 4) {
              this.router.navigate(['/dashboard']);
            }
            else {
              this.errormsg = "You are not authorised to access admin panel."
            }
            this.spinnerService.hide();
          })
          .catch((error: any) => {
            this.submit = false;
            this.errormsg = "You are not authorised to access admin panel."
            console.log(error);
            this.spinnerService.hide();
          });

      }
    );
  }

  getData(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  submitForm(data, form) {
    this.errormsg = '';
    console.log(data)
    console.log(form.form.status)
    if (form.form.status == "INVALID") {
      this.errormsg = "Please fill all the details."
      return false;
    }
    this.submit = true;
    this.spinnerService.show();
    this.auth.login(data)
      .then((res: any) => {
        console.log(res);
        let logindata: any;
        this.submit = false;
        this.userdata = { name: data.username, email: data.email.toLowerCase() }
        this.spinnerService.hide();
        window.localStorage.setItem('token', res.user.token)
        if (res.user.admin_type != 4) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errormsg = "You are not authorised to access admin panel."
        }

      })
      .catch((error: any) => {
        this.submit = false;
        this.errormsg = "Login Failed"
        console.log(error._body);
        this.spinnerService.hide();
      });

  }
  clear() {
    this.errormsg = '';
  }
}
